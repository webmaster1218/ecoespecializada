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
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
