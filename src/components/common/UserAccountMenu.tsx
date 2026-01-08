'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface UserAccountMenuProps {
  className?: string;
}

const UserAccountMenu = ({ className = '' }: UserAccountMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const menuItems = [
    { 
      label: 'Tableau de bord', 
      href: '/user-account-dashboard', 
      icon: 'HomeIcon',
      description: 'Vue d\'ensemble de votre compte'
    },
    { 
      label: 'Historique des commandes', 
      href: '/order-history', 
      icon: 'ClipboardDocumentListIcon',
      description: 'Consultez vos commandes passées'
    },
  ];

  const isActivePath = (href: string) => pathname === href;
  const isAccountSection = pathname === '/user-account-dashboard' || pathname === '/order-history';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      <button
        onClick={toggleMenu}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
          isAccountSection
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground hover:bg-muted'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon name="UserCircleIcon" size={20} />
        <span className="font-medium hidden sm:inline">Mon Compte</span>
        <Icon 
          name="ChevronDownIcon" 
          size={16} 
          className={`transition-smooth ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-dropdown" 
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-72 bg-popover rounded-lg shadow-elevation-3 overflow-hidden z-dropdown animate-fade-in">
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-start space-x-3 px-4 py-3 transition-smooth ${
                    isActivePath(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-popover-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon as any} size={20} className="mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-xs mt-0.5 caption ${
                      isActivePath(item.href) 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserAccountMenu;