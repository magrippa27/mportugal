export function normalizeImagePath(imagePath: string | null | undefined): string {
  if (!imagePath) return '';
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const baseUrl = import.meta.env.BASE_URL;
  
  if (imagePath.startsWith('/')) {
    return `${baseUrl}${imagePath.slice(1)}`;
  }
  
  return `${baseUrl}${imagePath}`;
}

