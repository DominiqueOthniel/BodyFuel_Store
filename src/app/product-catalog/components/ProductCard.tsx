'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    alt: string;
    proteinContent: string;
    flavors: string[];
    badge?: string;
    inStock: boolean;
  };
  onAddToCart: (productId: number) => void;
  onProductClick: (productId: number) => void;
}

const ProductCard = ({ product, onAddToCart, onProductClick }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product.id);
  };

  const handleCardClick = () => {
    onProductClick(product.id);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-card rounded-lg shadow-elevation-2 hover:shadow-elevation-3 transition-smooth overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <AppImage
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 bg-error text-error-foreground text-xs font-semibold rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="px-4 py-2 bg-muted text-muted-foreground font-semibold rounded-lg">
              Rupture de stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <div className="caption text-muted-foreground uppercase tracking-wide">
          {product.brand}
        </div>

        {/* Product Name */}
        <h3 className="font-heading font-semibold text-foreground line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Protein Content */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="BeakerIcon" size={16} />
          <span>{product.proteinContent}</span>
        </div>

        {/* Flavors */}
        <div className="flex items-center space-x-2">
          <span className="caption text-muted-foreground">Saveurs:</span>
          <div className="flex gap-1">
            {product.flavors.slice(0, 3).map((flavor, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-border bg-muted"
                title={flavor}
              />
            ))}
            {product.flavors.length > 3 && (
              <div className="w-6 h-6 rounded-full border-2 border-border bg-muted flex items-center justify-center text-xs">
                +{product.flavors.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                name="StarIcon"
                size={16}
                variant={index < Math.floor(product.rating) ? 'solid' : 'outline'}
                className={index < Math.floor(product.rating) ? 'text-accent' : 'text-muted-foreground'}
              />
            ))}
          </div>
          <span className="caption text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="space-y-1">
            {product.originalPrice && (
              <div className="caption text-muted-foreground line-through">
                {product.originalPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </div>
            )}
            <div className="text-xl font-heading font-bold text-primary">
              {product.price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth ${
              product.inStock
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            <Icon name="ShoppingCartIcon" size={18} />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;