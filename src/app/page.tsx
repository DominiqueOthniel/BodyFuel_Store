import type { Metadata } from 'next';
import HomeInteractive from './components/HomeInteractive';

export const metadata: Metadata = {
  title: 'BodyFuel Store - Nutrition Sportive & Suppléments',
  description: 'Découvrez notre gamme complète de suppléments pour la musculation, mass gainers, protéines et nutrition sportive. Transformez votre corps avec BodyFuel Store.',
};

export default function HomePage() {
  return <HomeInteractive />;
}

