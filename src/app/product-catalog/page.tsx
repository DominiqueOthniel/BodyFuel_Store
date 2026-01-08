import type { Metadata } from 'next';
import ProductCatalogInteractive from './components/ProductCatalogInteractive';

export const metadata: Metadata = {
  title: 'Catalogue de Produits - BodyFuel Store',
  description: 'Découvrez notre gamme complète de suppléments pour la musculation, mass gainers, protéines et nutrition sportive avec filtres avancés et options de tri.',
};

export default function ProductCatalogPage() {
  return <ProductCatalogInteractive />;
}