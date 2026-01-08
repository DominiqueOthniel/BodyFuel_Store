import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import ShoppingCartInteractive from './components/ShoppingCartInteractive';

export const metadata: Metadata = {
  title: 'Panier - BodyFuel Store',
  description: 'Consultez et gérez les suppléments de musculation dans votre panier avant de procéder au paiement sécurisé.',
};

export default function ShoppingCartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={3} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
          <ShoppingCartInteractive />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                  >
                    <path
                      d="M20 8L12 14V26L20 32L28 26V14L20 8Z"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-foreground"
                    />
                    <path
                      d="M20 20L12 14M20 20L28 14M20 20V32"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-foreground"
                    />
                  </svg>
                </div>
                <span className="text-xl font-heading font-semibold text-foreground">
                  BodyFuel Store
                </span>
              </div>
              <p className="text-sm text-muted-foreground caption">
                Votre partenaire de confiance pour les suppléments de musculation et nutrition sportive.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Liens Rapides</h3>
              <ul className="space-y-2 text-sm caption">
                <li>
                  <a href="/product-catalog" className="text-muted-foreground hover:text-primary transition-smooth">
                    Produits
                  </a>
                </li>
                <li>
                  <a href="/user-account-dashboard" className="text-muted-foreground hover:text-primary transition-smooth">
                    Mon Compte
                  </a>
                </li>
                <li>
                  <a href="/order-history" className="text-muted-foreground hover:text-primary transition-smooth">
                    Mes Commandes
                  </a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Service Client</h3>
              <ul className="space-y-2 text-sm caption">
                <li className="text-muted-foreground">Livraison &amp; Retours</li>
                <li className="text-muted-foreground">FAQ</li>
                <li className="text-muted-foreground">Contactez-nous</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Légal</h3>
              <ul className="space-y-2 text-sm caption">
                <li className="text-muted-foreground">Conditions Générales</li>
                <li className="text-muted-foreground">Politique de Confidentialité</li>
                <li className="text-muted-foreground">Mentions Légales</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground caption">
              © {new Date().getFullYear()} BodyFuel Store. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}