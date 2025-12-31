export const languages = {
  en: 'English',
  es: 'Español',
};

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: string) {
    return translations[lang][key] || translations[defaultLang][key] || key;
  };
}

export function getLocalizedUrl(url: string, lang: Language): string {
  return `/${lang}${url}`;
}

export function switchLanguageUrl(currentPath: string, newLang: Language): string {
  const pathParts = currentPath.split('/').filter(Boolean);
  if (pathParts[0] in languages) {
    pathParts[0] = newLang;
  } else {
    pathParts.unshift(newLang);
  }
  return '/' + pathParts.join('/');
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.books': 'Books',
    'nav.blog': 'Blog',
    'nav.radio': 'Radio',
    'nav.tobacco': 'Tobacco',
    'site.title': 'Manuel de Portugal',
    'site.tagline': 'Author and researcher in radio communication and tobacco studies',
    'home.latestPosts': 'Latest Posts',
    'home.featuredBooks': 'Featured Books',
    'home.aboutTeaser': 'Learn more about my work',
    'home.viewAllPosts': 'View all posts',
    'home.viewAllBooks': 'View all books',
    'home.radioCard.title': 'Radio',
    'home.radioCard.description': 'Explore amateur radio, communication, and related topics',
    'home.tobaccoCard.title': 'Tobacco',
    'home.tobaccoCard.description': 'Professional tobacco history, science, and research',
    'books.title': 'Books',
    'books.download': 'Download',
    'books.category.radio': 'Radio Books',
    'books.category.tobacco': 'Tobacco Books',
    'books.category.other': 'Other Books',
    'books.relatedBooks': 'Related Books',
    'books.publicationDate': 'Published',
    'blog.title': 'Blog',
    'blog.category.all': 'All',
    'blog.category.radio': 'Radio',
    'blog.category.tobacco': 'Tobacco',
    'blog.category.tools': 'Tools',
    'blog.category.veterinary': 'Veterinary',
    'blog.category.other': 'Other',
    'blog.categories': 'Categories',
    'blog.readMore': 'Read more',
    'blog.backToBlog': 'Back to Blog',
    'blog.relatedPosts': 'Related Posts',
    'blog.postsInCategory': 'Posts in category',
    'radio.title': 'Radio',
    'radio.intro': 'Exploring the fascinating world of amateur radio and communication technology.',
    'radio.booksSection': 'Radio Books',
    'radio.articlesSection': 'Radio Articles',
    'tobacco.title': 'Tobacco',
    'tobacco.intro': 'Professional insights into tobacco history, science, and industry.',
    'tobacco.booksSection': 'Tobacco Books',
    'tobacco.articlesSection': 'Tobacco Articles',
    'footer.copyright': 'All rights reserved',
    'about.title': 'About',
    'station.callsigns': 'Main Callsigns',
    'station.equipment': 'Station Equipment',
    'station.location': 'Operating Location',
    'station.transceiver': 'Transceiver',
    'station.antennas': 'Antennas',
    'station.power': 'Power',
    'station.qth': 'QTH',
    'station.locator': 'Grid Locator',
    'station.class': 'License Class',
    'station.coordinates': 'Coordinates',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.books': 'Libros',
    'nav.blog': 'Blog',
    'nav.radio': 'Radio',
    'nav.tobacco': 'Tabaco',
    'site.title': 'Manuel de Portugal',
    'site.tagline': 'Autor e investigador en comunicación por radio y estudios del tabaco',
    'home.latestPosts': 'Últimas Publicaciones',
    'home.featuredBooks': 'Libros Destacados',
    'home.aboutTeaser': 'Conoce más sobre mi trabajo',
    'home.viewAllPosts': 'Ver todas las publicaciones',
    'home.viewAllBooks': 'Ver todos los libros',
    'home.radioCard.title': 'Radio',
    'home.radioCard.description': 'Explora radioafición, comunicación y temas relacionados',
    'home.tobaccoCard.title': 'Tabaco',
    'home.tobaccoCard.description': 'Historia profesional del tabaco, ciencia e investigación',
    'books.title': 'Libros',
    'books.download': 'Descargar',
    'books.category.radio': 'Libros de Radio',
    'books.category.tobacco': 'Libros de Tabaco',
    'books.category.other': 'Otros Libros',
    'books.relatedBooks': 'Libros Relacionados',
    'books.publicationDate': 'Publicado',
    'blog.title': 'Blog',
    'blog.category.all': 'Todos',
    'blog.category.radio': 'Radio',
    'blog.category.tobacco': 'Tabaco',
    'blog.category.tools': 'Herramientas',
    'blog.category.veterinary': 'Veterinaria',
    'blog.category.other': 'Otros',
    'blog.categories': 'Categorías',
    'blog.readMore': 'Leer más',
    'blog.backToBlog': 'Volver al Blog',
    'blog.relatedPosts': 'Publicaciones Relacionadas',
    'blog.postsInCategory': 'Publicaciones en la categoría',
    'radio.title': 'Radio',
    'radio.intro': 'Explorando el fascinante mundo de la radioafición y la tecnología de comunicación.',
    'radio.booksSection': 'Libros de Radio',
    'radio.articlesSection': 'Artículos de Radio',
    'tobacco.title': 'Tabaco',
    'tobacco.intro': 'Perspectivas profesionales sobre la historia, ciencia e industria del tabaco.',
    'tobacco.booksSection': 'Libros de Tabaco',
    'tobacco.articlesSection': 'Artículos de Tabaco',
    'footer.copyright': 'Todos los derechos reservados',
    'about.title': 'Acerca de',
    'station.callsigns': 'Indicativos Principales',
    'station.equipment': 'Equipo de Estación',
    'station.location': 'Ubicación de Operación',
    'station.transceiver': 'Transceptor',
    'station.antennas': 'Antenas',
    'station.power': 'Potencia',
    'station.qth': 'QTH',
    'station.locator': 'Localizador de Cuadrícula',
    'station.class': 'Clase de Licencia',
    'station.coordinates': 'Coordenadas',
  },
};

