'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const HomeInteractive: React.FC = () => {
  const router = useRouter();

  const features = [
    {
      icon: 'BeakerIcon',
      title: 'Protéines Premium',
      description: 'Sélection de protéines de haute qualité pour votre récupération',
    },
    {
      icon: 'BoltIcon',
      title: 'Performance',
      description: 'Suppléments pour améliorer vos performances à l\'entraînement',
    },
    {
      icon: 'HeartIcon',
      title: 'Santé & Bien-être',
      description: 'Produits certifiés pour votre santé et votre bien-être',
    },
    {
      icon: 'TruckIcon',
      title: 'Livraison Rapide',
      description: 'Livraison gratuite en 3-5 jours ouvrés',
    },
  ];

  const categories = [
    {
      name: 'Mass Gainers',
      description: 'Prise de masse rapide',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600',
      href: '/product-catalog?category=Mass Gainers',
    },
    {
      name: 'Protéines',
      description: 'Récupération optimale',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
      href: '/product-catalog?category=Protéines',
    },
    {
      name: 'Suppléments',
      description: 'Performance maximale',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600',
      href: '/product-catalog?category=Suppléments',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                  Transformez votre corps avec{' '}
                  <span className="text-primary">BodyFuel Store</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Découvrez notre gamme complète de suppléments nutritionnels de qualité supérieure. 
                  Des protéines aux mass gainers, tout ce dont vous avez besoin pour atteindre vos objectifs.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/product-catalog"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth font-heading font-semibold text-lg shadow-elevation-2 hover:shadow-elevation-3"
                >
                  <Icon name="ShoppingBagIcon" size={20} />
                  <span>Découvrir nos produits</span>
                </Link>
                <button
                  onClick={() => router.push('/product-catalog')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-smooth font-heading font-semibold text-lg"
                >
                  <Icon name="InformationCircleIcon" size={20} />
                  <span>En savoir plus</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div>
                  <div className="text-3xl font-heading font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground mt-1">Produits</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground mt-1">Clients satisfaits</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-primary">4.8/5</div>
                  <div className="text-sm text-muted-foreground mt-1">Note moyenne</div>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-elevation-4 bg-gradient-to-br from-primary/20 to-accent/20">
                <AppImage
                  src="/assets/hero-image.jpg"
                  alt="Poudre de protéine blanche versée dans un shaker sombre avec bordure orange"
                  className="w-full h-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Overlay gradient with warm tones */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-accent/10 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-6 shadow-elevation-3 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckBadgeIcon" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-foreground">Certifié UE</div>
                    <div className="text-sm text-muted-foreground">Qualité garantie</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-background hover:shadow-elevation-2 transition-smooth"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature.icon} size={32} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Explorez nos catégories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trouvez les produits parfaits pour vos objectifs de fitness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group relative overflow-hidden rounded-xl bg-card shadow-elevation-2 hover:shadow-elevation-3 transition-smooth"
              >
                <div className="aspect-video overflow-hidden bg-muted">
                  <AppImage
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-2 group-hover:text-primary transition-smooth">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground">{category.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-primary font-medium">
                    <span>Découvrir</span>
                    <Icon name="ArrowRightIcon" size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            Prêt à commencer votre transformation ?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Rejoignez des milliers de clients satisfaits et atteignez vos objectifs avec BodyFuel Store
          </p>
          <Link
            href="/product-catalog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-smooth font-heading font-semibold text-lg shadow-elevation-2"
          >
            <Icon name="ShoppingBagIcon" size={20} />
            <span>Voir le catalogue</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeInteractive;

