'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
}

interface EmptyCartProps {
  recommendedProducts: RecommendedProduct[];
}

const EmptyCart: React.FC<EmptyCartProps> = ({ recommendedProducts }) => {
  return (
    <div className="max-w-4xl mx-auto text-center py-16">
      {/* Empty State Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
          <Icon name="ShoppingCartIcon" size={64} className="text-muted-foreground" />
        </div>
      </div>

      {/* Empty State Message */}
      <h2 className="font-heading font-semibold text-3xl text-foreground mb-4">
        Votre panier est vide
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Découvrez notre gamme complète de suppléments pour la musculation et commencez votre transformation dès aujourd'hui!
      </p>

      {/* CTA Button */}
      <Link
        href="/product-catalog"
        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth font-heading font-semibold text-lg shadow-elevation-2 hover:shadow-elevation-3"
      >
        <Icon name="ShoppingBagIcon" size={20} />
        <span>Découvrir nos produits</span>
      </Link>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mt-16">
          <h3 className="font-heading font-semibold text-2xl text-foreground mb-8">
            Produits populaires
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <Link
                key={product.id}
                href="/product-details"
                className="group bg-card rounded-lg border border-border overflow-hidden transition-smooth hover:shadow-elevation-3"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <AppImage
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-heading font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
                    {product.name}
                  </h4>
                  <p className="font-heading font-semibold text-lg text-primary">
                    {product.price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyCart;