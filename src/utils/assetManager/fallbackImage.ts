
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
    // Making the fallback more visible with a brighter background and text
    const placeholderSvg = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#3D3D6D" />
        <text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="#C7B5FF" text-anchor="middle" dominant-baseline="middle">
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
  if (!placeholderImage) {
    // Try to create a simple one directly if the async version hasn't completed
    try {
      const img = new Image();
      img.src = "data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='200' height='200' fill='%233D3D6D' /%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='24' fill='%23C7B5FF' text-anchor='middle' dominant-baseline='middle'%3EImage%3C/text%3E%3C/svg%3E";
      placeholderImage = img;
    } catch (e) {
      console.error('Failed to create inline placeholder', e);
    }
  }
  return placeholderImage;
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
  img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdgJOZ9hnFQAAAABJRU5ErkJggg==";
  return img;
}
