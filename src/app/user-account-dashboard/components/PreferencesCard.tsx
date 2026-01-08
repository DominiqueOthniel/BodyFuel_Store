'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Preference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface PreferencesCardProps {
  preferences: Preference[];
}

export default function PreferencesCard({ preferences: initialPreferences }: PreferencesCardProps) {
  const [preferences, setPreferences] = useState(initialPreferences);

  const togglePreference = (id: string) => {
    setPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-elevation-2">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Préférences de communication
      </h3>
      <div className="space-y-4">
        {preferences.map((preference) => (
          <div 
            key={preference.id}
            className="flex items-start justify-between gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm mb-1">
                {preference.label}
              </p>
              <p className="text-xs text-muted-foreground caption">
                {preference.description}
              </p>
            </div>
            <button
              onClick={() => togglePreference(preference.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-smooth ${
                preference.enabled ? 'bg-primary' : 'bg-muted'
              }`}
              role="switch"
              aria-checked={preference.enabled}
              aria-label={`Toggle ${preference.label}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-smooth ${
                  preference.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-smooth">
          <Icon name="CheckIcon" size={18} />
          <span>Enregistrer les préférences</span>
        </button>
      </div>
    </div>
  );
}