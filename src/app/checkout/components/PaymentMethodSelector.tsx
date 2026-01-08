'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  logos?: string[];
}

interface PaymentMethodSelectorProps {
  onSelect: (methodId: string) => void;
  onComplete: () => void;
  selectedMethod?: string;
}

const PaymentMethodSelector = ({ onSelect, onComplete, selectedMethod }: PaymentMethodSelectorProps) => {
  const [selected, setSelected] = useState<string>(selectedMethod || '');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Carte Bancaire',
      description: 'Visa, Mastercard, American Express',
      icon: 'CreditCardIcon',
      logos: ['💳'],
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Paiement sécurisé via PayPal',
      icon: 'CreditCardIcon',
      logos: ['🅿️'],
    },
    {
      id: 'sepa',
      name: 'Virement SEPA',
      description: 'Prélèvement bancaire européen',
      icon: 'BanknotesIcon',
    },
  ];

  const handleSelect = (methodId: string) => {
    setSelected(methodId);
    onSelect(methodId);
    setErrors({});
  };

  const validateCardDetails = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!cardDetails.number.trim()) {
      newErrors.number = 'Le numéro de carte est requis';
    } else if (!/^[0-9]{16}$/.test(cardDetails.number.replace(/\s/g, ''))) {
      newErrors.number = 'Numéro de carte invalide (16 chiffres)';
    }

    if (!cardDetails.name.trim()) {
      newErrors.name = 'Le nom du titulaire est requis';
    }

    if (!cardDetails.expiry.trim()) {
      newErrors.expiry = 'La date d\'expiration est requise';
    } else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = 'Format invalide (MM/AA)';
    }

    if (!cardDetails.cvv.trim()) {
      newErrors.cvv = 'Le CVV est requis';
    } else if (!/^[0-9]{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'CVV invalide (3-4 chiffres)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleComplete = () => {
    if (!selected) return;

    if (selected === 'card') {
      if (validateCardDetails()) {
        onComplete();
      }
    } else {
      onComplete();
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleSelect(method.id)}
            className={`w-full p-4 border-2 rounded-lg transition-smooth text-left ${
              selected === method.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    selected === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon name={method.icon as any} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-foreground">{method.name}</h4>
                    {method.logos && (
                      <div className="flex items-center space-x-1">
                        {method.logos.map((logo, idx) => (
                          <span key={idx} className="text-lg">{logo}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 caption">{method.description}</p>
                </div>
              </div>
              <div
                className={`ml-3 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-smooth ${
                  selected === method.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}
              >
                {selected === method.id && (
                  <Icon name="CheckIcon" size={16} className="text-primary-foreground" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selected === 'card' && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h4 className="font-semibold text-foreground flex items-center space-x-2">
            <Icon name="LockClosedIcon" size={20} className="text-primary" />
            <span>Informations de carte bancaire</span>
          </h4>

          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground mb-1">
              Numéro de carte <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: formatCardNumber(e.target.value) })}
              className={`w-full px-4 py-2 border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary data-text ${
                errors.number ? 'border-error' : 'border-border'
              }`}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {errors.number && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
                {errors.number}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-foreground mb-1">
              Nom du titulaire <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="cardName"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
              className={`w-full px-4 py-2 border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.name ? 'border-error' : 'border-border'
              }`}
              placeholder="JEAN DUPONT"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-error flex items-center">
                <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cardExpiry" className="block text-sm font-medium text-foreground mb-1">
                Date d'expiration <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="cardExpiry"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: formatExpiry(e.target.value) })}
                className={`w-full px-4 py-2 border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary data-text ${
                  errors.expiry ? 'border-error' : 'border-border'
                }`}
                placeholder="MM/AA"
                maxLength={5}
              />
              {errors.expiry && (
                <p className="mt-1 text-sm text-error flex items-center">
                  <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
                  {errors.expiry}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cardCvv" className="block text-sm font-medium text-foreground mb-1">
                CVV <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="cardCvv"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                className={`w-full px-4 py-2 border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary data-text ${
                  errors.cvv ? 'border-error' : 'border-border'
                }`}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-error flex items-center">
                  <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {selected === 'paypal' && (
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="InformationCircleIcon" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground caption">
              Vous serez redirigé vers PayPal pour finaliser votre paiement de manière sécurisée.
            </p>
          </div>
        </div>
      )}

      {selected === 'sepa' && (
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="InformationCircleIcon" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground caption">
              Votre commande sera traitée après validation du prélèvement SEPA. Délai de traitement : 2-3 jours ouvrés.
            </p>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 text-success">
          <Icon name="ShieldCheckIcon" size={24} />
          <div>
            <p className="font-medium">Paiement 100% sécurisé</p>
            <p className="text-sm text-muted-foreground caption">Vos données sont protégées par cryptage SSL</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleComplete}
        disabled={!selected}
        className={`w-full px-6 py-3 rounded-lg font-medium transition-smooth flex items-center justify-center space-x-2 ${
          selected
            ? 'bg-primary text-primary-foreground hover:opacity-90'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        <Icon name="LockClosedIcon" size={20} />
        <span>Finaliser la commande</span>
      </button>

      <p className="text-xs text-center text-muted-foreground caption">
        En finalisant votre commande, vous acceptez nos conditions générales de vente et notre politique de confidentialité conformément au RGPD.
      </p>
    </div>
  );
};

export default PaymentMethodSelector;