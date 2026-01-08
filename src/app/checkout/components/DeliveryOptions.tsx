'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: string;
}

interface DeliveryOptionsProps {
  onSelect: (optionId: string) => void;
  onContinue: () => void;
  selectedOption?: string;
}

const DeliveryOptions = ({ onSelect, onContinue, selectedOption }: DeliveryOptionsProps) => {
  const [selected, setSelected] = useState<string>(selectedOption || '');

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'standard',
      name: 'Livraison Standard',
      description: 'Livraison à domicile par Colissimo',
      price: 4.99,
      estimatedDays: '3-5 jours ouvrés',
      icon: 'TruckIcon',
    },
    {
      id: 'express',
      name: 'Livraison Express',
      description: 'Livraison rapide par Chronopost',
      price: 9.99,
      estimatedDays: '1-2 jours ouvrés',
      icon: 'BoltIcon',
    },
    {
      id: 'pickup',
      name: 'Point Relais',
      description: 'Retrait en point relais Mondial Relay',
      price: 3.49,
      estimatedDays: '3-4 jours ouvrés',
      icon: 'MapPinIcon',
    },
  ];

  const handleSelect = (optionId: string) => {
    setSelected(optionId);
    onSelect(optionId);
  };

  const handleContinue = () => {
    if (selected) {
      onContinue();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {deliveryOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`w-full p-4 border-2 rounded-lg transition-smooth text-left ${
              selected === option.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    selected === option.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon name={option.icon as any} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">{option.name}</h4>
                    <span className="font-bold text-foreground data-text">{option.price.toFixed(2)} €</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                  <div className="flex items-center space-x-1 mt-2 text-sm text-muted-foreground">
                    <Icon name="ClockIcon" size={16} />
                    <span className="caption">{option.estimatedDays}</span>
                  </div>
                </div>
              </div>
              <div
                className={`ml-3 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-smooth ${
                  selected === option.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}
              >
                {selected === option.id && (
                  <Icon name="CheckIcon" size={16} className="text-primary-foreground" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="InformationCircleIcon" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground caption">
            Les délais de livraison sont donnés à titre indicatif et peuvent varier selon votre localisation et les conditions de transport.
          </p>
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!selected}
        className={`w-full px-6 py-3 rounded-lg font-medium transition-smooth flex items-center justify-center space-x-2 ${
          selected
            ? 'bg-primary text-primary-foreground hover:opacity-90'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        <span>Continuer vers le paiement</span>
        <Icon name="ArrowRightIcon" size={20} />
      </button>
    </div>
  );
};

export default DeliveryOptions;