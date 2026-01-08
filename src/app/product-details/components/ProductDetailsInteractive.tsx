'use client';

import { useState, useEffect } from 'react';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import ProductPurchaseSection from './ProductPurchaseSection';
import ProductTabs from './ProductTabs';
import RelatedProducts from './RelatedProducts';

interface ProductData {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  sku: string;
  images: Array<{ url: string; alt: string }>;
  flavors: Array<{ id: string; name: string; available: boolean }>;
  sizes: Array<{ id: string; name: string; available: boolean }>;
  description: string;
  nutritionalInfo: {
    servingSize: string;
    servingsPerContainer: number;
    calories: number;
    protein: string;
    carbohydrates: string;
    fats: string;
    ingredients: string;
  };
  usage: string;
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
  }>;
}

interface RelatedProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  imageAlt: string;
}

interface ProductDetailsInteractiveProps {
  productData: ProductData;
  relatedProducts: RelatedProduct[];
}

const ProductDetailsInteractive = ({
  productData,
  relatedProducts,
}: ProductDetailsInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
    const savedCart = localStorage.getItem('cartCount');
    if (savedCart) {
      setCartCount(parseInt(savedCart, 10));
    }
  }, []);

  const handleAddToCart = (flavor: string, size: string, quantity: number) => {
    if (!isHydrated) return;

    const newCount = cartCount + quantity;
    setCartCount(newCount);
    localStorage.setItem('cartCount', newCount.toString());

    console.log('Added to cart:', { flavor, size, quantity });
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-16" />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-lg" />
              <div className="space-y-4">
                <div className="h-12 bg-muted rounded w-3/4" />
                <div className="h-8 bg-muted rounded w-1/2" />
                <div className="h-64 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Image Gallery */}
        <div>
          <ProductImageGallery
            images={productData.images}
            productName={productData.name}
          />
        </div>

        {/* Right Column - Product Info & Purchase */}
        <div className="space-y-6">
          <ProductInfo
            name={productData.name}
            brand={productData.brand}
            price={productData.price}
            originalPrice={productData.originalPrice}
            rating={productData.rating}
            reviewCount={productData.reviewCount}
            inStock={productData.inStock}
            stockCount={productData.stockCount}
            sku={productData.sku}
          />

          <ProductPurchaseSection
            flavors={productData.flavors}
            sizes={productData.sizes}
            inStock={productData.inStock}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      {/* Product Tabs Section */}
      <ProductTabs
        description={productData.description}
        nutritionalInfo={productData.nutritionalInfo}
        usage={productData.usage}
        reviews={productData.reviews}
        averageRating={productData.rating}
      />

      {/* Related Products Section */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetailsInteractive;