
import React, { useEffect, useRef } from 'react';
import './HexagonBackground.css';

const HexagonBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

   
    for (let i = 0; i < 20; i++) {
      const hexagon = document.createElement('div');
      hexagon.classList.add('hexagon');
      hexagon.style.left = `${Math.random() * 100}%`;
      hexagon.style.top = `${Math.random() * 100}%`;
      hexagon.style.animationDelay = `${Math.random() * 20}s`;
      container.appendChild(hexagon);
    }

    
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className="hexagon-background"></div>;
};

export default HexagonBackground;