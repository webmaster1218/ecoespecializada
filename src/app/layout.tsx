import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import { AOSInit } from "@/components/ui/AOSInit";

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
  title: "Alquiler de Ecógrafos en Medellín y Colombia | Mindray Portátiles",
  description: "Alquiler de ecógrafos en Medellín y toda Colombia. Equipos Mindray Z6 y Z60 de alta gama con respaldo de Equibiomedic. Entrega rápida.",
  keywords: ["alquiler ecografos medellin", "ecografos medellin", "mindray colombia", "ecografos portatiles", "equibiomedic", "alquiler equipos medicos"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${roboto.variable}`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17807317804"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17807317804');
          `}
        </Script>
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
