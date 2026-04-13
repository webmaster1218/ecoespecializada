import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://alquilerdeecografos.com"),
  title: "Alquiler y Venta de Ecógrafos en Medellín y Antioquia | Mindray",
  description: "Líderes en ALQUILER y VENTA de ecógrafos Mindray en Medellín y Antioquia. Equipos Z6, Z60 y M7 con respaldo de Equibiomedic. Entrega rápida y soporte técnico.",
  keywords: ["alquiler ecografos medellin", "venta ecografos medellin", "ecografos medellin", "mindray colombia", "ecografos portatiles", "equibiomedic", "alquiler equipos medicos"],
  icons: {
    icon: "/images/logo/logo-pestaña.webp",
    apple: "/images/logo/logo-pestaña.webp",
  },
  verification: {
    google: "Ls8AN5mLsHq7NDhWW6rhp3Egt1jGoIM49_rRI1Nt_wQ",
  },
  openGraph: {
    title: "Alquiler y Venta de Ecógrafos en Medellín y Antioquia",
    description: "Equipos Mindray de alta gama con respaldo de Equibiomedic. Líderes en alquiler y venta para médicos en Medellín y Antioquia.",
    url: "https://alquilerdeecografos.com",
    siteName: "Ecoespecializada",
    images: [
      {
        url: "/images/logo/logo_alquilerdeecografos.webp",
        width: 1200,
        height: 630,
        alt: "Ecoespecializada Logo",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ecoespecializada",
  "alternateName": "Alquiler de Ecógrafos Colombia",
  "url": "https://alquilerdeecografos.com",
  "logo": "https://alquilerdeecografos.com/images/logo/logo_alquilerdeecografos.webp",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+573003608621",
    "contactType": "sales",
    "areaServed": "CO",
    "availableLanguage": "Spanish"
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61587750932611",
    "https://www.instagram.com/alquiler.de.ecografos/",
    "https://www.youtube.com/channel/UCz-uvK09Po3RaXP3mqYPbnA",
    "https://www.linkedin.com/company/alquiler-de-ec%C3%B3grafos-com/"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://scripts.clarity.ms" />
      </head>
      <body className={`${inter.variable} ${roboto.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WV8Q9KMF"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {/* Combined Google Analytics & Ads initialization */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y0ZQV2PWF1"
          strategy="lazyOnload"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17907409527"
          strategy="lazyOnload"
        />
        <Script id="google-analytics-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y0ZQV2PWF1');
            gtag('config', 'AW-17807317804');
            gtag('config', 'AW-17907409527');
          `}
        </Script>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WV8Q9KMF');`}
        </Script>
<script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
