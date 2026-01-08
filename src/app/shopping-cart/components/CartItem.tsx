'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    image: string;
    alt: string;
    variant: string;
    price: number;
    quantity: number;
    stock: number;
  };
  onQuantityChange: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove, onSaveForLater }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.stock) return;
    
    setIsUpdating(true);
    setQuantity(newQuantity);
    
    setTimeout(() => {
      onQuantityChange(item.id, newQuantity);
      setIsUpdating(false);
    }, 300);
  };

  const itemTotal = item.price * quantity;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border border-border transition-smooth hover:shadow-elevation-2">
      {/* Product Image */}
      <div className="flex-shrink-0 w-full sm:w-32 h-32 overflow-hidden rounded-lg bg-muted">
        <AppImage
          src={item.image}
          alt={item.alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground text-lg mb-1 line-clamp-2">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground caption">
              {item.variant}
            </p>
          </div>
          
          <div className="text-right sm:ml-4">
            <p className="font-heading font-semibold text-lg text-foreground">
              {item.price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            </p>
            <p className="text-xs text-muted-foreground caption">Prix unitaire</p>
          </div>
        </div>

        {/* Quantity Controls & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground caption mr-2">Quantité:</span>
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isUpdating}
                className="w-10 h-10 flex items-center justify-center bg-muted hover:bg-muted/80 text-foreground transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Diminuer la quantité"
              >
                <Icon name="MinusIcon" size={16} />
              </button>
              
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  handleQuantityChange(val);
                }}
                min="1"
                max={item.stock}
                className="w-16 h-10 text-center border-x border-border bg-background text-foreground font-medium data-text focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Quantité"
              />
              
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= item.stock || isUpdating}
                className="w-10 h-10 flex items-center justify-center bg-muted hover:bg-muted/80 text-foreground transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Augmenter la quantité"
              >
                <Icon name="PlusIcon" size={16} />
              </button>
            </div>
            
            {quantity >= item.stock && (
              <span className="text-xs text-warning caption">Stock max</span>
            )}
          </div>

          {/* Item Total */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="text-right">
              <p className="font-heading font-bold text-xl text-primary">
                {itemTotal.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </p>
              <p className="text-xs text-muted-foreground caption">Total</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-border">
          <button
            onClick={() => onSaveForLater(item.id)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:text-primary transition-smooth caption"
          >
            <Icon name="BookmarkIcon" size={16} />
            <span>Sauvegarder pour plus tard</span>
          </button>
          
          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-error hover:text-error/80 transition-smooth caption"
          >
            <Icon name="TrashIcon" size={16} />
            <span>Supprimer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;