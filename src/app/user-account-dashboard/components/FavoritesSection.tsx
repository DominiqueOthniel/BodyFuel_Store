'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import FavoriteProductCard from './FavoriteProductCard';

interface FavoriteProduct {
  id: string;
  name: string;
  brand: string;
  image: string;
  alt: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

interface FavoritesSectionProps {
  products: FavoriteProduct[];
}

export default function FavoritesSection({ products }: FavoritesSectionProps) {
  const handleAddToCart = (productId: string) => {
    console.log('Adding to cart:', productId);
  };

  const handleRemoveFavorite = (productId: string) => {
    console.log('Removing from favorites:', productId);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Mes favoris
        </h2>
        <span className="text-sm text-muted-foreground caption">
          {products.length} produit{products.length !== 1 ? 's' : ''}
        </span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="HeartIcon" size={32} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">
            Vous n'avez pas encore de produits favoris
          </p>
          <Link
            href="/product-catalog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth"
          >
            <Icon name="MagnifyingGlassIcon" size={20} />
            <span>Découvrir nos produits</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <FavoriteProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}