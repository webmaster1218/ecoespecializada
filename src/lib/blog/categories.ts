// Categorías del blog con metadata para URLs, SEO y UI
export interface CategoryMeta {
  name: string;        // Display name: "Guías"
  slug: string;        // URL slug: "guias"
  icon: string;        // Emoji for UI
  description: string; // SEO description
}

export const categories: Record<string, CategoryMeta> = {
  guias: {
    name: 'Guías',
    slug: 'guias',
    icon: '📖',
    description: 'Guías prácticas y tutoriales sobre ultrasonido médico, alquiler de ecógrafos y mejores prácticas para clínicas en Colombia.',
  },
  equipos: {
    name: 'Equipos',
    slug: 'equipos',
    icon: '🖥️',
    description: 'Información detallada sobre equipos de ultrasonido Mindray Z6, Z60, M7 y más. Especificaciones y comparativas.',
  },
  'casos-exito': {
    name: 'Casos de Éxito',
    slug: 'casos-exito',
    icon: '⭐',
    description: 'Historias reales de clínicas y profesionales que transformaron su práctica con el alquiler de ecógrafos.',
  },
  ciudades: {
    name: 'Ciudades',
    slug: 'ciudades',
    icon: '📍',
    description: 'Cobertura de alquiler de ecógrafos por ciudades en Colombia: Bogotá, Medellín, Cali y más.',
  },
  tecnica: {
    name: 'Técnica',
    slug: 'tecnica',
    icon: '🔬',
    description: 'Contenido técnico sobre innovaciones, tendencias y el futuro del ultrasonido móvil en Colombia.',
  },
};

/** Get category metadata by slug */
export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories[slug];
}

/** Get all category slugs */
export function getAllCategorySlugs(): string[] {
  return Object.keys(categories);
}

/** Resolve a category slug or display name to its metadata */
export function resolveCategory(input: string): CategoryMeta | undefined {
  // Direct slug match
  if (categories[input]) return categories[input];
  // Match by display name
  return Object.values(categories).find(c => c.name === input);
}
