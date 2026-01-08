'use client';

import Icon from '@/components/ui/AppIcon';

interface SortControlsProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  totalProducts: number;
}

const SortControls = ({ sortBy, onSortChange, totalProducts }: SortControlsProps) => {
  const sortOptions = [
    { value: 'relevance', label: 'Pertinence' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating', label: 'Meilleures notes' },
    { value: 'newest', label: 'Nouveautés' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-card rounded-lg shadow-elevation-1">
      <div className="flex items-center space-x-2">
        <Icon name="AdjustmentsHorizontalIcon" size={20} className="text-muted-foreground" />
        <span className="text-foreground font-medium">
          {totalProducts.toLocaleString('fr-FR')} produit{totalProducts !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <span className="caption text-muted-foreground whitespace-nowrap">Trier par:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="flex-1 sm:flex-initial px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortControls;