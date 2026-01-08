'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  const pathname = usePathname();

  const routeLabels: Record<string, string> = {
    '/product-catalog': 'Produits',
    '/product-details': 'Détails du produit',
    '/shopping-cart': 'Panier',
    '/checkout': 'Paiement',
    '/user-account-dashboard': 'Mon Compte',
    '/order-history': 'Historique des commandes',
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items && items.length > 0) {
      return items;
    }

    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', href: '/' }
    ];

    if (pathname === '/product-catalog') {
      return breadcrumbs;
    }

    if (pathname === '/product-details') {
      breadcrumbs.push(
        { label: 'Produits', href: '/product-catalog' },
        { label: 'Détails du produit', href: '/product-details' }
      );
    } else if (pathname === '/shopping-cart') {
      breadcrumbs.push({ label: 'Panier', href: '/shopping-cart' });
    } else if (pathname === '/checkout') {
      breadcrumbs.push(
        { label: 'Panier', href: '/shopping-cart' },
        { label: 'Paiement', href: '/checkout' }
      );
    } else if (pathname === '/user-account-dashboard') {
      breadcrumbs.push({ label: 'Mon Compte', href: '/user-account-dashboard' });
    } else if (pathname === '/order-history') {
      breadcrumbs.push(
        { label: 'Mon Compte', href: '/user-account-dashboard' },
        { label: 'Historique des commandes', href: '/order-history' }
      );
    } else {
      const label = routeLabels[pathname] || pathname.split('/').pop() || '';
      breadcrumbs.push({ label, href: pathname });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`py-4 ${className}`}
    >
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item.href} className="flex items-center">
              {!isFirst && (
                <Icon 
                  name="ChevronRightIcon" 
                  size={16} 
                  className="text-muted-foreground mx-2" 
                />
              )}
              {isLast ? (
                <span className="font-medium text-foreground caption">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-smooth caption"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;