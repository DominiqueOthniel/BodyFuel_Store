'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface FlavorSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    brand: string;
    price: number;
    image: string;
    alt: string;
    flavors: Array<{
      name: string;
      available: boolean;
    }>;
    sizes: Array<{
      weight: string;
      price: number;
      available: boolean;
    }>;
  } | null;
  onConfirm: (productId: number, flavor: string, size: string, quantity: number) => void;
}

const FlavorSelectionModal = ({ isOpen, onClose, product, onConfirm }: FlavorSelectionModalProps) => {
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!isOpen || !product) return null;

  const handleConfirm = () => {
    if (selectedFlavor && selectedSize) {
      onConfirm(product.id, selectedFlavor, selectedSize, quantity);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedFlavor('');
    setSelectedSize('');
    setQuantity(1);
    onClose();
  };

  const selectedSizeData = product.sizes?.find(s => s.weight === selectedSize);
  const totalPrice = selectedSizeData ? selectedSizeData.price * quantity : product.price * quantity;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-modal"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-elevation-5 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex-1">
              <h2 className="text-xl font-heading font-semibold text-foreground">
                Sélectionnez vos options
              </h2>
              <p className="caption text-muted-foreground mt-1">
                {product.brand} - {product.name}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-muted rounded-lg transition-smooth"
              aria-label="Fermer"
              title="Fermer"
            >
              <Icon name="XMarkIcon" size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Product Preview */}
            <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                <AppImage
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {product.name}
                </h3>
                <p className="caption text-muted-foreground">
                  {product.brand}
                </p>
              </div>
            </div>

            {/* Flavor Selection */}
            <div className="space-y-3">
              <label className="block font-medium text-foreground">
                Saveur <span className="text-error">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.flavors.map((flavor) => (
                  <button
                    key={flavor.name}
                    onClick={() => flavor.available && setSelectedFlavor(flavor.name)}
                    disabled={!flavor.available}
                    className={`p-3 rounded-lg border-2 transition-smooth ${
                      selectedFlavor === flavor.name
                        ? 'border-primary bg-primary/10 text-primary'
                        : flavor.available
                        ? 'border-border hover:border-primary/50 text-foreground'
                        : 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    <span className="font-medium">{flavor.name}</span>
                    {!flavor.available && (
                      <span className="block caption text-muted-foreground mt-1">
                        Indisponible
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <label className="block font-medium text-foreground">
                Taille <span className="text-error">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(product.sizes || []).map((size) => (
                  <button
                    key={size.weight}
                    onClick={() => size.available && setSelectedSize(size.weight)}
                    disabled={!size.available}
                    className={`p-3 rounded-lg border-2 transition-smooth ${
                      selectedSize === size.weight
                        ? 'border-primary bg-primary/10 text-primary'
                        : size.available
                        ? 'border-border hover:border-primary/50 text-foreground'
                        : 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    <div className="font-medium">{size.weight}</div>
                    <div className="caption mt-1">
                      {size.price.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                    </div>
                    {!size.available && (
                      <span className="block caption text-muted-foreground mt-1">
                        Indisponible
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="block font-medium text-foreground">
                Quantité
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-muted hover:bg-muted/80 rounded-lg transition-smooth"
                  aria-label="Diminuer la quantité"
                  title="Diminuer la quantité"
                >
                  <Icon name="MinusIcon" size={20} />
                </button>
                <span className="text-xl font-semibold text-foreground min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center bg-muted hover:bg-muted/80 rounded-lg transition-smooth"
                  aria-label="Augmenter la quantité"
                  title="Augmenter la quantité"
                >
                  <Icon name="PlusIcon" size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-border">
            <div className="space-y-1">
              <div className="caption text-muted-foreground">Prix total</div>
              <div className="text-2xl font-heading font-bold text-primary">
                {totalPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
              </div>
            </div>
            <button
              onClick={handleConfirm}
              disabled={!selectedFlavor || !selectedSize}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-smooth ${
                selectedFlavor && selectedSize
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              <Icon name="ShoppingCartIcon" size={20} />
              <span>Ajouter au panier</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlavorSelectionModal;