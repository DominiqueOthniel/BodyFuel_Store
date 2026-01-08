'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutSteps from './CheckoutSteps';
import ShippingAddressForm from './ShippingAddressForm';
import DeliveryOptions from './DeliveryOptions';
import PaymentMethodSelector from './PaymentMethodSelector';
import OrderSummary from './OrderSummary';
import PromoCodeInput from './PromoCodeInput';
import OrderConfirmation from './OrderConfirmation';

interface CartItem {
  id: number;
  name: string;
  image: string;
  alt: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  addressComplement: string;
  postalCode: string;
  city: string;
  country: string;
}

const CheckoutInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
    } else {
      const mockCart: CartItem[] = [
      {
        id: 1,
        name: 'Serious Mass Gainer 5kg',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1daf7201e-1764688967289.png",
        alt: 'Large white container of Serious Mass weight gainer supplement with nutrition facts label',
        price: 59.99,
        quantity: 2,
        variant: 'Chocolat'
      },
      {
        id: 2,
        name: 'Whey Protein Isolate 2kg',
        image: "https://images.unsplash.com/photo-1693996045346-d0a9b9470909",
        alt: 'Black protein powder container with silver scoop on wooden surface',
        price: 45.99,
        quantity: 1,
        variant: 'Vanille'
      }];

      setCartItems(mockCart);
    }
  }, [isHydrated]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-12 bg-muted rounded-lg w-1/3" />
              <div className="h-64 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      </div>);

  }

  if (cartItems.length === 0) {
    router.push('/shopping-cart');
    return null;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryCosts: Record<string, number> = {
    standard: 4.99,
    express: 9.99,
    pickup: 3.49
  };

  const deliveryCost = selectedDelivery ? deliveryCosts[selectedDelivery] : 0;

  const handleShippingSubmit = (address: ShippingAddress) => {
    setShippingAddress(address);
    setCurrentStep(2);
  };

  const handleDeliverySelect = (optionId: string) => {
    setSelectedDelivery(optionId);
  };

  const handleDeliveryContinue = () => {
    setCurrentStep(3);
  };

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPayment(methodId);
  };

  const handlePaymentComplete = () => {
    const orderNum = `BFS${Date.now().toString().slice(-8)}`;
    setOrderNumber(orderNum);
    setCurrentStep(4);

    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  };

  const handlePromoApply = (code: string, discountAmount: number) => {
    setPromoCode(code);
    setDiscount(discountAmount);
  };

  const handlePromoRemove = () => {
    setPromoCode('');
    setDiscount(0);
  };

  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDays = selectedDelivery === 'express' ? 2 : selectedDelivery === 'pickup' ? 4 : 5;
    const deliveryDate = new Date(today.setDate(today.getDate() + deliveryDays));
    return deliveryDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {currentStep < 4 && <CheckoutSteps currentStep={currentStep} />}

          {currentStep === 4 ?
          <OrderConfirmation
            orderNumber={orderNumber}
            email={shippingAddress?.email || ''}
            estimatedDelivery={getEstimatedDelivery()}
            total={subtotal + deliveryCost - discount} /> :


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {currentStep === 1 &&
              <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                      Adresse de livraison
                    </h2>
                    <ShippingAddressForm
                  onSubmit={handleShippingSubmit}
                  initialData={shippingAddress || undefined} />

                  </div>
              }

                {currentStep === 2 &&
              <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                      Mode de livraison
                    </h2>
                    <DeliveryOptions
                  onSelect={handleDeliverySelect}
                  onContinue={handleDeliveryContinue}
                  selectedOption={selectedDelivery} />

                  </div>
              }

                {currentStep === 3 &&
              <>
                    <div className="bg-card border border-border rounded-lg p-6">
                      <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                        Méthode de paiement
                      </h2>
                      <PaymentMethodSelector
                    onSelect={handlePaymentSelect}
                    onComplete={handlePaymentComplete}
                    selectedMethod={selectedPayment} />

                    </div>

                    <PromoCodeInput
                  onApply={handlePromoApply}
                  currentCode={promoCode} />

                  </>
              }
              </div>

              <div className="lg:col-span-1">
                <OrderSummary
                items={cartItems}
                subtotal={subtotal}
                deliveryCost={deliveryCost}
                discount={discount}
                promoCode={promoCode}
                onRemovePromo={handlePromoRemove} />

              </div>
            </div>
          }
        </div>
      </div>
    </div>);

};

export default CheckoutInteractive;