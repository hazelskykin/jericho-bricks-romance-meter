
/**
 * Utility functions for creating fallback images when asset loading fails
 */

// Get a simple colored placeholder
export const getPlaceholder = (): HTMLImageElement => {
  const img = new Image();
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23303050" /%3E%3C/svg%3E';
  return img;
};

// Create a canvas-based fallback with text
export const createCanvasFallback = (src: string): HTMLImageElement => {
  // Extract the file name from the path for display
  const fileName = src.split('/').pop() || 'unknown';
  
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  
  // Get the 2D context
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Fill background
    ctx.fillStyle = '#303050';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add texture pattern
    ctx.fillStyle = '#252540';
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 15; j++) {
        if ((i + j) % 2 === 0) {
          ctx.fillRect(i * 40, j * 40, 40, 40);
        }
      }
    }
    
    // Add text
    ctx.font = '24px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`Loading: ${fileName}`, canvas.width / 2, canvas.height / 2);
  }
  
  // Convert canvas to image
  const img = new Image();
  img.src = canvas.toDataURL();
  return img;
};
