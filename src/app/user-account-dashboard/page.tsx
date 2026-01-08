import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Breadcrumb from '@/components/common/Breadcrumb';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
  title: 'Mon Compte - BodyFuel Store',
  description: 'Gérez votre compte BodyFuel Store, consultez vos commandes récentes, vos produits favoris et bénéficiez de recommandations personnalisées pour vos objectifs fitness.'
};

export default function UserAccountDashboardPage() {
  const userData = {
    name: "Sophie Martin",
    accountStatus: "Membre Premium",
    memberSince: "15/03/2024",
    loyaltyPoints: 2450
  };

  const quickActions = [
  {
    id: "1",
    label: "Mes commandes",
    icon: "ClipboardDocumentListIcon",
    href: "/order-history",
    description: "Historique complet",
    color: "bg-primary"
  },
  {
    id: "2",
    label: "Modifier profil",
    icon: "UserIcon",
    href: "/user-account-dashboard",
    description: "Informations personnelles",
    color: "bg-secondary"
  },
  {
    id: "3",
    label: "Adresses",
    icon: "MapPinIcon",
    href: "/user-account-dashboard",
    description: "Gérer mes adresses",
    color: "bg-accent"
  },
  {
    id: "4",
    label: "Paiements",
    icon: "CreditCardIcon",
    href: "/user-account-dashboard",
    description: "Moyens de paiement",
    color: "bg-primary"
  }];


  const recentOrders = [
  {
    id: "1",
    orderNumber: "BF20260105001",
    date: "05/01/2026",
    total: 127.50,
    status: "Livré",
    statusColor: "bg-success/10 text-success",
    trackingAvailable: false,
    products: [
    {
      id: "p1",
      name: "Serious Mass Gainer",
      image: "https://images.unsplash.com/photo-1704650311190-7eeb9c4f6e11",
      alt: "White protein powder container with black scoop on wooden surface with scattered powder",
      quantity: 2
    },
    {
      id: "p2",
      name: "Whey Protein Isolate",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_15ab520fd-1766216244095.png",
      alt: "Black protein supplement container with silver label on gym equipment background",
      quantity: 1
    }]

  },
  {
    id: "2",
    orderNumber: "BF20260102002",
    date: "02/01/2026",
    total: 89.90,
    status: "En transit",
    statusColor: "bg-warning/10 text-warning",
    trackingAvailable: true,
    products: [
    {
      id: "p3",
      name: "BCAA Complex",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1402f5593-1767472223048.png",
      alt: "Blue supplement capsules spilling from white bottle on marble countertop",
      quantity: 1
    },
    {
      id: "p4",
      name: "Creatine Monohydrate",
      image: "https://images.unsplash.com/photo-1709976142774-ce1ef41a8378",
      alt: "Red and white supplement container with measuring scoop on fitness mat",
      quantity: 1
    }]

  },
  {
    id: "3",
    orderNumber: "BF20251228003",
    date: "28/12/2025",
    total: 156.00,
    status: "En préparation",
    statusColor: "bg-primary/10 text-primary",
    trackingAvailable: false,
    products: [
    {
      id: "p5",
      name: "Pre-Workout Extreme",
      image: "https://images.unsplash.com/photo-1693996045346-d0a9b9470909",
      alt: "Orange energy drink powder container with black lid on gym bench",
      quantity: 1
    }]

  },
  {
    id: "4",
    orderNumber: "BF20251220004",
    date: "20/12/2025",
    total: 203.75,
    status: "Livré",
    statusColor: "bg-success/10 text-success",
    trackingAvailable: false,
    products: [
    {
      id: "p6",
      name: "Mass Gainer Pro",
      image: "https://images.unsplash.com/photo-1727433613965-923f6c9d400b",
      alt: "Large black protein container with gold accents next to shaker bottle",
      quantity: 3
    }]

  }];


  const favoriteProducts = [
  {
    id: "f1",
    name: "Optimum Nutrition Gold Standard 100% Whey Protein",
    brand: "Optimum Nutrition",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15ab520fd-1766216244095.png",
    alt: "Black protein supplement container with silver label on gym equipment background",
    price: 54.90,
    originalPrice: 64.90,
    inStock: true,
    rating: 4.8,
    reviewCount: 1247
  },
  {
    id: "f2",
    name: "Serious Mass Weight Gainer Chocolate",
    brand: "Optimum Nutrition",
    image: "https://images.unsplash.com/photo-1704650311190-7eeb9c4f6e11",
    alt: "White protein powder container with black scoop on wooden surface with scattered powder",
    price: 62.50,
    originalPrice: 74.90,
    inStock: true,
    rating: 4.6,
    reviewCount: 892
  },
  {
    id: "f3",
    name: "BCAA Energy Amino Acids with Natural Caffeine",
    brand: "Evlution Nutrition",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1402f5593-1767472223048.png",
    alt: "Blue supplement capsules spilling from white bottle on marble countertop",
    price: 32.90,
    inStock: false,
    rating: 4.5,
    reviewCount: 634
  },
  {
    id: "f4",
    name: "Creatine Monohydrate Micronized Powder",
    brand: "MuscleTech",
    image: "https://images.unsplash.com/photo-1709976142774-ce1ef41a8378",
    alt: "Red and white supplement container with measuring scoop on fitness mat",
    price: 28.90,
    originalPrice: 34.90,
    inStock: true,
    rating: 4.7,
    reviewCount: 1089
  }];


  const recommendations = [
  {
    id: "r1",
    name: "C4 Original Pre-Workout Powder",
    brand: "Cellucor",
    image: "https://images.unsplash.com/photo-1693996045346-d0a9b9470909",
    alt: "Orange energy drink powder container with black lid on gym bench",
    price: 39.90,
    memberPrice: 34.90,
    category: "Pre-Workout",
    reason: "Parfait pour vos séances d\'entraînement intensives",
    rating: 4.6
  },
  {
    id: "r2",
    name: "Glutamine Powder 5000mg",
    brand: "Optimum Nutrition",
    image: "https://images.unsplash.com/photo-1727433613965-923f6c9d400b",
    alt: "Large black protein container with gold accents next to shaker bottle",
    price: 29.90,
    memberPrice: 24.90,
    category: "Récupération",
    reason: "Idéal pour la récupération musculaire post-entraînement",
    rating: 4.5
  },
  {
    id: "r3",
    name: "ZMA Zinc Magnesium Vitamin B6",
    brand: "NOW Sports",
    image: "https://images.unsplash.com/photo-1704650311190-7eeb9c4f6e11",
    alt: "White protein powder container with black scoop on wooden surface with scattered powder",
    price: 24.90,
    memberPrice: 19.90,
    category: "Vitamines",
    reason: "Améliore la qualité du sommeil et la récupération",
    rating: 4.4
  },
  {
    id: "r4",
    name: "Omega-3 Fish Oil 1000mg",
    brand: "Nature Made",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15ab520fd-1766216244095.png",
    alt: "Black protein supplement container with silver label on gym equipment background",
    price: 19.90,
    memberPrice: 16.90,
    category: "Santé",
    reason: "Soutient la santé cardiovasculaire et articulaire",
    rating: 4.7
  }];


  const loyaltyData = {
    currentPoints: 2450,
    currentTier: "Premium",
    nextTier: {
      name: "Elite",
      pointsRequired: 5000,
      benefits: [
      "Réduction de 15% sur tous les produits",
      "Livraison gratuite sans minimum d\'achat",
      "Accès prioritaire aux nouvelles collections",
      "Conseils nutritionnels personnalisés gratuits",
      "Cadeaux exclusifs pour votre anniversaire"]

    },
    availableRewards: 3
  };

  const accountSettings = [
  {
    id: "s1",
    label: "Informations personnelles",
    description: "Nom, email, téléphone",
    icon: "UserIcon",
    href: "/user-account-dashboard"
  },
  {
    id: "s2",
    label: "Adresses de livraison",
    description: "Gérer vos adresses",
    icon: "MapPinIcon",
    href: "/user-account-dashboard"
  },
  {
    id: "s3",
    label: "Moyens de paiement",
    description: "Cartes et méthodes de paiement",
    icon: "CreditCardIcon",
    href: "/user-account-dashboard"
  },
  {
    id: "s4",
    label: "Sécurité",
    description: "Mot de passe et authentification",
    icon: "LockClosedIcon",
    href: "/user-account-dashboard"
  }];


  const communicationPreferences = [
  {
    id: "cp1",
    label: "Newsletter hebdomadaire",
    description: "Recevez nos dernières offres et conseils fitness",
    enabled: true
  },
  {
    id: "cp2",
    label: "Notifications de commande",
    description: "Mises à jour sur l\'état de vos commandes",
    enabled: true
  },
  {
    id: "cp3",
    label: "Offres personnalisées",
    description: "Promotions basées sur vos préférences",
    enabled: true
  },
  {
    id: "cp4",
    label: "Nouveaux produits",
    description: "Soyez informé des nouveautés en avant-première",
    enabled: false
  },
  {
    id: "cp5",
    label: "Rappels d\'abonnement",
    description: "Notifications pour vos produits en abonnement",
    enabled: true
  }];


  return (
    <>
      <Header cartItemCount={3} />
      
      <main className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          <DashboardInteractive
            userData={userData}
            quickActions={quickActions}
            recentOrders={recentOrders}
            favoriteProducts={favoriteProducts}
            recommendations={recommendations}
            loyaltyData={loyaltyData}
            accountSettings={accountSettings}
            communicationPreferences={communicationPreferences} />

        </div>
      </main>
    </>);

}