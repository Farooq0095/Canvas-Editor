import React, { useState, useRef, useEffect } from 'react';

function CanvasEditor() {
  // State variables
  const [captionText, setCaptionText] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [backgroundColor, setBackgroundColor] = useState("#0369A1");
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image file
  const [imageLoaded, setImageLoaded] = useState(false);

  // Ref for canvas element
  const canvasRef = useRef(null);

  // Default image URL
  const defaultImageUrl = "data:image/jpeg;base64,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"; // Replace with your default image URL

  // Effect hook to draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw template only if an image is selected
    if (selectedImage) {
      const image = new Image();
      image.src = URL.createObjectURL(selectedImage);
      image.onload = () => {
        setImageLoaded(true);
        drawTemplate(ctx, captionText, ctaText, backgroundColor, image);
      };
      return () => {
        // Cleanup when component unmounts or when a new image is selected
        URL.revokeObjectURL(image.src);
      };
    } else {
      const defaultImage = new Image();
      defaultImage.src = defaultImageUrl;
      defaultImage.onload = () => {
        setImageLoaded(true);
        drawTemplate(ctx, captionText, ctaText, backgroundColor, defaultImage);
      };
    }
  }, [selectedImage, captionText, ctaText, backgroundColor]);

  // Function to draw template on canvas
  const drawTemplate = (ctx, caption, cta, bgColor, img) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw image if loaded
    if (img) {
      const imgWidth = 350; // Adjust image width as needed
      const imgHeight = 200; // Adjust image height as needed
      ctx.drawImage(img, (ctx.canvas.width - imgWidth) / 2, (ctx.canvas.height - imgHeight) / 2, imgWidth, imgHeight); // Center image
      ctx.strokeStyle = 'white'; // Border color
      ctx.lineWidth = 2; // Border width
      ctx.strokeRect((ctx.canvas.width - imgWidth) / 2, (ctx.canvas.height - imgHeight) / 2, imgWidth, imgHeight); // Draw border around image
    }

    // Draw caption
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(caption || 'without a flower fragrance loses its assence ', ctx.canvas.width / 2, 50);

    // Draw CTA button
    const buttonWidth = 150;
    const buttonHeight = 40;
    const buttonX = (ctx.canvas.width - buttonWidth) / 2;
    const buttonY = ctx.canvas.height - 80;
    const cornerRadius = 10;
    ctx.fillStyle = 'blue'; // Button color
    ctx.strokeStyle = 'white'; // Border color
    ctx.lineWidth = 2; // Border width
    // Draw rounded rectangle
    ctx.beginPath();
    ctx.moveTo(buttonX + cornerRadius, buttonY);
    ctx.arcTo(buttonX + buttonWidth, buttonY, buttonX + buttonWidth, buttonY + buttonHeight, cornerRadius);
    ctx.arcTo(buttonX + buttonWidth, buttonY + buttonHeight, buttonX, buttonY + buttonHeight, cornerRadius);
    ctx.arcTo(buttonX, buttonY + buttonHeight, buttonX, buttonY, cornerRadius);
    ctx.arcTo(buttonX, buttonY, buttonX + buttonWidth, buttonY, cornerRadius);
    ctx.closePath();
    ctx.fill(); // Fill button
    ctx.stroke(); // Stroke border
    ctx.fillStyle = 'white'; // Button text color
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(cta || 'Shop Now', ctx.canvas.width / 2, ctx.canvas.height - 55); // Button text position
  };

  // Function to handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImageLoaded(false); // Reset image loaded state when selecting a new image
  };

  return (
    <div className="canvas-editor">
      <div>
        <label htmlFor="caption">Caption:</label>
        <input 
          type="text" 
          id="caption" 
          value={captionText} 
          onChange={(e) => setCaptionText(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="cta">CTA:</label>
        <input 
          type="text" 
          id="cta" 
          value={ctaText} 
          onChange={(e) => setCtaText(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="image">Select Image:</label>
        <input 
          type="file" 
          id="image" 
          onChange={handleImageSelect} 
        />
      </div>
      <div>
        <label htmlFor="background-color">Background Color:</label>
        <input 
          type="color" 
          id="background-color" 
          value={backgroundColor} 
          onChange={(e) => setBackgroundColor(e.target.value)} 
        />
      </div>
      <canvas ref={canvasRef} width={600} height={400}></canvas>
    </div>
  );
}

export default CanvasEditor;


