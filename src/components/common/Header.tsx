'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  cartItemCount?: number;
}

const Header = ({ cartItemCount = 0 }: HeaderProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Accueil', href: '/', icon: 'HomeIcon' },
    { label: 'Produits', href: '/product-catalog', icon: 'ShoppingBagIcon' },
    { label: 'Panier', href: '/shopping-cart', icon: 'ShoppingCartIcon' },
    { label: 'Mon Compte', href: '/user-account-dashboard', icon: 'UserCircleIcon' },
  ];

  const accountMenuItems = [
    { label: 'Tableau de bord', href: '/user-account-dashboard', icon: 'HomeIcon' },
    { label: 'Historique des commandes', href: '/order-history', icon: 'ClipboardDocumentListIcon' },
  ];

  const isActivePath = (href: string) => pathname === href;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isAccountMenuOpen) setIsAccountMenuOpen(false);
  };

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsAccountMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-navigation bg-card shadow-elevation-2">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 transition-smooth hover:opacity-80"
            onClick={closeMobileMenu}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
              >
                <path
                  d="M20 8L12 14V26L20 32L28 26V14L20 8Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                />
                <path
                  d="M20 20L12 14M20 20L28 14M20 20V32"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                />
              </svg>
            </div>
            <span className="text-xl font-heading font-semibold text-foreground hidden sm:block">
              BodyFuel Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                isActivePath('/')
                  ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted'
              }`}
            >
              <Icon name="HomeIcon" size={20} />
              <span className="font-medium">Accueil</span>
            </Link>

            <Link
              href="/product-catalog"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                isActivePath('/product-catalog') || isActivePath('/product-details')
                  ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted'
              }`}
            >
              <Icon name="ShoppingBagIcon" size={20} />
              <span className="font-medium">Produits</span>
            </Link>

            <Link
              href="/shopping-cart"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth relative ${
                isActivePath('/shopping-cart') || isActivePath('/checkout')
                  ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted'
              }`}
            >
              <Icon name="ShoppingCartIcon" size={20} />
              <span className="font-medium">Panier</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold bg-accent text-accent-foreground rounded-full">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* Account Menu Desktop */}
            <div className="relative">
              <button
                onClick={toggleAccountMenu}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                  isActivePath('/user-account-dashboard') || isActivePath('/order-history')
                    ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="UserCircleIcon" size={20} />
                <span className="font-medium">Mon Compte</span>
                <Icon 
                  name="ChevronDownIcon" 
                  size={16} 
                  className={`transition-smooth ${isAccountMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isAccountMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-dropdown" 
                    onClick={() => setIsAccountMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-popover rounded-lg shadow-elevation-3 overflow-hidden z-dropdown">
                    {accountMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsAccountMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 transition-smooth ${
                          isActivePath(item.href)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-popover-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={item.icon as any} size={20} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button & Cart Icon */}
          <div className="flex items-center space-x-3 md:hidden">
            <Link
              href="/shopping-cart"
              className="relative p-2 text-foreground hover:bg-muted rounded-lg transition-smooth"
              onClick={closeMobileMenu}
            >
              <Icon name="ShoppingCartIcon" size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold bg-accent text-accent-foreground rounded-full">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="p-2 text-foreground hover:bg-muted rounded-lg transition-smooth"
              aria-label="Toggle menu"
            >
              <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-background z-dropdown top-16" 
            onClick={closeMobileMenu}
          />
          <nav className="md:hidden bg-card shadow-elevation-3 z-dropdown relative">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                    isActivePath(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              {/* Account Section Mobile */}
              <div className="pt-2 border-t border-border">
                <button
                  onClick={toggleAccountMenu}
                  className="flex items-center justify-between w-full px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-smooth"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="UserCircleIcon" size={20} />
                    <span className="font-medium">Mon Compte</span>
                  </div>
                  <Icon 
                    name="ChevronDownIcon" 
                    size={16} 
                    className={`transition-smooth ${isAccountMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isAccountMenuOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {accountMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                          isActivePath(item.href)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={item.icon as any} size={18} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;