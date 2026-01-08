import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface OrderProduct {
  id: string;
  name: string;
  image: string;
  alt: string;
  quantity: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: string;
  statusColor: string;
  products: OrderProduct[];
  trackingAvailable: boolean;
}

interface RecentOrderCardProps {
  order: RecentOrder;
  onReorder: (orderId: string) => void;
}

export default function RecentOrderCard({ order, onReorder }: RecentOrderCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-medium text-foreground">
            Commande #{order.orderNumber}
          </p>
          <p className="text-sm text-muted-foreground caption mt-1">
            {order.date}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
          {order.status}
        </span>
      </div>

      <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-custom pb-2">
        {order.products.map((product) => (
          <div key={product.id} className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
              <AppImage
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-cover"
              />
            </div>
            {product.quantity > 1 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                {product.quantity}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-lg font-bold text-foreground">
          {order.total.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
        </span>
        <div className="flex gap-2">
          {order.trackingAvailable && (
            <Link
              href={`/order-history?order=${order.orderNumber}`}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-smooth"
            >
              <Icon name="TruckIcon" size={16} />
              <span>Suivre</span>
            </Link>
          )}
          <button
            onClick={() => onReorder(order.id)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-smooth"
          >
            <Icon name="ArrowPathIcon" size={16} />
            <span>Recommander</span>
          </button>
        </div>
      </div>
    </div>
  );
}