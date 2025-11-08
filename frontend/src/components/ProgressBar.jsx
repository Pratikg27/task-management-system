import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

const ProgressBar = ({ 
  percentage, 
  duration = 2000, 
  color = '#2563eb', 
  height = '8px',
  showLabel = false 
}) => {
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const width = easeOutQuart * percentage;
      
      setCurrentWidth(width);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Small delay to ensure smooth animation
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [percentage, duration]);

  return (
    <div className="progress-bar-container">
      <div 
        className="progress-bar-track" 
        style={{ height }}
      >
        <div 
          className="progress-bar-fill"
          style={{ 
            width: `${currentWidth}%`,
            backgroundColor: color,
            height: '100%'
          }}
        />
      </div>
      {showLabel && (
        <span className="progress-bar-label">
          {Math.round(currentWidth)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;