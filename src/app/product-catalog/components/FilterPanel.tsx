'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterPanelProps {
  filters: {
    categories: string[];
    brands: string[];
    dietary: string[];
    goals: string[];
  };
  activeFilters: {
    category: string;
    priceRange: [number, number];
    brands: string[];
    dietary: string[];
    goals: string[];
  };
  onFilterChange: (filterType: string, value: any) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const FilterPanel = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  isMobile = false,
  onClose
}: FilterPanelProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    brands: false,
    dietary: false,
    goals: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange('category', category === activeFilters.category ? '' : category);
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = activeFilters.brands.includes(brand)
      ? activeFilters.brands.filter(b => b !== brand)
      : [...activeFilters.brands, brand];
    onFilterChange('brands', newBrands);
  };

  const handleDietaryToggle = (dietary: string) => {
    const newDietary = activeFilters.dietary.includes(dietary)
      ? activeFilters.dietary.filter(d => d !== dietary)
      : [...activeFilters.dietary, dietary];
    onFilterChange('dietary', newDietary);
  };

  const handleGoalToggle = (goal: string) => {
    const newGoals = activeFilters.goals.includes(goal)
      ? activeFilters.goals.filter(g => g !== goal)
      : [...activeFilters.goals, goal];
    onFilterChange('goals', newGoals);
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const newRange: [number, number] = [...activeFilters.priceRange];
    if (type === 'min') {
      newRange[0] = value;
    } else {
      newRange[1] = value;
    }
    onFilterChange('priceRange', newRange);
  };

  const activeFilterCount = 
    (activeFilters.category ? 1 : 0) +
    activeFilters.brands.length +
    activeFilters.dietary.length +
    activeFilters.goals.length +
    (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 200 ? 1 : 0);

  return (
    <div className={`bg-card rounded-lg shadow-elevation-2 ${isMobile ? 'h-full' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="FunnelIcon" size={20} className="text-primary" />
          <h2 className="font-heading font-semibold text-foreground">Filtres</h2>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <button
              onClick={onClearFilters}
              className="caption text-primary hover:text-primary/80 transition-smooth"
            >
              Réinitialiser
            </button>
          )}
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-lg transition-smooth"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Filters Content */}
      <div className={`${isMobile ? 'overflow-y-auto' : ''}`} style={{ maxHeight: isMobile ? 'calc(100vh - 120px)' : 'auto' }}>
        {/* Categories */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted transition-smooth"
          >
            <span className="font-medium text-foreground">Catégories</span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`transition-smooth ${expandedSections.category ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSections.category && (
            <div className="px-4 pb-4 space-y-2">
              {filters.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`w-full px-4 py-2 rounded-lg text-left transition-smooth ${
                    activeFilters.category === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted transition-smooth"
          >
            <span className="font-medium text-foreground">Prix</span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`transition-smooth ${expandedSections.price ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSections.price && (
            <div className="px-4 pb-4 space-y-4">
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={activeFilters.priceRange[0]}
                  onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Min:</span>
                  <span className="font-semibold text-foreground">
                    {activeFilters.priceRange[0].toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={activeFilters.priceRange[1]}
                  onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Max:</span>
                  <span className="font-semibold text-foreground">
                    {activeFilters.priceRange[1].toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Brands */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('brands')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted transition-smooth"
          >
            <span className="font-medium text-foreground">Marques</span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`transition-smooth ${expandedSections.brands ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSections.brands && (
            <div className="px-4 pb-4 space-y-2">
              {filters.brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-smooth"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-foreground">{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Dietary */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('dietary')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted transition-smooth"
          >
            <span className="font-medium text-foreground">Régime alimentaire</span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`transition-smooth ${expandedSections.dietary ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSections.dietary && (
            <div className="px-4 pb-4 space-y-2">
              {filters.dietary.map((diet) => (
                <label
                  key={diet}
                  className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-smooth"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.dietary.includes(diet)}
                    onChange={() => handleDietaryToggle(diet)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-foreground">{diet}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Goals */}
        <div>
          <button
            onClick={() => toggleSection('goals')}
            className="w-full flex items-center justify-between p-4 hover:bg-muted transition-smooth"
          >
            <span className="font-medium text-foreground">Objectifs</span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`transition-smooth ${expandedSections.goals ? 'rotate-180' : ''}`}
            />
          </button>
          {expandedSections.goals && (
            <div className="px-4 pb-4 space-y-2">
              {filters.goals.map((goal) => (
                <label
                  key={goal}
                  className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-smooth"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.goals.includes(goal)}
                    onChange={() => handleGoalToggle(goal)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span className="text-foreground">{goal}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;