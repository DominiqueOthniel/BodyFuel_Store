'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface OrderProduct {
  id: number;
  name: string;
  image: string;
  alt: string;
  quantity: number;
  price: number;
}

interface OrderCardProps {
  orderNumber: string;
  date: string;
  total: number;
  status: 'En préparation' | 'Expédié' | 'Livré';
  products: OrderProduct[];
  trackingNumber?: string;
  shippingAddress: string;
  paymentMethod: string;
  deliveryDate?: string;
  canReturn: boolean;
}

const OrderCard = ({
  orderNumber,
  date,
  total,
  status,
  products,
  trackingNumber,
  shippingAddress,
  paymentMethod,
  deliveryDate,
  canReturn,
}: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'En préparation':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Expédié':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'Livré':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleDownloadInvoice = () => {
    console.log(`Téléchargement de la facture pour la commande ${orderNumber}`);
  };

  const handleTrackPackage = () => {
    console.log(`Suivi du colis pour la commande ${orderNumber}`);
  };

  const handleReorder = () => {
    console.log(`Nouvelle commande basée sur ${orderNumber}`);
  };

  const handleReturnRequest = () => {
    console.log(`Demande de retour pour la commande ${orderNumber}`);
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 overflow-hidden transition-smooth hover:shadow-elevation-3">
      {/* Order Header */}
      <div className="p-4 sm:p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-foreground">
                Commande #{orderNumber}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
                {status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground caption">
              <div className="flex items-center gap-1.5">
                <Icon name="CalendarIcon" size={16} />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="CurrencyEuroIcon" size={16} />
                <span className="font-medium text-foreground">{total.toFixed(2)} €</span>
              </div>
              {trackingNumber && (
                <div className="flex items-center gap-1.5">
                  <Icon name="TruckIcon" size={16} />
                  <span className="data-text">{trackingNumber}</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-smooth"
          >
            <span>{isExpanded ? 'Masquer les détails' : 'Voir les détails'}</span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`transition-smooth ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Product Thumbnails */}
      <div className="p-4 sm:p-6 bg-muted/30">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-custom pb-2">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-background">
                <AppImage
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                {product.quantity}
              </span>
            </div>
          ))}
          <div className="flex-shrink-0 text-sm text-muted-foreground caption">
            {products.length} produit{products.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-6 border-t border-border">
          {/* Product List */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Produits commandés</h4>
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
                    <AppImage
                      src={product.image}
                      alt={product.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground caption mt-1">
                      Quantité: {product.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-foreground data-text">
                    {product.price.toFixed(2)} €
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Information */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Adresse de livraison</h4>
              <p className="text-sm text-muted-foreground caption whitespace-pre-line">
                {shippingAddress}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Informations de paiement</h4>
              <p className="text-sm text-muted-foreground caption">{paymentMethod}</p>
              {deliveryDate && (
                <p className="text-sm text-muted-foreground caption mt-2">
                  Livraison prévue: {deliveryDate}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-smooth"
            >
              <Icon name="DocumentArrowDownIcon" size={18} />
              <span>Télécharger facture</span>
            </button>
            {trackingNumber && (
              <button
                onClick={handleTrackPackage}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-smooth"
              >
                <Icon name="MapPinIcon" size={18} />
                <span>Suivre colis</span>
              </button>
            )}
            <button
              onClick={handleReorder}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-smooth"
            >
              <Icon name="ArrowPathIcon" size={18} />
              <span>Commander à nouveau</span>
            </button>
            {canReturn && (
              <button
                onClick={handleReturnRequest}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground border border-border hover:bg-muted rounded-lg transition-smooth"
              >
                <Icon name="ArrowUturnLeftIcon" size={18} />
                <span>Demander un retour</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;