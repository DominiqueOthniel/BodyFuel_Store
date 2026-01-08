'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CartStatusIndicatorProps {
  itemCount?: number;
  className?: string;
  showLabel?: boolean;
}

const CartStatusIndicator = ({ 
  itemCount = 0, 
  className = '',
  showLabel = false 
}: CartStatusIndicatorProps) => {
  return (
    <Link
      href="/shopping-cart"
      className={`relative inline-flex items-center space-x-2 p-2 rounded-lg transition-smooth hover:bg-muted ${className}`}
      aria-label={`Panier avec ${itemCount} article${itemCount !== 1 ? 's' : ''}`}
    >
      <Icon name="ShoppingCartIcon" size={24} className="text-foreground" />
      
      {showLabel && (
        <span className="font-medium text-foreground hidden sm:inline">
          Panier
        </span>
      )}

      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-bold bg-accent text-accent-foreground rounded-full transition-spring">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartStatusIndicator;