'use client';

import { useEffect, useRef } from 'react';

interface PlaceholderImageProps {
 width: number;
 height: number;
 text?: string;
 bgColor?: string;
 textColor?: string;
}

export function generatePlaceholderSVG({
 width,
 height,
 text = 'Loading...',
 bgColor = '#2A3132',
 textColor = '#ffffff',
}: PlaceholderImageProps) {
 return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="system-ui, sans-serif"
        font-size="20"
        fill="${textColor}"
        text-anchor="middle"
        dy=".3em"
        opacity="0.5"
      >${text}</text>
    </svg>
  `;
}

export function PlaceholderImage({
 width,
 height,
 text,
 bgColor,
 textColor,
}: PlaceholderImageProps) {
 const canvasRef = useRef<HTMLCanvasElement>(null);

 useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set background
  ctx.fillStyle = bgColor || '#2A3132';
  ctx.fillRect(0, 0, width, height);

  // Set text
  ctx.fillStyle = textColor || '#ffffff';
  ctx.font = '20px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text || 'Loading...', width / 2, height / 2);
 }, [width, height, text, bgColor, textColor]);

 return <canvas ref={canvasRef} width={width} height={height} />;
}
