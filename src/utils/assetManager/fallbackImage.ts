
/**
 * Utility functions for creating fallback images when asset loading fails
 */

// Get a simple colored placeholder
export const getPlaceholder = (): HTMLImageElement => {
  const img = new Image();
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%23303050" /%3E%3Ctext x="400" y="300" font-family="Arial" font-size="24" text-anchor="middle" fill="%23ffffff"%3ELoading background...%3C/text%3E%3C/svg%3E';
  console.log("Created simple placeholder image");
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
    // Fill background with a gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#303050');
    gradient.addColorStop(1, '#1A1F2C');
    ctx.fillStyle = gradient;
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
    
    // Add decorative elements
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 - 60, 40, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(155, 135, 245, 0.5)';
    ctx.fill();
    
    // Add text
    ctx.font = '24px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${fileName}`, canvas.width / 2, canvas.height / 2 + 20);
    ctx.font = '16px Arial';
    ctx.fillText('Background will appear shortly...', canvas.width / 2, canvas.height / 2 + 60);
    
    console.log(`Created canvas fallback for: ${fileName}`);
  }
  
  // Convert canvas to image
  const img = new Image();
  img.src = canvas.toDataURL();
  return img;
};
