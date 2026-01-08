'use client';

import Icon from '@/components/ui/AppIcon';

interface CheckoutStepsProps {
  currentStep: number;
}

const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  const steps = [
    { number: 1, label: 'Livraison', icon: 'TruckIcon' },
    { number: 2, label: 'Paiement', icon: 'CreditCardIcon' },
    { number: 3, label: 'Confirmation', icon: 'CheckCircleIcon' },
  ];

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-smooth ${
                  currentStep >= step.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step.number ? (
                  <Icon name="CheckIcon" size={24} />
                ) : (
                  <Icon name={step.icon as any} size={24} />
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium caption ${
                  currentStep >= step.number
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 transition-smooth ${
                  currentStep > step.number ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutSteps;