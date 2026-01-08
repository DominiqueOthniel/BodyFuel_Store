'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface OrderConfirmationProps {
  orderNumber: string;
  email: string;
  estimatedDelivery: string;
  total: number;
}

const OrderConfirmation = ({ orderNumber, email, estimatedDelivery, total }: OrderConfirmationProps) => {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircleIcon" size={48} className="text-success" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-heading font-bold text-foreground">
          Commande confirmée !
        </h2>
        <p className="text-lg text-muted-foreground">
          Merci pour votre achat chez BodyFuel Store
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-border">
          <span className="text-muted-foreground">Numéro de commande</span>
          <span className="font-bold text-foreground data-text">{orderNumber}</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-border">
          <span className="text-muted-foreground">Montant total</span>
          <span className="font-bold text-primary text-xl data-text">{total.toFixed(2)} €</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-border">
          <span className="text-muted-foreground">Email de confirmation</span>
          <span className="font-medium text-foreground">{email}</span>
        </div>

        <div className="flex items-center justify-between py-3">
          <span className="text-muted-foreground">Livraison estimée</span>
          <span className="font-medium text-foreground">{estimatedDelivery}</span>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="EnvelopeIcon" size={24} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="font-medium text-foreground">Confirmation envoyée</p>
            <p className="text-sm text-muted-foreground caption mt-1">
              Un email de confirmation avec les détails de votre commande et le numéro de suivi a été envoyé à {email}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Icon name="TruckIcon" size={32} className="text-primary mx-auto mb-2" />
          <p className="font-medium text-foreground">Suivi de livraison</p>
          <p className="text-sm text-muted-foreground caption mt-1">
            Suivez votre colis en temps réel
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Icon name="ShieldCheckIcon" size={32} className="text-primary mx-auto mb-2" />
          <p className="font-medium text-foreground">Paiement sécurisé</p>
          <p className="text-sm text-muted-foreground caption mt-1">
            Transaction protégée SSL
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Icon name="ChatBubbleLeftRightIcon" size={32} className="text-primary mx-auto mb-2" />
          <p className="font-medium text-foreground">Support client</p>
          <p className="text-sm text-muted-foreground caption mt-1">
            Disponible 7j/7
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
        <Link
          href="/order-history"
          className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium transition-smooth hover:opacity-90 flex items-center justify-center space-x-2"
        >
          <Icon name="ClipboardDocumentListIcon" size={20} />
          <span>Voir mes commandes</span>
        </Link>

        <Link
          href="/product-catalog"
          className="w-full sm:w-auto bg-card border border-border text-foreground px-8 py-3 rounded-lg font-medium transition-smooth hover:bg-muted flex items-center justify-center space-x-2"
        >
          <Icon name="ShoppingBagIcon" size={20} />
          <span>Continuer mes achats</span>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;