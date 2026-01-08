import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href: string;
  description: string;
  color: string;
}

interface QuickActionsGridProps {
  actions: QuickAction[];
}

export default function QuickActionsGrid({ actions }: QuickActionsGridProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-elevation-2">
      <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
        Actions rapides
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="group flex flex-col items-center text-center p-4 rounded-lg border border-border hover:border-primary hover:bg-muted transition-smooth"
          >
            <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-spring`}>
              <Icon name={action.icon as any} size={24} className="text-white" />
            </div>
            <span className="font-medium text-sm text-foreground mb-1">
              {action.label}
            </span>
            <span className="text-xs text-muted-foreground caption">
              {action.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}