import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
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

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="StarIcon"
        variant={index < Math.floor(rating) ? 'solid' : 'outline'}
        size={14}
        className={index < Math.floor(rating) ? 'text-accent' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Produits similaires
        </h2>
        <Link
          href="/product-catalog"
          className="text-sm font-medium text-primary hover:text-primary/80 transition-smooth flex items-center space-x-1"
        >
          <span>Voir tout</span>
          <Icon name="ArrowRightIcon" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const discount = product.originalPrice
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;

          return (
            <Link
              key={product.id}
              href="/product-details"
              className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-3 transition-smooth"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-muted overflow-hidden">
                <AppImage
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                {discount > 0 && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-md">
                    -{discount}%
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-2">
                <span className="text-xs font-medium text-primary caption">
                  {product.brand}
                </span>
                <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-0.5">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-muted-foreground caption">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-2 pt-2">
                  <span className="text-lg font-heading font-bold text-primary">
                    {product.price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;