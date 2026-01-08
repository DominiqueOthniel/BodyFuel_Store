'use client';

import React, { useState, useEffect } from 'react';
import WelcomeSection from './WelcomeSection';
import QuickActionsGrid from './QuickActionsGrid';
import RecentOrdersSection from './RecentOrdersSection';
import FavoritesSection from './FavoritesSection';
import RecommendationsSection from './RecommendationsSection';
import LoyaltyProgramCard from './LoyaltyProgramCard';
import AccountSettingsCard from './AccountSettingsCard';
import PreferencesCard from './PreferencesCard';

interface DashboardInteractiveProps {
  userData: {
    name: string;
    accountStatus: string;
    memberSince: string;
    loyaltyPoints: number;
  };
  quickActions: any[];
  recentOrders: any[];
  favoriteProducts: any[];
  recommendations: any[];
  loyaltyData: any;
  accountSettings: any[];
  communicationPreferences: any[];
}

export default function DashboardInteractive({
  userData,
  quickActions,
  recentOrders,
  favoriteProducts,
  recommendations,
  loyaltyData,
  accountSettings,
  communicationPreferences
}: DashboardInteractiveProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="space-y-6">
        <div className="bg-muted rounded-xl h-32 animate-pulse" />
        <div className="bg-muted rounded-xl h-48 animate-pulse" />
        <div className="bg-muted rounded-xl h-64 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WelcomeSection
        userName={userData.name}
        accountStatus={userData.accountStatus}
        memberSince={userData.memberSince}
        loyaltyPoints={userData.loyaltyPoints}
      />

      <QuickActionsGrid actions={quickActions} />

      <RecentOrdersSection orders={recentOrders} />

      <FavoritesSection products={favoriteProducts} />

      <RecommendationsSection recommendations={recommendations} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LoyaltyProgramCard
          currentPoints={loyaltyData.currentPoints}
          currentTier={loyaltyData.currentTier}
          nextTier={loyaltyData.nextTier}
          availableRewards={loyaltyData.availableRewards}
        />

        <AccountSettingsCard settings={accountSettings} />
      </div>

      <PreferencesCard preferences={communicationPreferences} />
    </div>
  );
}