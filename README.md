# ECO-ALQUILER Landing Page - Documentación del Proyecto

## 🏥 Descripción General
Este es un proyecto web profesional desarrollado con **Next.js** para **ECO-ALQUILER (Equibiomedic)**. La plataforma está diseñada para facilitar el alquiler de ecógrafos portátiles de alta gama (**Mindray Z6 y Z60**) en la ciudad de Medellín y el departamento de Antioquia, Colombia.

La aplicación combina una interfaz de usuario premium con un sistema de reserva inteligente y gestión en tiempo real a través de Supabase.

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

### 1. Sistema de Reserva Inteligente (Booking Wizard)
- **Asistente paso a paso**: Un wizard interactivo (`BookingWizard.tsx`) que guía al usuario en la selección del equipo, fechas y datos de contacto.
- **Verificación de disponibilidad**: Consulta en tiempo real (`availability.ts`) contra la base de datos de Supabase para asegurar que los equipos no se sobre-alquilen.
- **Cálculo de Cotizaciones**: Genera un desglose de costos basado en el tiempo de alquiler y el modelo seleccionado.

### 2. Catálogo de Productos y Comparativa
- Presentación detallada de los modelos **Mindray Z6** y **Mindray Z60**.
- Sección de comparativa técnica para ayudar a los profesionales de la salud a elegir el equipo adecuado.
- Enfoque en beneficios: portabilidad, calidad de imagen Dover, y respaldo técnico.

### 3. Aplicaciones Clínicas
- Sección dedicada a los usos del equipo: Ginecología, Abdominal, Vascular, Urgencias, etc.

### 4. Panel de Administración (In-progress)
- Estructura preparada para gestión de reservas y estado de los equipos (`app/(admin)`).

### 5. Integración de Notificaciones
- Sistema automático de envío de correos electrónicos para confirmación de cotizaciones y contacto directo a través de API routes.

---

## 📂 Estructura del Directorio

```text
src/
├── app/                    # Rutas y Layouts (Next.js App Router)
│   ├── (admin)/            # Rutas protegidas para administración
│   ├── (public)/           # Rutas públicas (Home, Login, Políticas)
│   ├── api/                # API Routes (Envío de correos, Debugging)
│   └── globals.css         # Estilos globales y tokens de diseño
├── components/
│   ├── layout/             # Componentes de estructura (Nav, Footer)
│   ├── sections/           # Secciones principales de la Landing Page (Hero, Advantages, etc.)
│   ├── ui/                 # Componentes de UI reutilizables (Buttons, Modals, AOS)
│   └── pdf/                # Generación de documentos PDF (si aplica)
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
   Crea un archivo `.env.local` con las siguientes claves (basado en `.env`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`

4. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) para ver el resultado.

---

## 📈 Configuración de Analítica

El proyecto incluye integraciones nativas para:
- **Google Tag Manager**: `GTM-WV8Q9KMF`
- **Google Analytics**: `G-Y0ZQV2PWF1`
- **Google Ads**: `AW-17907409527` y `AW-17807317804`

---

## 🔐 Seguridad y Políticas
- El proyecto incluye rutas para **Términos y Condiciones** y **Políticas de Privacidad** ajustadas a la normativa colombiana de protección de datos.

---

Desarrollado para **Equibiomedic** - Soluciones médicas de alta calidad.
