
/**
 * Fallback image generation for failed asset loads
 */

let placeholderImage: HTMLImageElement | null = null;

/**
 * Initialize a placeholder image for fallbacks
 */
export async function initPlaceholder(): Promise<HTMLImageElement | null> {
  if (placeholderImage) return placeholderImage;

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
    return createMinimalPlaceholder();
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
  return placeholderImage;
}

/**
 * Create a minimal placeholder image for emergency fallbacks
 */
function createMinimalPlaceholder(): HTMLImageElement {
  const img = new Image();
  img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
  return img;
}

/**
 * Create a canvas-based fallback image with more info
 */
export function createCanvasFallback(src: string): HTMLImageElement {
  try {
    // For background path, create a colored placeholder for backgrounds
    if (src && src.includes('/backgrounds/')) {
      return createBackgroundPlaceholder();
    }
    
    // For character path, create a character silhouette
    if (src && src.includes('/characters/')) {
      return createCharacterPlaceholder(src);
    }
    
    // For anything else, create a basic placeholder
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
  return createMinimalPlaceholder();
}

/**
 * Create a background placeholder with gradient
 */
function createBackgroundPlaceholder(): HTMLImageElement {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Create a gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1A1F2C');
      gradient.addColorStop(1, '#323254');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some text
      ctx.fillStyle = '#C7B5FF';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Background Image', canvas.width/2, canvas.height/2);
      
      const fallbackImg = new Image();
      fallbackImg.src = canvas.toDataURL();
      return fallbackImg;
    }
  } catch (e) {
    console.error('Failed to create background fallback', e);
  }
  
  return getPlaceholder();
}

/**
 * Create a character placeholder with silhouette
 */
function createCharacterPlaceholder(src: string): HTMLImageElement {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Fill with transparent background
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Extract character name if possible
      let character = "Character";
      if (src) {
        const match = src.match(/\/characters\/([^-]+)/);
        if (match && match[1]) {
          character = match[1].charAt(0).toUpperCase() + match[1].slice(1);
        }
      }
      
      // Draw a simple silhouette
      ctx.fillStyle = '#6952c7';
      ctx.beginPath();
      ctx.ellipse(300, 250, 100, 120, 0, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw body shape
      ctx.beginPath();
      ctx.moveTo(220, 360);
      ctx.lineTo(380, 360);
      ctx.lineTo(350, 600);
      ctx.lineTo(250, 600);
      ctx.closePath();
      ctx.fill();
      
      // Add character name
      ctx.fillStyle = '#C7B5FF';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(character, canvas.width/2, 700);
      
      const fallbackImg = new Image();
      fallbackImg.src = canvas.toDataURL();
      return fallbackImg;
    }
  } catch (e) {
    console.error('Failed to create character fallback', e);
  }
  
  return getPlaceholder();
}
