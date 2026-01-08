'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import FilterPanel from './FilterPanel';
import SortControls from './SortControls';
import ProductGrid from './ProductGrid';
import FlavorSelectionModal from './FlavorSelectionModal';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  alt: string;
  proteinContent: string;
  flavors: string[];
  badge?: string;
  inStock: boolean;
  dietary: string[];
  goals: string[];
}

interface ProductWithOptions extends Product {
  flavorOptions: Array<{name: string;available: boolean;}>;
  sizeOptions: Array<{weight: string;price: number;available: boolean;}>;
}

const ProductCatalogInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithOptions | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 200] as [number, number],
    brands: [] as string[],
    dietary: [] as string[],
    goals: [] as string[]
  });

  const [sortBy, setSortBy] = useState('relevance');

  const mockProducts: Product[] = [
  {
    id: 1,
    name: "Mass Gainer Pro 5000",
    brand: "Optimum Nutrition",
    category: "Mass Gainers",
    price: 49.99,
    originalPrice: 64.99,
    rating: 4.5,
    reviewCount: 328,
    image: "https://images.unsplash.com/photo-1704650311190-7eeb9c4f6e11",
    alt: "White protein powder container with scoop on wooden surface surrounded by fitness equipment",
    proteinContent: "50g de protéines",
    flavors: ["Chocolat", "Vanille", "Fraise"],
    badge: "Bestseller",
    inStock: true,
    dietary: ["Sans gluten"],
    goals: ["Prise de masse", "Récupération"]
  },
  {
    id: 2,
    name: "Whey Protein Isolate",
    brand: "MyProtein",
    category: "Protéines",
    price: 39.99,
    rating: 4.7,
    reviewCount: 542,
    image: "https://images.unsplash.com/photo-1693996045346-d0a9b9470909",
    alt: "Black protein powder tub with measuring scoop next to shaker bottle on gym floor",
    proteinContent: "25g de protéines",
    flavors: ["Chocolat", "Vanille", "Banane", "Fraise"],
    inStock: true,
    dietary: ["Sans lactose", "Vegan"],
    goals: ["Prise de masse", "Définition musculaire"]
  },
  {
    id: 3,
    name: "Serious Mass Gainer",
    brand: "BSN",
    category: "Mass Gainers",
    price: 54.99,
    originalPrice: 69.99,
    rating: 4.3,
    reviewCount: 215,
    image: "https://images.unsplash.com/photo-1678875524413-20dcbded9c3f",
    alt: "Red and white protein supplement container with nutrition facts label visible on kitchen counter",
    proteinContent: "60g de protéines",
    flavors: ["Chocolat", "Vanille"],
    badge: "Nouveau",
    inStock: true,
    dietary: [],
    goals: ["Prise de masse"]
  },
  {
    id: 4,
    name: "Casein Protein Night",
    brand: "Dymatize",
    category: "Protéines",
    price: 44.99,
    rating: 4.6,
    reviewCount: 189,
    image: "https://images.unsplash.com/photo-1709976142410-9aae3b10e8bc",
    alt: "Blue protein powder container with silver scoop on dark wooden table with dumbbells",
    proteinContent: "30g de protéines",
    flavors: ["Chocolat", "Vanille", "Cookies"],
    inStock: true,
    dietary: ["Sans gluten"],
    goals: ["Récupération", "Définition musculaire"]
  },
  {
    id: 5,
    name: "BCAA Energy Boost",
    brand: "Scitec Nutrition",
    category: "Suppléments",
    price: 29.99,
    rating: 4.4,
    reviewCount: 276,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17bd81526-1764801001232.png",
    alt: "Green supplement powder container with transparent lid showing powder texture on gym bench",
    proteinContent: "5g de BCAA",
    flavors: ["Citron", "Orange", "Fruit punch"],
    inStock: true,
    dietary: ["Vegan", "Sans gluten"],
    goals: ["Récupération", "Endurance"]
  },
  {
    id: 6,
    name: "Pre-Workout Extreme",
    brand: "Cellucor",
    category: "Suppléments",
    price: 34.99,
    rating: 4.8,
    reviewCount: 412,
    image: "https://images.unsplash.com/photo-1701859077647-ab9540ea3816",
    alt: "Orange pre-workout supplement tub with black lid next to water bottle on gym equipment",
    proteinContent: "200mg de caféine",
    flavors: ["Fruit punch", "Citron vert"],
    badge: "Top rated",
    inStock: true,
    dietary: [],
    goals: ["Endurance", "Performance"]
  },
  {
    id: 7,
    name: "Lean Mass Gainer",
    brand: "MuscleTech",
    category: "Mass Gainers",
    price: 52.99,
    rating: 4.2,
    reviewCount: 167,
    image: "https://images.unsplash.com/photo-1679389456075-79494e7808ff",
    alt: "Silver metallic protein container with red label on white background with fitness accessories",
    proteinContent: "40g de protéines",
    flavors: ["Chocolat", "Vanille", "Fraise"],
    inStock: false,
    dietary: ["Sans gluten"],
    goals: ["Prise de masse", "Définition musculaire"]
  },
  {
    id: 8,
    name: "Vegan Protein Blend",
    brand: "Garden of Life",
    category: "Protéines",
    price: 42.99,
    rating: 4.5,
    reviewCount: 298,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1345a02fb-1765862496573.png",
    alt: "White and green vegan protein powder container with plant-based ingredients illustration on label",
    proteinContent: "20g de protéines",
    flavors: ["Chocolat", "Vanille", "Baies"],
    badge: "Vegan",
    inStock: true,
    dietary: ["Vegan", "Sans gluten", "Sans lactose"],
    goals: ["Prise de masse", "Récupération"]
  },
  {
    id: 9,
    name: "Creatine Monohydrate",
    brand: "Universal Nutrition",
    category: "Suppléments",
    price: 24.99,
    rating: 4.7,
    reviewCount: 534,
    image: "https://images.unsplash.com/photo-1678875525623-fb77fbad1279",
    alt: "Black creatine supplement container with yellow label on gym floor next to weight plates",
    proteinContent: "5g de créatine",
    flavors: ["Sans saveur"],
    inStock: true,
    dietary: ["Vegan"],
    goals: ["Performance", "Prise de masse"]
  },
  {
    id: 10,
    name: "Hydrolyzed Whey",
    brand: "Optimum Nutrition",
    category: "Protéines",
    price: 59.99,
    originalPrice: 74.99,
    rating: 4.6,
    reviewCount: 223,
    image: "https://images.unsplash.com/photo-1727433613965-923f6c9d400b",
    alt: "Premium gold and black protein powder container with embossed logo on marble countertop",
    proteinContent: "30g de protéines",
    flavors: ["Chocolat", "Vanille"],
    badge: "Premium",
    inStock: true,
    dietary: ["Sans lactose"],
    goals: ["Récupération", "Définition musculaire"]
  },
  {
    id: 11,
    name: "Glutamine Recovery",
    brand: "BSN",
    category: "Suppléments",
    price: 27.99,
    rating: 4.3,
    reviewCount: 145,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_18775f950-1765759509324.png",
    alt: "White glutamine supplement powder container with blue accents on wooden gym bench",
    proteinContent: "5g de glutamine",
    flavors: ["Sans saveur", "Citron"],
    inStock: true,
    dietary: ["Vegan", "Sans gluten"],
    goals: ["Récupération"]
  },
  {
    id: 12,
    name: "Weight Gainer 3000",
    brand: "Weider",
    category: "Mass Gainers",
    price: 46.99,
    rating: 4.4,
    reviewCount: 187,
    image: "https://images.unsplash.com/photo-1587374835402-bdfdeb2aa0c1",
    alt: "Large blue weight gainer container with nutrition information panel on gym equipment rack",
    proteinContent: "45g de protéines",
    flavors: ["Chocolat", "Vanille", "Banane"],
    inStock: true,
    dietary: [],
    goals: ["Prise de masse"]
  }];


  const filterOptions = {
    categories: ["Mass Gainers", "Protéines", "Suppléments"],
    brands: ["Optimum Nutrition", "MyProtein", "BSN", "Dymatize", "Scitec Nutrition", "Cellucor", "MuscleTech", "Garden of Life", "Universal Nutrition", "Weider"],
    dietary: ["Vegan", "Sans gluten", "Sans lactose"],
    goals: ["Prise de masse", "Récupération", "Définition musculaire", "Endurance", "Performance"]
  };

  useEffect(() => {
    setIsHydrated(true);

    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        setCartItemCount(cart.length);
      }
    }
  }, []);

  const getFilteredProducts = () => {
    let filtered = [...mockProducts];

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    filtered = filtered.filter((p) =>
    p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand));
    }

    if (filters.dietary.length > 0) {
      filtered = filtered.filter((p) =>
      filters.dietary.some((d) => p.dietary.includes(d))
      );
    }

    if (filters.goals.length > 0) {
      filtered = filtered.filter((p) =>
      filters.goals.some((g) => p.goals.includes(g))
      );
    }

    return filtered;
  };

  const getSortedProducts = (products: Product[]) => {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => b.id - a.id);
      default:
        return sorted;
    }
  };

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 200],
      brands: [],
      dietary: [],
      goals: []
    });
  };

  const handleAddToCart = (productId: number) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return;

    const productWithOptions: ProductWithOptions = {
      ...product,
      flavorOptions: product.flavors.map((f) => ({ name: f, available: true })),
      sizeOptions: [
      { weight: "1kg", price: product.price, available: true },
      { weight: "2kg", price: product.price * 1.8, available: true },
      { weight: "5kg", price: product.price * 4.2, available: true }]

    };

    setSelectedProduct(productWithOptions);
    setIsModalOpen(true);
  };

  const handleConfirmAddToCart = (productId: number, flavor: string, size: string, quantity: number) => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      const cart = savedCart ? JSON.parse(savedCart) : [];

      const product = mockProducts.find((p) => p.id === productId);
      if (product) {
        const sizePrice = size === "1kg" ? product.price : size === "2kg" ? product.price * 1.8 : product.price * 4.2;

        cart.push({
          id: Date.now(),
          productId,
          name: product.name,
          brand: product.brand,
          flavor,
          size,
          quantity,
          price: sizePrice,
          image: product.image,
          alt: product.alt
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        setCartItemCount(cart.length);
      }
    }
  };

  const handleProductClick = (productId: number) => {
    router.push('/product-details');
  };

  const filteredProducts = getFilteredProducts();
  const sortedProducts = getSortedProducts(filteredProducts);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-16 bg-card shadow-elevation-2" />
        <div className="animate-pulse pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="h-8 bg-muted rounded w-64 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="h-96 bg-muted rounded-lg" />
            <div className="lg:col-span-3 space-y-6">
              <div className="h-16 bg-muted rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) =>
                <div key={i} className="h-96 bg-muted rounded-lg" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
        <Breadcrumb />

        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
            Catalogue de Produits
          </h1>
          <p className="text-muted-foreground">
            Découvrez notre gamme complète de suppléments pour la musculation et la nutrition sportive
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-smooth">

            <Icon name="FunnelIcon" size={20} />
            <span>Filtres</span>
            {(filters.category || filters.brands.length > 0 || filters.dietary.length > 0 || filters.goals.length > 0) &&
            <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                {(filters.category ? 1 : 0) + filters.brands.length + filters.dietary.length + filters.goals.length}
              </span>
            }
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Filter Panel */}
          <aside className="hidden lg:block">
            <FilterPanel
              filters={filterOptions}
              activeFilters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters} />

          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <SortControls
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalProducts={sortedProducts.length} />


            <ProductGrid
              products={sortedProducts}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick} />

          </div>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen &&
      <>
          <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-modal lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)} />

          <div className="fixed inset-y-0 left-0 w-full sm:w-96 bg-card z-modal lg:hidden overflow-hidden">
            <FilterPanel
            filters={filterOptions}
            activeFilters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isMobile={true}
            onClose={() => setIsMobileFilterOpen(false)} />

          </div>
        </>
      }

      {/* Flavor Selection Modal */}
      <FlavorSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct ? {
          id: selectedProduct.id,
          name: selectedProduct.name,
          brand: selectedProduct.brand,
          price: selectedProduct.price,
          image: selectedProduct.image,
          alt: selectedProduct.alt,
          flavors: selectedProduct.flavorOptions || [],
          sizes: selectedProduct.sizeOptions || []
        } : null}
        onConfirm={handleConfirmAddToCart} />

    </div>);

};

export default ProductCatalogInteractive;