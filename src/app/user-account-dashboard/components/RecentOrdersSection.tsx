'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import RecentOrderCard from './RecentOrderCard';

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

interface RecentOrdersSectionProps {
  orders: RecentOrder[];
}

export default function RecentOrdersSection({ orders }: RecentOrdersSectionProps) {
  const handleReorder = (orderId: string) => {
    console.log('Reordering:', orderId);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Commandes récentes
        </h2>
        <Link
          href="/order-history"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-smooth"
        >
          <span>Voir tout</span>
          <Icon name="ChevronRightIcon" size={16} />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="ShoppingBagIcon" size={32} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">
            Vous n'avez pas encore passé de commande
          </p>
          <Link
            href="/product-catalog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth"
          >
            <Icon name="ShoppingBagIcon" size={20} />
            <span>Commencer vos achats</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <RecentOrderCard
              key={order.id}
              order={order}
              onReorder={handleReorder}
            />
          ))}
        </div>
      )}
    </div>
  );
}