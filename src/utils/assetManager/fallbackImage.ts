
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
        <rect width="200" height="200" fill="#303050" />
        <text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="#9b87f5" text-anchor="middle" dominant-baseline="middle">
          Image
        </text>
      </svg>
    `;
    
    // Convert SVG to data URL
    const svgBlob = new Blob([placeholderSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);
    
    // Create image and wait for it to load
    const img = new Image();
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = url;
    });
    
    placeholderImage = img;
    return img;
  } catch (e) {
    console.error('Could not create placeholder image', e);
    return null;
  }
}

/**
 * Get the current placeholder image or create one
 */
export function getPlaceholder(): HTMLImageElement | null {
  return placeholderImage;
}

/**
 * Create a canvas-based fallback image when even the placeholder fails
 */
export function createCanvasFallback(src: string): HTMLImageElement {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#303050';
      ctx.fillRect(0, 0, 100, 100);
      ctx.fillStyle = '#9b87f5';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Image', 50, 50);
      
      const fallbackImg = new Image();
      fallbackImg.src = canvas.toDataURL();
      return fallbackImg;
    }
  } catch (e) {
    console.error('Failed to create fallback image', e);
  }
  
  // Last resort empty image
  return new Image();
}
