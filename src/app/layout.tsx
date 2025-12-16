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
  title: "Alquiler de Ecógrafos Colombia | Mindray Portátiles",
  description: "Alquila Ecógrafos Mindray Z6 y Z60 Portátiles de alta gama con respaldo oficial de Equibiomedic. Entrega en 48h en toda Colombia.",
  keywords: ["alquiler ecografos", "mindray colombia", "ecografos portatiles", "equibiomedic", "alquiler equipos medicos"],
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
