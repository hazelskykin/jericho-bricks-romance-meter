
/**
 * Fallback image generation for failed asset loads
 */

let placeholderImage: HTMLImageElement | null = null;

/**
 * Initialize a placeholder image for fallbacks
 */
export async function initPlaceholder(): Promise<HTMLImageElement | null> {
  try {
    // Create a simple placeholder image as SVG data URL for fallbacks
    const placeholderSvg = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#3D3D6D" />
        <text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="#C7B5FF" text-anchor="middle" dominant-baseline="middle">
          Image
        </text>
      </svg>
    `;
    
    // Use data URL directly to avoid blob issues
    const img = new Image();
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(placeholderSvg)}`;
    
    // Wait for it to load
    await new Promise((resolve) => {
      img.onload = resolve;
    });
    
    placeholderImage = img;
    return img;
  } catch (e) {
    console.error('Could not create placeholder image', e);
    return null;
  }
}

/**
 * Get the current placeholder image or create one immediately
 */
export function getPlaceholder(): HTMLImageElement {
  if (!placeholderImage) {
    // Create a simple one directly
    const img = new Image();
    img.src = "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='200' fill='%233D3D6D' /%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='24' fill='%23C7B5FF' text-anchor='middle' dominant-baseline='middle'%3EImage%3C/text%3E%3C/svg%3E";
    placeholderImage = img;
  }
  return placeholderImage as HTMLImageElement;
}

/**
 * Create a canvas-based fallback image when even the placeholder fails
 */
export function createCanvasFallback(src: string): HTMLImageElement {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#3D3D6D';
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = '#C7B5FF';
      ctx.font = '18px sans-serif';
      ctx.textAlign = 'center';
      
      // Show the filename in the fallback if possible
      let filename = "Image";
      if (src) {
        const parts = src.split('/');
        filename = parts[parts.length - 1].substring(0, 15);
      }
      
      ctx.fillText(filename, 100, 100);
      
      const fallbackImg = new Image();
      fallbackImg.src = canvas.toDataURL();
      return fallbackImg;
    }
  } catch (e) {
    console.error('Failed to create fallback image', e);
  }
  
  // Last resort empty image
  const img = new Image();
  img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
  return img;
}

/**
 * Quick access to a minimal fallback image
 */
export function getMinimalFallback(): HTMLImageElement {
  const img = new Image();
  img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
  return img;
}
