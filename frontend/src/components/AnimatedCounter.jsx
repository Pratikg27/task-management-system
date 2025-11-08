import React, { useState, useEffect } from 'react';
import './AnimatedCounter.css';

const AnimatedCounter = ({ 
  endValue, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  className = '' 
}) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const value = Math.floor(easeOutQuart * endValue);
      
      setCurrentValue(value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration]);

  return (
    <span className={`animated-counter ${className}`}>
      {prefix}{currentValue.toLocaleString()}{suffix}
    </span>
  );
};

export default AnimatedCounter;