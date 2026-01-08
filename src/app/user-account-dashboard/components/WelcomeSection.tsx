import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface WelcomeSectionProps {
  userName: string;
  accountStatus: string;
  memberSince: string;
  loyaltyPoints: number;
}

export default function WelcomeSection({ 
  userName, 
  accountStatus, 
  memberSince, 
  loyaltyPoints 
}: WelcomeSectionProps) {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 md:p-8 text-primary-foreground shadow-elevation-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">
            Bienvenue, {userName} !
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <Icon name="CheckBadgeIcon" size={20} variant="solid" />
              <span className="font-medium">{accountStatus}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="CalendarIcon" size={20} />
              <span>Membre depuis {memberSince}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 text-center min-w-[160px]">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Icon name="StarIcon" size={24} variant="solid" className="text-accent" />
            <span className="text-3xl font-bold">{loyaltyPoints}</span>
          </div>
          <p className="text-sm opacity-90">Points de fidélité</p>
        </div>
      </div>
    </div>
  );
}