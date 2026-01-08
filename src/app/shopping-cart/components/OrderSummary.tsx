'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  onApplyPromoCode: (code: string) => void;
  onCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping,
  discount,
  total,
  onApplyPromoCode,
  onCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError('Veuillez entrer un code promo');
      setPromoSuccess('');
      return;
    }

    // Mock promo code validation
    const validCodes = ['BIENVENUE10', 'FITNESS20', 'MUSCLE15'];
    if (validCodes.includes(promoCode.toUpperCase())) {
      setPromoSuccess('Code promo appliqué avec succès!');
      setPromoError('');
      onApplyPromoCode(promoCode);
      setPromoCode('');
    } else {
      setPromoError('Code promo invalide');
      setPromoSuccess('');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
      <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
        Récapitulatif de commande
      </h2>

      {/* Promo Code Input */}
      <div className="mb-6">
        <label htmlFor="promo-code" className="block text-sm font-medium text-foreground mb-2 caption">
          Code promo
        </label>
        <div className="flex gap-2">
          <input
            id="promo-code"
            type="text"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              setPromoError('');
              setPromoSuccess('');
            }}
            placeholder="Entrez votre code"
            className="flex-1 px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
          />
          <button
            onClick={handleApplyPromo}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-medium"
          >
            Appliquer
          </button>
        </div>
        {promoError && (
          <p className="text-xs text-error mt-1 caption flex items-center gap-1">
            <Icon name="ExclamationCircleIcon" size={14} />
            {promoError}
          </p>
        )}
        {promoSuccess && (
          <p className="text-xs text-success mt-1 caption flex items-center gap-1">
            <Icon name="CheckCircleIcon" size={14} />
            {promoSuccess}
          </p>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground caption">Sous-total</span>
          <span className="font-medium text-foreground data-text">
            {subtotal.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground caption">Livraison</span>
          <span className="font-medium text-foreground data-text">
            {shipping === 0 ? 'Gratuite' : `${shipping.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`}
          </span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-success caption">Réduction</span>
            <span className="font-medium text-success data-text">
              -{discount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            </span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-heading font-semibold text-lg text-foreground">Total</span>
        <span className="font-heading font-bold text-2xl text-primary">
          {total.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
        </span>
      </div>

      {/* Trust Signals */}
      <div className="space-y-2 mb-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground caption">
          <Icon name="ShieldCheckIcon" size={16} className="text-success" />
          <span>Paiement 100% sécurisé</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground caption">
          <Icon name="TruckIcon" size={16} className="text-primary" />
          <span>Livraison estimée: 3-5 jours ouvrés</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground caption">
          <Icon name="ArrowPathIcon" size={16} className="text-secondary" />
          <span>Retours gratuits sous 30 jours</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth font-heading font-semibold text-lg shadow-elevation-2 hover:shadow-elevation-3 flex items-center justify-center gap-2"
      >
        <span>Procéder au paiement</span>
        <Icon name="ArrowRightIcon" size={20} />
      </button>

      {/* Guest Checkout Option */}
      <p className="text-center text-xs text-muted-foreground mt-3 caption">
        Vous pouvez également commander en tant qu'invité
      </p>
    </div>
  );
};

export default OrderSummary;