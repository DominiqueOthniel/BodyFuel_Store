'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OrderFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  dateRange: string;
  status: string;
  category: string;
}

const OrderFilters = ({ onFilterChange }: OrderFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 'all',
    status: 'all',
    category: 'all',
  });

  const dateRangeOptions = [
    { value: 'all', label: 'Toutes les dates' },
    { value: 'last30', label: '30 derniers jours' },
    { value: 'last90', label: '90 derniers jours' },
    { value: 'last180', label: '6 derniers mois' },
    { value: 'lastYear', label: 'Dernière année' },
  ];

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'preparation', label: 'En préparation' },
    { value: 'shipped', label: 'Expédié' },
    { value: 'delivered', label: 'Livré' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'mass-gainers', label: 'Mass Gainers' },
    { value: 'proteins', label: 'Protéines' },
    { value: 'supplements', label: 'Suppléments' },
    { value: 'accessories', label: 'Accessoires' },
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: 'all',
      status: 'all',
      category: 'all',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = filters.dateRange !== 'all' || filters.status !== 'all' || filters.category !== 'all';

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 overflow-hidden">
      {/* Filter Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-muted/30 transition-smooth"
      >
        <div className="flex items-center gap-3">
          <Icon name="FunnelIcon" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filtres</h3>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              Actifs
            </span>
          )}
        </div>
        <Icon
          name="ChevronDownIcon"
          size={20}
          className={`text-muted-foreground transition-smooth ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 sm:p-6 pt-0 space-y-4">
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Période
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            >
              {dateRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Statut de commande
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Catégorie de produit
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-foreground border border-border hover:bg-muted rounded-lg transition-smooth"
            >
              <Icon name="XMarkIcon" size={18} />
              <span>Réinitialiser les filtres</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderFilters;