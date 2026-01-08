'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface NutritionalInfo {
  servingSize: string;
  servingsPerContainer: number;
  calories: number;
  protein: string;
  carbohydrates: string;
  fats: string;
  ingredients: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

interface ProductTabsProps {
  description: string;
  nutritionalInfo: NutritionalInfo;
  usage: string;
  reviews: Review[];
  averageRating: number;
}

const ProductTabs = ({
  description,
  nutritionalInfo,
  usage,
  reviews,
  averageRating,
}: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<'description' | 'nutrition' | 'usage' | 'reviews'>('description');

  const tabs = [
    { id: 'description' as const, label: 'Description détaillée', icon: 'DocumentTextIcon' },
    { id: 'nutrition' as const, label: 'Informations nutritionnelles', icon: 'ChartBarIcon' },
    { id: 'usage' as const, label: "Mode d'emploi", icon: 'InformationCircleIcon' },
    { id: 'reviews' as const, label: 'Avis clients', icon: 'ChatBubbleLeftRightIcon' },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="StarIcon"
        variant={index < Math.floor(rating) ? 'solid' : 'outline'}
        size={16}
        className={index < Math.floor(rating) ? 'text-accent' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-smooth whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab.icon as any} size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {activeTab === 'description' && (
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Informations par portion
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Taille de portion</span>
                    <span className="font-medium text-foreground data-text">{nutritionalInfo.servingSize}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Portions par contenant</span>
                    <span className="font-medium text-foreground data-text">{nutritionalInfo.servingsPerContainer}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Calories</span>
                    <span className="font-medium text-foreground data-text">{nutritionalInfo.calories} kcal</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  Macronutriments
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Protéines</span>
                    <span className="font-medium text-foreground data-text">{nutritionalInfo.protein}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Glucides</span>
                    <span className="font-medium text-foreground data-text">{nutritionalInfo.carbohydrates}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Lipides</span>
                    <span className="font-medium text-foreground data-text">{nutritionalInfo.fats}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Ingrédients
              </h3>
              <p className="text-sm text-foreground leading-relaxed">
                {nutritionalInfo.ingredients}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-4">
            <div className="p-6 bg-muted/50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="InformationCircleIcon" size={24} className="text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    Instructions d'utilisation
                  </h3>
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {usage}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="ExclamationTriangleIcon" size={24} className="text-warning flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    Avertissements
                  </h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    Consulter un professionnel de santé avant utilisation. Ne pas dépasser la dose recommandée. Tenir hors de portée des enfants. Ce produit ne remplace pas une alimentation variée et équilibrée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Rating Summary */}
            <div className="flex items-center justify-between p-6 bg-muted/50 rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl font-heading font-bold text-foreground">
                    {averageRating.toFixed(1)}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(averageRating)}
                    </div>
                    <span className="text-sm text-muted-foreground caption">
                      Basé sur {reviews.length} avis
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth font-medium">
                Écrire un avis
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-6 bg-card border border-border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-foreground">{review.author}</span>
                        {review.verified && (
                          <span className="flex items-center space-x-1 px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded caption">
                            <Icon name="CheckBadgeIcon" size={14} />
                            <span>Achat vérifié</span>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground caption">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;