import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import OrderHistoryInteractive from './components/OrderHistoryInteractive';

export const metadata: Metadata = {
  title: 'Historique des commandes - BodyFuel Store',
  description: 'Consultez l\'historique complet de vos commandes de suppléments et produits de nutrition sportive avec suivi de livraison et gestion des retours.',
};

export default function OrderHistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={3} />

      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Historique des commandes
            </h1>
            <p className="text-muted-foreground caption max-w-3xl">
              Consultez et gérez toutes vos commandes passées. Suivez vos livraisons, téléchargez vos factures et commandez à nouveau vos produits préférés en un clic.
            </p>
          </div>

          <OrderHistoryInteractive />
        </div>
      </main>

      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground caption">
            <p>&copy; {new Date().getFullYear()} BodyFuel Store. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}