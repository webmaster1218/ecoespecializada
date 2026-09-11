interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

/**
 * Valida un token emitido por el widget de Cloudflare Turnstile contra la API de Cloudflare.
 */
export async function verifyTurnstileToken(
  token?: string,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // Si la clave no está configurada en desarrollo local y no hay token, permitir con advertencia
  if (!secretKey) {
    console.warn('[Turnstile] Advertencia: TURNSTILE_SECRET_KEY no está configurada.');
    return { success: true };
  }

  if (!token || typeof token !== 'string' || token.trim().length === 0) {
    return {
      success: false,
      error: 'Token de verificación de seguridad ausente.',
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token.trim());
    if (remoteIp && remoteIp !== '127.0.0.1' && remoteIp !== '::1' && remoteIp !== 'unknown') {
      formData.append('remoteip', remoteIp);
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data: TurnstileVerifyResponse = await res.json();

    if (!data.success) {
      console.warn('[Turnstile] Verificación rechazada por Cloudflare:', data['error-codes']);
      return {
        success: false,
        error: 'Validación de seguridad anti-bot no superada. Por favor intenta nuevamente.',
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[Turnstile] Error de conexión con Cloudflare:', err);
    return {
      success: false,
      error: 'Error de validación con el servicio de seguridad.',
    };
  }
}
