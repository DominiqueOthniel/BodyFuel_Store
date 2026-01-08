import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import CheckoutInteractive from './components/CheckoutInteractive';

export const metadata: Metadata = {
  title: 'Paiement - BodyFuel Store',
  description: 'Finalisez votre commande de suppléments de musculation avec notre processus de paiement sécurisé. Livraison rapide en France et en Europe.',
};

export default function CheckoutPage() {
  return (
    <>
      <Header cartItemCount={0} />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <Breadcrumb />
        </div>
        <CheckoutInteractive />
      </main>
    </>
  );
}