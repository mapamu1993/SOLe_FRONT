"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  
  items: {
    image: string;  
    alt?: string;   
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  
  const [start, setStart] = useState(false);
  
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  
 return (
    <div
      ref={containerRef}
      
      className={cn(
        "scroller relative z-20 w-full overflow-hidden rounded-3xl",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:run]"
        )}
      >
        {items.map((item, idx) => (
          <li
            // LIMPIO: Sin bordes, fondo transparente.
            className="w-auto h-[300px] max-w-full relative flex-shrink-0 border-none bg-transparent"
            key={item.image + idx}
          >
            <div className="relative w-auto h-full">
              <img 
                src={item.image} 
                alt={item.alt || "Imagen del camino"} 
                className="block w-auto h-full object-cover pointer-events-none rounded-3xl" 
              />
            </div>
          </li>
        ))}
      </ul>

      {/* --- AQUÍ ESTÁ LA SOLUCIÓN ROBUSTA --- */}

      {/* CORTINA IZQUIERDA */}
      <div 
        className="absolute inset-y-0 left-0 z-50 pointer-events-none rounded-3xl"
        style={{
          width: '100px', // Ancho fijo para asegurarnos de que se ve
          background: 'linear-gradient(to right, rgba(255,255,255,0.2), transparent)', // Un toque de luz
          backdropFilter: 'blur(8px)', // Desenfoque forzado por CSS puro
          WebkitBackdropFilter: 'blur(8px)', // Para navegadores Safari/Chrome antiguos
          maskImage: 'linear-gradient(to right, black 20%, transparent)', // Máscara suave
          WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent)'
        }}
      ></div>

      {/* CORTINA DERECHA */}
      <div 
        className="absolute inset-y-0 right-0 z-50 pointer-events-none rounded-3xl"
        style={{
          width: '100px',
          background: 'linear-gradient(to left, rgba(255,255,255,0.2), transparent)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          maskImage: 'linear-gradient(to left, black 20%, transparent)',
          WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent)'
        }}
      ></div>

    </div>
  );
};