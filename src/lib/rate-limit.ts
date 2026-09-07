interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Limpieza periódica para evitar fugas de memoria cada 10 minutos
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipMap.entries()) {
      if (now > record.resetAt) {
        ipMap.delete(ip);
      }
    }
  }, 10 * 60 * 1000);
}

/**
 * Obtiene la dirección IP del cliente a partir de los headers estándar
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp.trim();
  }
  return '127.0.0.1';
}

/**
 * Verifica si una IP ha excedido el límite de solicitudes
 * @param ip Dirección IP
 * @param limit Número máximo de intentos permitidos (default: 5)
 * @param windowMs Ventana de tiempo en milisegundos (default: 5 minutos)
 */
export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 5 * 60 * 1000
): { success: boolean; remaining: number; resetInSeconds: number } {
  const now = Date.now();
  const record = ipMap.get(ip);

  if (!record || now > record.resetAt) {
    ipMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      success: true,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: limit - record.count,
    resetInSeconds: Math.ceil((record.resetAt - now) / 1000),
  };
}

/**
 * Valida si el origen o referer proviene de un dominio autorizado
 */
export function isValidOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');

  const allowedPatterns = [
    'alquilerdeecografos.com',
    'www.alquilerdeecografos.com',
    'ecoespecializada.vercel.app',
    'localhost',
    '127.0.0.1',
  ];

  const checkUrl = (urlStr: string | null): boolean => {
    if (!urlStr) return false;
    try {
      const parsed = new URL(urlStr);
      return allowedPatterns.some((pattern) =>
        parsed.hostname === pattern || parsed.hostname.endsWith(`.${pattern}`)
      );
    } catch {
      return false;
    }
  };

  // Si no hay origin ni referer (ej. curl directo), solo permitir si estamos en desarrollo local
  if (!origin && !referer) {
    return process.env.NODE_ENV === 'development';
  }

  return checkUrl(origin) || checkUrl(referer);
}

/**
 * Verifica si los datos provienen de un bot
 * 1. Honeypot relleno
 * 2. Tiempo de envío inhumano (< 2.5 segundos)
 */
export function isBotSubmission(data: {
  hp_website?: string | null;
  render_time?: number | string | null;
}): { isBot: boolean; reason?: string } {
  // 1. Honeypot check: si un campo invisible está lleno, es un bot
  if (data.hp_website && String(data.hp_website).trim().length > 0) {
    return { isBot: true, reason: 'honeypot_triggered' };
  }

  // 2. Time-gate check: si tardó menos de 2.5 segundos desde que cargó el formulario
  if (data.render_time) {
    const renderTimestamp = Number(data.render_time);
    if (!isNaN(renderTimestamp)) {
      const elapsed = Date.now() - renderTimestamp;
      if (elapsed < 2500) {
        return { isBot: true, reason: 'timegate_too_fast' };
      }
    }
  }

  return { isBot: false };
}
