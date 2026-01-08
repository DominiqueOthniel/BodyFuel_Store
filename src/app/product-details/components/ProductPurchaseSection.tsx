'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Variant {
  id: string;
  name: string;
  available: boolean;
}

interface ProductPurchaseSectionProps {
  flavors: Variant[];
  sizes: Variant[];
  inStock: boolean;
  onAddToCart: (flavor: string, size: string, quantity: number) => void;
}

const ProductPurchaseSection = ({
  flavors,
  sizes,
  inStock,
  onAddToCart,
}: ProductPurchaseSectionProps) => {
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0]?.id || '');
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(99, prev + delta)));
  };

  const handleAddToCart = () => {
    if (inStock && selectedFlavor && selectedSize) {
      onAddToCart(selectedFlavor, selectedSize, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-muted/50 rounded-lg">
      {/* Flavor Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Saveur
        </label>
        <select
          value={selectedFlavor}
          onChange={(e) => setSelectedFlavor(e.target.value)}
          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
        >
          {flavors.map((flavor) => (
            <option key={flavor.id} value={flavor.id} disabled={!flavor.available}>
              {flavor.name} {!flavor.available && '(Indisponible)'}
            </option>
          ))}
        </select>
      </div>

      {/* Size Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Taille
        </label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
        >
          {sizes.map((size) => (
            <option key={size.id} value={size.id} disabled={!size.available}>
              {size.name} {!size.available && '(Indisponible)'}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Quantité
        </label>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-10 h-10 flex items-center justify-center bg-card border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            aria-label="Diminuer la quantité"
          >
            <Icon name="MinusIcon" size={20} className="text-foreground" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
            className="w-20 px-4 py-2 bg-input border border-border rounded-lg text-center text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-smooth data-text"
            min="1"
            max="99"
          />
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 99}
            className="w-10 h-10 flex items-center justify-center bg-card border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
            aria-label="Augmenter la quantité"
          >
            <Icon name="PlusIcon" size={20} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!inStock || addedToCart}
        className={`w-full py-4 rounded-lg font-medium transition-smooth flex items-center justify-center space-x-2 ${
          addedToCart
            ? 'bg-success text-success-foreground'
            : inStock
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        {addedToCart ? (
          <>
            <Icon name="CheckIcon" size={20} />
            <span>Ajouté au panier</span>
          </>
        ) : (
          <>
            <Icon name="ShoppingCartIcon" size={20} />
            <span>{inStock ? 'Ajouter au panier' : 'Rupture de stock'}</span>
          </>
        )}
      </button>

      {/* Additional Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="py-3 px-4 bg-card border border-border rounded-lg hover:bg-muted transition-smooth flex items-center justify-center space-x-2">
          <Icon name="HeartIcon" size={18} className="text-foreground" />
          <span className="text-sm font-medium text-foreground">Favoris</span>
        </button>
        <button className="py-3 px-4 bg-card border border-border rounded-lg hover:bg-muted transition-smooth flex items-center justify-center space-x-2">
          <Icon name="ArrowsRightLeftIcon" size={18} className="text-foreground" />
          <span className="text-sm font-medium text-foreground">Comparer</span>
        </button>
      </div>
    </div>
  );
};

export default ProductPurchaseSection;