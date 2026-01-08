import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductDetailsInteractive from './components/ProductDetailsInteractive';

export const metadata: Metadata = {
  title: 'Détails du produit - BodyFuel Store',
  description: 'Découvrez les informations détaillées sur nos suppléments de musculation, incluant les valeurs nutritionnelles, les ingrédients, les avis clients et les instructions d\'utilisation.'
};

export default function ProductDetailsPage() {
  const productData = {
    id: 'prod-001',
    name: 'Mass Gainer Pro 5000 - Formule Avancée',
    brand: 'BodyFuel Nutrition',
    price: 54.99,
    originalPrice: 69.99,
    rating: 4.7,
    reviewCount: 342,
    inStock: true,
    stockCount: 47,
    sku: 'BFN-MG5000-CHO-3KG',
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1daf7201e-1764688967289.png",
      alt: 'Pot de Mass Gainer Pro 5000 saveur chocolat de 3kg avec étiquette nutritionnelle visible sur fond blanc'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1cddf443f-1767780912440.png",
      alt: 'Vue arrière du pot Mass Gainer Pro 5000 montrant le tableau des valeurs nutritionnelles détaillé'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1c5d82a92-1767780914750.png",
      alt: 'Shaker transparent rempli de Mass Gainer Pro 5000 mélangé avec du lait sur table en bois'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1e4c65845-1767780835576.png",
      alt: 'Mesure de poudre Mass Gainer Pro 5000 chocolat avec texture fine visible en gros plan'
    }],

    flavors: [
    { id: 'chocolate', name: 'Chocolat', available: true },
    { id: 'vanilla', name: 'Vanille', available: true },
    { id: 'strawberry', name: 'Fraise', available: true },
    { id: 'banana', name: 'Banane', available: false }],

    sizes: [
    { id: '1kg', name: '1 kg', available: true },
    { id: '3kg', name: '3 kg', available: true },
    { id: '5kg', name: '5 kg', available: true }],

    description: `Mass Gainer Pro 5000 est une formule avancée spécialement conçue pour les athlètes et les pratiquants de musculation cherchant à augmenter leur masse musculaire de manière efficace et saine.\n\nNotre formule unique combine des protéines de haute qualité, des glucides complexes et des acides aminés essentiels pour soutenir la croissance musculaire et la récupération après l'entraînement. Chaque portion fournit un apport calorique optimal pour favoriser la prise de masse tout en maintenant un profil nutritionnel équilibré.\n\nFabriqué en France selon les normes européennes les plus strictes, Mass Gainer Pro 5000 est certifié sans substances interdites et convient aux athlètes de tous niveaux. La texture onctueuse et le goût délicieux facilitent la consommation quotidienne.\n\nIdéal pour les personnes ayant un métabolisme rapide ou des difficultés à prendre du poids, ce produit s'intègre parfaitement dans un programme de nutrition sportive complet.`,
    nutritionalInfo: {
      servingSize: '150 g',
      servingsPerContainer: 20,
      calories: 550,
      protein: '30 g',
      carbohydrates: '85 g',
      fats: '8 g',
      ingredients: 'Maltodextrine, concentré de protéines de lactosérum (lait), isolat de protéines de lactosérum (lait), fructose, cacao en poudre (pour saveur chocolat), arômes naturels, épaississant (gomme de xanthane), édulcorant (sucralose), vitamines (B6, B12, C, D), minéraux (zinc, magnésium, fer), L-glutamine, créatine monohydrate, BCAA (leucine, isoleucine, valine).'
    },
    usage: `Mélanger 150 g (environ 3 mesures) de poudre avec 400-500 ml d'eau ou de lait dans un shaker.\n\nAgiter vigoureusement pendant 20-30 secondes jusqu'à obtenir une consistance homogène.\n\nConsommer 1 à 2 portions par jour :\n• Une portion 30 minutes après l'entraînement\n• Une portion entre les repas ou avant le coucher\n\nPour de meilleurs résultats, combiner avec un programme d'entraînement régulier et une alimentation équilibrée riche en protéines.\n\nConserver dans un endroit frais et sec, à l'abri de la lumière directe du soleil. Refermer soigneusement après chaque utilisation.`,
    reviews: [
    {
      id: 'rev-001', author: 'Thomas Dubois', rating: 5, date: '15/12/2025', comment: 'Excellent produit ! J\'ai pris 4 kg en 6 semaines avec un entraînement régulier. Le goût chocolat est délicieux et se mélange très bien. Livraison rapide et emballage soigné. Je recommande vivement pour la prise de masse.',
      verified: true
    },
    {
      id: 'rev-002',
      author: 'Marie Laurent',
      rating: 4,
      date: '08/12/2025',
      comment: 'Très bon mass gainer, efficace pour la prise de poids. Le seul petit bémol est qu\'il peut être un peu épais si on ne met pas assez de liquide. Sinon, excellent rapport qualité-prix et résultats visibles après 3 semaines.',
      verified: true
    },
    {
      id: 'rev-003',
      author: 'Alexandre Martin',
      rating: 5,
      date: '02/12/2025',
      comment: 'Parfait pour mon objectif de prise de masse. La composition est claire et les ingrédients de qualité. J\'apprécie particulièrement l\'ajout de BCAA et de créatine. Aucun problème digestif contrairement à d\'autres marques testées.',
      verified: true
    },
    {
      id: 'rev-004',
      author: 'Sophie Bernard',
      rating: 5,
      date: '28/11/2025',
      comment: 'Mon compagnon utilise ce produit depuis 2 mois et les résultats sont impressionnants. Il a gagné en masse musculaire tout en restant sec. Le goût vanille est excellent, pas trop sucré. Service client très réactif.',
      verified: true
    }]

  };

  const relatedProducts = [
  {
    id: 'prod-002',
    name: 'Whey Protein Isolate Premium',
    brand: 'BodyFuel Nutrition',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviewCount: 567,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c84056da-1767352801122.png",
    imageAlt: 'Pot de Whey Protein Isolate Premium saveur vanille de 2kg avec cuillère doseuse sur fond blanc'
  },
  {
    id: 'prod-003',
    name: 'BCAA Energy Complex 2:1:1',
    brand: 'BodyFuel Nutrition',
    price: 29.99,
    rating: 4.6,
    reviewCount: 234,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cf4c31a7-1767780834747.png",
    imageAlt: 'Boîte de BCAA Energy Complex avec gélules colorées visibles à travers le contenant transparent'
  },
  {
    id: 'prod-004',
    name: 'Créatine Monohydrate Micronisée',
    brand: 'BodyFuel Nutrition',
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviewCount: 891,
    image: "https://images.unsplash.com/photo-1724160167630-a33086ddb552",
    imageAlt: 'Pot de Créatine Monohydrate Micronisée avec poudre blanche fine et cuillère de mesure'
  },
  {
    id: 'prod-005',
    name: 'Pre-Workout Explosive Energy',
    brand: 'BodyFuel Nutrition',
    price: 34.99,
    rating: 4.7,
    reviewCount: 423,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_189b097ed-1765250750734.png",
    imageAlt: 'Pot de Pre-Workout Explosive Energy saveur fruit rouge avec design énergétique sur fond noir'
  }];


  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={0} />
      
      <div className="h-16" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        <ProductDetailsInteractive
          productData={productData}
          relatedProducts={relatedProducts} />

      </main>
    </div>);

}