'use client';

import React, { useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import RecommendationCard from './RecommendationCard';

interface Recommendation {
  id: string;
  name: string;
  brand: string;
  image: string;
  alt: string;
  price: number;
  memberPrice: number;
  category: string;
  reason: string;
  rating: number;
}

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

export default function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = (productId: string) => {
    console.log('Adding to cart:', productId);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground mb-1">
            Recommandations personnalisées
          </h2>
          <p className="text-sm text-muted-foreground caption">
            Basées sur vos objectifs et achats précédents
          </p>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 flex items-center justify-center bg-muted hover:bg-muted/80 rounded-lg transition-smooth"
            aria-label="Précédent"
          >
            <Icon name="ChevronLeftIcon" size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 flex items-center justify-center bg-muted hover:bg-muted/80 rounded-lg transition-smooth"
            aria-label="Suivant"
          >
            <Icon name="ChevronRightIcon" size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-custom pb-4"
      >
        {recommendations.map((product) => (
          <RecommendationCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}