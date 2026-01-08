'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  category: string;
}

interface RecommendedProductsProps {
  products: Product[];
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ products }) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-12 pt-12 border-t border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-2xl text-foreground">
          Vous pourriez aussi aimer
        </h2>
        <Link
          href="/product-catalog"
          className="flex items-center gap-1 text-primary hover:text-primary/80 transition-smooth caption font-medium"
        >
          <span>Voir tout</span>
          <Icon name="ArrowRightIcon" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href="/product-details"
            className="group bg-card rounded-lg border border-border overflow-hidden transition-smooth hover:shadow-elevation-3"
          >
            <div className="aspect-square overflow-hidden bg-muted relative">
              <AppImage
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full caption">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-heading font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <p className="font-heading font-semibold text-lg text-primary">
                  {product.price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                </p>
                <button 
                  className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-smooth"
                  aria-label="Ajouter au panier"
                  title="Ajouter au panier"
                >
                  <Icon name="PlusIcon" size={16} />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;