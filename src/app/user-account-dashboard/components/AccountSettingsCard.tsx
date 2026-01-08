'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface SettingItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  href: string;
}

interface AccountSettingsCardProps {
  settings: SettingItem[];
}

export default function AccountSettingsCard({ settings }: AccountSettingsCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-elevation-2">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Paramètres du compte
      </h3>
      <div className="space-y-2">
        {settings.map((setting) => (
          <Link
            key={setting.id}
            href={setting.href}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-smooth group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                <Icon name={setting.icon as any} size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {setting.label}
                </p>
                <p className="text-xs text-muted-foreground caption">
                  {setting.description}
                </p>
              </div>
            </div>
            <Icon name="ChevronRightIcon" size={20} className="text-muted-foreground group-hover:text-foreground transition-smooth" />
          </Link>
        ))}
      </div>
    </div>
  );
}
