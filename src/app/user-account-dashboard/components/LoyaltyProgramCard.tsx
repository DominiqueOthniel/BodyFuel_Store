import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface LoyaltyTier {
  name: string;
  pointsRequired: number;
  benefits: string[];
}

interface LoyaltyProgramCardProps {
  currentPoints: number;
  currentTier: string;
  nextTier: LoyaltyTier;
  availableRewards: number;
}

export default function LoyaltyProgramCard({ 
  currentPoints, 
  currentTier, 
  nextTier,
  availableRewards 
}: LoyaltyProgramCardProps) {
  const pointsToNextTier = nextTier.pointsRequired - currentPoints;
  const progress = (currentPoints / nextTier.pointsRequired) * 100;

  return (
    <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-6 border border-accent/20">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
            Programme de fidélité
          </h3>
          <p className="text-sm text-muted-foreground caption">
            Niveau actuel : <span className="font-medium text-foreground">{currentTier}</span>
          </p>
        </div>
        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
          <Icon name="GiftIcon" size={24} variant="solid" className="text-accent-foreground" />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-foreground font-medium">
            Progression vers {nextTier.name}
          </span>
          <span className="text-sm text-muted-foreground caption">
            {currentPoints} / {nextTier.pointsRequired} points
          </span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-smooth"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground caption mt-2">
          Plus que {pointsToNextTier} points pour atteindre le niveau {nextTier.name}
        </p>
      </div>

      {availableRewards > 0 && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success" />
            <p className="text-sm text-foreground font-medium">
              {availableRewards} récompense{availableRewards !== 1 ? 's' : ''} disponible{availableRewards !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-2 mb-4">
        <p className="text-xs font-medium text-foreground">
          Avantages du niveau {nextTier.name} :
        </p>
        {nextTier.benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-2">
            <Icon name="CheckIcon" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <span className="text-xs text-muted-foreground caption">
              {benefit}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/user-account-dashboard"
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth"
      >
        <Icon name="SparklesIcon" size={18} />
        <span>Voir mes récompenses</span>
      </Link>
    </div>
  );
}