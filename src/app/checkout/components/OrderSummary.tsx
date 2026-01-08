'use client';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CartItem {
  id: number;
  name: string;
  image: string;
  alt: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryCost: number;
  discount?: number;
  promoCode?: string;
  onRemovePromo?: () => void;
}

const OrderSummary = ({ 
  items, 
  subtotal, 
  deliveryCost, 
  discount = 0,
  promoCode,
  onRemovePromo 
}: OrderSummaryProps) => {
  const total = subtotal + deliveryCost - discount;
  const tva = total * 0.2;

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6 sticky top-24">
      <h3 className="text-xl font-heading font-semibold text-foreground">Récapitulatif</h3>

      <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-custom">
        {items.map((item) => (
          <div key={item.id} className="flex items-start space-x-3">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <AppImage
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm line-clamp-2">{item.name}</h4>
              {item.variant && (
                <p className="text-xs text-muted-foreground caption mt-0.5">{item.variant}</p>
              )}
              <p className="font-semibold text-foreground mt-1 data-text">
                {(item.price * item.quantity).toFixed(2)} €
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Sous-total</span>
          <span className="font-medium text-foreground data-text">{subtotal.toFixed(2)} €</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Livraison</span>
          <span className="font-medium text-foreground data-text">
            {deliveryCost === 0 ? 'Gratuite' : `${deliveryCost.toFixed(2)} €`}
          </span>
        </div>

        {discount > 0 && promoCode && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-success">Code promo</span>
              <span className="px-2 py-0.5 bg-success/10 text-success rounded text-xs font-medium caption">
                {promoCode}
              </span>
              {onRemovePromo && (
                <button
                  onClick={onRemovePromo}
                  className="text-muted-foreground hover:text-error transition-smooth"
                  aria-label="Retirer le code promo"
                >
                  <Icon name="XMarkIcon" size={16} />
                </button>
              )}
            </div>
            <span className="font-medium text-success data-text">-{discount.toFixed(2)} €</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">TVA (20%)</span>
          <span className="font-medium text-foreground data-text">{tva.toFixed(2)} €</span>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">Total</span>
          <span className="text-2xl font-bold text-primary data-text">{total.toFixed(2)} €</span>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
        <div className="flex items-center space-x-2 text-success">
          <Icon name="CheckCircleIcon" size={20} />
          <span className="text-sm font-medium">Paiement sécurisé SSL</span>
        </div>
        <div className="flex items-center space-x-2 text-success">
          <Icon name="TruckIcon" size={20} />
          <span className="text-sm font-medium">Livraison suivie</span>
        </div>
        <div className="flex items-center space-x-2 text-success">
          <Icon name="ArrowPathIcon" size={20} />
          <span className="text-sm font-medium">Retour sous 30 jours</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;