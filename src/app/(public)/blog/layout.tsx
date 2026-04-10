import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Alquiler de Ecógrafos - Guías y Recursos Médicos',
  description:
    'Blog de ultrasonido médico: guías prácticas, casos de éxito, innovaciones y tendencias en ecógrafos. Información para profesionales de la salud.',
  keywords: 'blog ultrasonido,guías ecografía,casos éxito,tendencias médicas',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
