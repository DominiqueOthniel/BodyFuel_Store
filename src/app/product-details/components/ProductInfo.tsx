import Icon from '@/components/ui/AppIcon';

interface ProductInfoProps {
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  sku: string;
}

const ProductInfo = ({
  name,
  brand,
  price,
  originalPrice,
  rating,
  reviewCount,
  inStock,
  stockCount,
  sku,
}: ProductInfoProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="StarIcon"
        variant={index < Math.floor(rating) ? 'solid' : 'outline'}
        size={20}
        className={index < Math.floor(rating) ? 'text-accent' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="space-y-4">
      {/* Brand */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-primary caption">{brand}</span>
        <span className="text-xs text-muted-foreground caption">SKU: {sku}</span>
      </div>

      {/* Product Name */}
      <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
        {name}
      </h1>

      {/* Rating & Reviews */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          {renderStars()}
        </div>
        <span className="text-sm font-medium text-foreground">
          {rating.toFixed(1)}
        </span>
        <span className="text-sm text-muted-foreground caption">
          ({reviewCount.toLocaleString('fr-FR')} avis)
        </span>
      </div>

      {/* Price Section */}
      <div className="flex items-baseline space-x-3 py-4 border-y border-border">
        <span className="text-4xl font-heading font-bold text-primary">
          {price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
        </span>
        {originalPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              {originalPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
            </span>
            <span className="px-2 py-1 bg-accent text-accent-foreground text-sm font-bold rounded-md">
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        {inStock ? (
          <>
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-sm font-medium text-success">
              En stock ({stockCount} disponibles)
            </span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-error rounded-full" />
            <span className="text-sm font-medium text-error">
              Rupture de stock
            </span>
          </>
        )}
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3 pt-4">
        <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
          <Icon name="ShieldCheckIcon" size={20} className="text-primary" />
          <span className="text-xs font-medium text-foreground caption">
            Certifié UE
          </span>
        </div>
        <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
          <Icon name="TruckIcon" size={20} className="text-primary" />
          <span className="text-xs font-medium text-foreground caption">
            Livraison rapide
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;