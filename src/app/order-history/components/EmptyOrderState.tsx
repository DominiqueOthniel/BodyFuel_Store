import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

const EmptyOrderState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="ShoppingBagIcon" size={48} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Aucune commande trouvée
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-6 caption">
        Vous n'avez pas encore passé de commande ou aucune commande ne correspond à vos critères de recherche.
      </p>
      <Link
        href="/product-catalog"
        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-smooth"
      >
        <Icon name="ShoppingBagIcon" size={20} />
        <span>Découvrir nos produits</span>
      </Link>
    </div>
  );
};

export default EmptyOrderState;