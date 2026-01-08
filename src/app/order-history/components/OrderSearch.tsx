'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OrderSearchProps {
  onSearch: (query: string) => void;
}

const OrderSearch = ({ onSearch }: OrderSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <Icon
          name="MagnifyingGlassIcon"
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Rechercher par numéro de commande ou nom de produit..."
          className="w-full pl-12 pr-12 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Effacer la recherche"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSearch;