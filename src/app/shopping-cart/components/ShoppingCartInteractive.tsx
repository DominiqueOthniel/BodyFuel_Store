'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import EmptyCart from './EmptyCart';
import RecommendedProducts from './RecommendedProducts';

interface CartItemType {
  id: string;
  name: string;
  image: string;
  alt: string;
  variant: string;
  price: number;
  quantity: number;
  stock: number;
}

interface RecommendedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  alt: string;
  category: string;
}

const ShoppingCartInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setIsHydrated(true);

    // Mock cart data
    const mockCartItems: CartItemType[] = [
    {
      id: '1',
      name: 'Serious Mass Gainer Optimum Nutrition',
      image: "https://images.unsplash.com/photo-1693996045346-d0a9b9470909",
      alt: 'White protein powder container with black lid and nutrition label on white background',
      variant: 'Chocolat - 5.4kg',
      price: 64.99,
      quantity: 2,
      stock: 15
    },
    {
      id: '2',
      name: 'Whey Protein Gold Standard 100%',
      image: "https://images.unsplash.com/photo-1679389456075-79494e7808ff",
      alt: 'Black and gold protein powder tub with scoop on dark surface',
      variant: 'Vanille - 2.27kg',
      price: 54.99,
      quantity: 1,
      stock: 8
    },
    {
      id: '3',
      name: 'Créatine Monohydrate Micronisée',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_165b3ed89-1766823402111.png",
      alt: 'Clear glass jar filled with white creatine powder on wooden table',
      variant: 'Nature - 500g',
      price: 24.99,
      quantity: 1,
      stock: 20
    }];


    setCartItems(mockCartItems);
  }, []);

  const recommendedProducts: RecommendedProduct[] = [
  {
    id: 'r1',
    name: 'BCAA Energy Amino Acids',
    price: 29.99,
    image: "https://images.unsplash.com/photo-1632470233586-19af5d7d1a08",
    alt: 'Blue and white BCAA supplement bottle with measuring scoop on gym floor',
    category: 'Acides Aminés'
  },
  {
    id: 'r2',
    name: 'Pre-Workout Explosive Energy',
    price: 39.99,
    image: "https://images.unsplash.com/photo-1563963277088-516272c93b8b",
    alt: 'Red pre-workout supplement container with lightning bolt design',
    category: 'Pré-Entraînement'
  },
  {
    id: 'r3',
    name: 'Glutamine Pure Powder',
    price: 27.99,
    image: "https://images.unsplash.com/photo-1464175168058-76accb30f22b",
    alt: 'White ceramic bowl filled with fine glutamine powder on marble surface',
    category: 'Récupération'
  },
  {
    id: 'r4',
    name: 'Multivitamines Performance',
    price: 19.99,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
    alt: 'Orange vitamin bottle with colorful capsules spilled on white background',
    category: 'Vitamines'
  }];


  const handleQuantityChange = (id: string, newQuantity: number) => {
    setCartItems((prevItems) =>
    prevItems.map((item) =>
    item.id === id ? { ...item, quantity: newQuantity } : item
    )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSaveForLater = (id: string) => {
    // Mock save for later functionality
    console.log('Saved for later:', id);
    handleRemoveItem(id);
  };

  const handleApplyPromoCode = (code: string) => {
    const discountMap: Record<string, number> = {
      'BIENVENUE10': 0.10,
      'FITNESS20': 0.20,
      'MUSCLE15': 0.15
    };

    const discountPercent = discountMap[code.toUpperCase()] || 0;
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setDiscount(subtotal * discountPercent);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>);

  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 5.99;
  const total = subtotal + shipping - discount;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <EmptyCart recommendedProducts={recommendedProducts.slice(0, 3)} />
      </div>);

  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-1">
          {/* Cart Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
                Votre Panier
              </h1>
              <p className="text-muted-foreground caption">
                {cartItems.length} article{cartItems.length > 1 ? 's' : ''} dans votre panier
              </p>
            </div>
            <Link
              href="/product-catalog"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth caption font-medium">

              <Icon name="ArrowLeftIcon" size={16} />
              <span className="hidden sm:inline">Continuer mes achats</span>
            </Link>
          </div>

          {/* Free Shipping Banner */}
          {subtotal < 100 &&
          <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg flex items-start gap-3">
              <Icon name="TruckIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground caption">
                  Plus que {(100 - subtotal).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € pour la livraison gratuite!
                </p>
                <p className="text-xs text-muted-foreground mt-1 caption">
                  Ajoutez des produits pour bénéficier de la livraison gratuite
                </p>
              </div>
            </div>
          }

          {/* Cart Items List */}
          <div className="space-y-4">
            {cartItems.map((item) =>
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
              onSaveForLater={handleSaveForLater} />

            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-96">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
            total={total}
            onApplyPromoCode={handleApplyPromoCode}
            onCheckout={handleCheckout} />

        </div>
      </div>

      {/* Recommended Products */}
      <RecommendedProducts products={recommendedProducts} />
    </div>);

};

export default ShoppingCartInteractive;