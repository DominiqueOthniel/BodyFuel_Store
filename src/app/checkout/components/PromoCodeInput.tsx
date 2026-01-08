'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PromoCodeInputProps {
  onApply: (code: string, discount: number) => void;
  currentCode?: string;
}

const PromoCodeInput = ({ onApply, currentCode }: PromoCodeInputProps) => {
  const [code, setCode] = useState(currentCode || '');
  const [error, setError] = useState('');
  const [isApplied, setIsApplied] = useState(!!currentCode);

  const validPromoCodes: Record<string, number> = {
    'BIENVENUE10': 10,
    'FITNESS20': 20,
    'MUSCLE15': 15,
  };

  const handleApply = () => {
    const upperCode = code.toUpperCase().trim();
    
    if (!upperCode) {
      setError('Veuillez entrer un code promo');
      return;
    }

    if (validPromoCodes[upperCode]) {
      setError('');
      setIsApplied(true);
      onApply(upperCode, validPromoCodes[upperCode]);
    } else {
      setError('Code promo invalide');
      setIsApplied(false);
    }
  };

  const handleChange = (value: string) => {
    setCode(value);
    setError('');
    setIsApplied(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="TicketIcon" size={20} className="text-primary" />
        <h4 className="font-semibold text-foreground">Code promo</h4>
      </div>

      <div className="flex space-x-2">
        <div className="flex-1">
          <input
            type="text"
            value={code}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Entrez votre code"
            className={`w-full px-4 py-2 border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary ${
              error ? 'border-error' : isApplied ? 'border-success' : 'border-border'
            }`}
            disabled={isApplied}
          />
          {error && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
              {error}
            </p>
          )}
          {isApplied && (
            <p className="mt-1 text-sm text-success flex items-center">
              <Icon name="CheckCircleIcon" size={16} className="mr-1" />
              Code appliqué avec succès
            </p>
          )}
        </div>
        <button
          onClick={handleApply}
          disabled={isApplied}
          className={`px-6 py-2 rounded-lg font-medium transition-smooth ${
            isApplied
              ? 'bg-success text-success-foreground'
              : 'bg-primary text-primary-foreground hover:opacity-90'
          }`}
        >
          {isApplied ? (
            <Icon name="CheckIcon" size={20} />
          ) : (
            'Appliquer'
          )}
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground caption">
          Codes disponibles : BIENVENUE10 (10€), FITNESS20 (20€), MUSCLE15 (15€)
        </p>
      </div>
    </div>
  );
};

export default PromoCodeInput;