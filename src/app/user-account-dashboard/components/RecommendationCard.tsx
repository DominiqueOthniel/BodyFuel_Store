'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

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

interface RecommendationCardProps {
  product: Recommendation;
  onAddToCart: (productId: string) => void;
}

export default function RecommendationCard({ product, onAddToCart }: RecommendationCardProps) {
  const savings = product.price - product.memberPrice;
  const savingsPercent = Math.round((savings / product.price) * 100);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-elevation-2 transition-smooth flex-shrink-0 w-[280px] group">
      <Link href="/product-details" className="block relative">
        <div className="aspect-square bg-muted overflow-hidden">
          <AppImage
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        </div>
        <span className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-bold">
          Prix membre
        </span>
      </Link>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground caption">
            {product.brand}
          </span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground caption">
            {product.category}
          </span>
        </div>

        <Link href="/product-details">
          <h3 className="font-medium text-foreground mb-2 line-clamp-2 hover:text-primary transition-smooth">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="StarIcon"
                size={14}
                variant={i < Math.floor(product.rating) ? 'solid' : 'outline'}
                className={i < Math.floor(product.rating) ? 'text-accent' : 'text-muted-foreground'}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground caption">
            {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="bg-accent/10 rounded-lg p-2 mb-3">
          <p className="text-xs text-foreground caption">
            <Icon name="SparklesIcon" size={14} className="inline text-accent mr-1" />
            {product.reason}
          </p>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-primary">
            {product.memberPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </span>
          <span className="text-sm text-muted-foreground line-through">
            {product.price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </span>
          <span className="text-xs text-success font-medium">
            -{savingsPercent}%
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth"
        >
          <Icon name="ShoppingCartIcon" size={18} />
          <span>Ajouter au panier</span>
        </button>
      </div>
    </div>
  );
}