# ALQUILER DE ECOGRAFOS - Documentación del Proyecto

## 🏥 Descripción General
Este es un proyecto web profesional desarrollado con **Next.js** para **ALQUILER DE ECOGRAFOS**. La plataforma está diseñada para facilitar el alquiler de ecógrafos portátiles de alta gama (**Mindray Z6 y Z60**) en la ciudad de Medellín y el departamento de Antioquia, Colombia.

La aplicación combina una interfaz de usuario premium con un sistema de reserva inteligente, optimización para dispositivos móviles y una identidad visual coherente que refleja profesionalismo y confianza.

---

## 🚀 Tecnologías Principales

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) y CSS Modules para componentes específicos.
- **Base de Datos y Backend-as-a-Service**: [Supabase](https://supabase.com/) (Gestión de disponibilidad y reservas).
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/) y [AOS (Animate on Scroll)](https://michalsnik.github.io/aos/).
- **Iconos**: [Tabler Icons](https://tabler.io/icons) y [Lucide React](https://lucide.dev/).
- **Gestión de Fechas**: [date-fns](https://date-fns.org/).
- **Componentes UI**: Radix UI (Slot, etc.), [React Big Calendar](https://jquense.github.io/react-big-calendar/), [React Day Picker](https://daypicker.dev/).
- **Correo Electrónico**: [Nodemailer](https://nodemailer.com/).
- **Analítica y Marketing**: Google Analytics (GA4), Google Tag Manager (GTM), Google Ads y Microsoft Clarity.

---

## ✨ Características Detalladas

### 1. Landing Pages Especializadas (Z6 y Z60)
- **Diseño Premium**: Páginas dedicadas para los modelos **Mindray Z6** y **Mindray Z60** con una jerarquía visual clara y moderna.
- **Optimización Móvil**: Interfaz adaptativa con elementos compactos, botones de ancho completo en móviles y navegación fluida.
- **Hero Interactivo**: Presentación de productos con insignias de confianza (INVIMA, Soporte, Garantía) y llamadas a la acción (CTA) directas.

### 2. Sistema de Reserva Inteligente (Booking Wizard)
- **Asistente paso a paso**: Un wizard interactivo (`BookingWizard.tsx`) que guía al usuario en la selección del equipo, fechas y datos de contacto.
- **Verificación de disponibilidad**: Consulta en tiempo real (`availability.ts`) contra la base de datos de Supabase para asegurar la disponibilidad técnica.

### 3. Componentes Sincronizados
- **LogoLoop**: Carrusel de logotipos de empresas que confían en el servicio, reforzando la prueba social.
- **CallButton**: Componente reutilizable para llamadas y WhatsApp, estandarizado en toda la plataforma.
- **CTA Sections**: Secciones de cierre con diseño de "Tarjeta Azul" para maximizar la conversión.

### 4. Integración de Notificaciones
- Sistema automático de envío de correos electrónicos (`api/send-email`) para confirmación de cotizaciones y contacto.

---

## 📂 Estructura del Directorio

```text
src/
├── app/                    # Rutas y Layouts (Next.js App Router)
│   ├── (admin)/            # Rutas protegidas para administración
│   ├── (public)/           # Rutas públicas (Home, Z6, Z60, Login, Políticas)
│   ├── api/                # API Routes (Envío de correos, Debugging)
│   └── globals.css         # Estilos globales y tokens de diseño
├── components/
│   ├── layout/             # Componentes de estructura (Nav, Footer)
│   ├── sections/           # Secciones principales (Hero, LogoLoop, Advantages, etc.)
│   ├── ui/                 # Componentes de UI reutilizables (CallButton, Modals, AOS)
│   └── pdf/                # Generación de documentos PDF
├── lib/                    # Lógica de negocio y clientes externos
│   ├── availability.ts     # Lógica central de stock y fechas
│   └── supabase.ts         # Cliente de conexión a Supabase
└── utils/                  # Funciones de ayuda y formateo
```

---

## 🛠️ Instalación y Desarrollo

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env.local` con las siguientes claves:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`

4. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) para ver el resultado.

---

## 🔐 Seguridad y Políticas
- El proyecto incluye rutas para **Términos y Condiciones** y **Políticas de Privacidad** ajustadas a la normativa colombiana de protección de datos.

---

Desarrollado para **ALQUILER DE ECOGRAFOS** - Soluciones médicas de alta calidad en Medellín, Antioquia.
