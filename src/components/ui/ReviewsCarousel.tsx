import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function ReviewsCarousel() {
  return (
    
    <div className="h-full w-auto flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden ">
      <InfiniteMovingCards
        items={imagenesDelCamino} 
        direction="right"
        speed="slow"
      />
    </div>
  );
}
{/*IMAGENES DEL CARRUSEL*/}

const imagenesDelCamino = [
  {
    
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    alt: "Paisaje Montaña",
  },
  {
    
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    alt: "Valles Verdes",
  },
  {
    
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
    alt: "Caminata",
  },
];

export default ReviewsCarousel;