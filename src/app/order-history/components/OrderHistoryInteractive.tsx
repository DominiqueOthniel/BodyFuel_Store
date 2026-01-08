'use client';

import { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import OrderFilters, { FilterState } from './OrderFilters';
import OrderSearch from './OrderSearch';
import EmptyOrderState from './EmptyOrderState';
import OrderPagination from './OrderPagination';
import CustomerSupportInfo from './CustomerSupportInfo';
import LoadingSkeleton from './LoadingSkeleton';

interface OrderProduct {
  id: number;
  name: string;
  image: string;
  alt: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  orderNumber: string;
  date: string;
  total: number;
  status: 'En préparation' | 'Expédié' | 'Livré';
  products: OrderProduct[];
  trackingNumber?: string;
  shippingAddress: string;
  paymentMethod: string;
  deliveryDate?: string;
  canReturn: boolean;
  category: string;
}

const OrderHistoryInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 'all',
    status: 'all',
    category: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const ordersPerPage = 5;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const mockOrders: Order[] = [
    {
      id: 1,
      orderNumber: 'BF2026-001234',
      date: '05/01/2026',
      total: 127.85,
      status: 'Livré',
      products: [
      {
        id: 1,
        name: 'Optimum Nutrition Serious Mass 5.4kg',
        image: "https://images.unsplash.com/photo-1678875524413-20dcbded9c3f",
        alt: 'White protein powder container with black label on wooden surface',
        quantity: 1,
        price: 89.90
      },
      {
        id: 2,
        name: 'Shaker Premium 700ml',
        image: "https://images.unsplash.com/photo-1711623350090-4f98efcb5acc",
        alt: 'Black protein shaker bottle with measurement markings on gym floor',
        quantity: 2,
        price: 18.95
      }],

      trackingNumber: 'FR123456789',
      shippingAddress: 'Jean Dupont\n15 Rue de la République\n75001 Paris\nFrance',
      paymentMethod: 'Carte bancaire •••• 4242',
      deliveryDate: '03/01/2026',
      canReturn: true,
      category: 'mass-gainers'
    },
    {
      id: 2,
      orderNumber: 'BF2026-001189',
      date: '28/12/2025',
      total: 215.40,
      status: 'Expédié',
      products: [
      {
        id: 3,
        name: 'Whey Protein Isolate 2kg Chocolat',
        image: "https://images.unsplash.com/photo-1679389456075-79494e7808ff",
        alt: 'Brown chocolate protein powder tub with silver lid on white background',
        quantity: 2,
        price: 99.90
      },
      {
        id: 4,
        name: 'BCAA 8:1:1 - 300 gélules',
        image: "https://images.unsplash.com/photo-1632470233586-19af5d7d1a08",
        alt: 'White supplement bottle with blue cap containing BCAA capsules',
        quantity: 1,
        price: 15.60
      }],

      trackingNumber: 'FR987654321',
      shippingAddress: 'Marie Martin\n42 Avenue des Champs\n69002 Lyon\nFrance',
      paymentMethod: 'PayPal',
      deliveryDate: '08/01/2026',
      canReturn: true,
      category: 'proteins'
    },
    {
      id: 3,
      orderNumber: 'BF2025-000987',
      date: '15/12/2025',
      total: 156.75,
      status: 'Livré',
      products: [
      {
        id: 5,
        name: 'Mass Gainer Pro 3kg Vanille',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1efb3d380-1766743567260.png",
        alt: 'Beige vanilla protein powder container with gold accents on marble counter',
        quantity: 1,
        price: 79.90
      },
      {
        id: 6,
        name: 'Créatine Monohydrate 500g',
        image: "https://images.unsplash.com/photo-1693996045435-af7c48b9cafb",
        alt: 'Clear plastic jar filled with white creatine powder on gym bench',
        quantity: 1,
        price: 24.90
      },
      {
        id: 7,
        name: 'Multivitamines Sport - 90 comprimés',
        image: "https://images.unsplash.com/photo-1668440246394-16345d505be3",
        alt: 'Orange vitamin bottle with white label surrounded by colorful pills',
        quantity: 2,
        price: 25.95
      }],

      shippingAddress: 'Pierre Dubois\n8 Boulevard Saint-Michel\n33000 Bordeaux\nFrance',
      paymentMethod: 'Carte bancaire •••• 1234',
      deliveryDate: '18/12/2025',
      canReturn: false,
      category: 'mass-gainers'
    },
    {
      id: 4,
      orderNumber: 'BF2025-000856',
      date: '02/12/2025',
      total: 89.90,
      status: 'Livré',
      products: [
      {
        id: 8,
        name: 'Whey Protein Concentrate 1kg Fraise',
        image: "https://images.unsplash.com/photo-1582140687352-69ae16116ffc",
        alt: 'Pink strawberry protein powder container with red label on kitchen counter',
        quantity: 1,
        price: 49.90
      },
      {
        id: 9,
        name: 'Barre protéinée Chocolat - Pack de 12',
        image: "https://images.unsplash.com/photo-1572359678514-1ade6b520c9d",
        alt: 'Stack of chocolate protein bars with brown wrapper on wooden table',
        quantity: 1,
        price: 39.90
      }],

      shippingAddress: 'Sophie Laurent\n23 Rue Victor Hugo\n31000 Toulouse\nFrance',
      paymentMethod: 'Carte bancaire •••• 5678',
      deliveryDate: '05/12/2025',
      canReturn: false,
      category: 'proteins'
    },
    {
      id: 5,
      orderNumber: 'BF2025-000723',
      date: '18/11/2025',
      total: 342.50,
      status: 'En préparation',
      products: [
      {
        id: 10,
        name: 'Pack Mass Gainer Premium 6kg',
        image: "https://images.unsplash.com/photo-1727433613965-923f6c9d400b",
        alt: 'Large black protein powder container with silver logo on gym equipment',
        quantity: 1,
        price: 189.90
      },
      {
        id: 11,
        name: 'Pré-Workout Explosive 300g',
        image: "https://images.unsplash.com/photo-1701794714185-127ad0ab7297",
        alt: 'Red pre-workout supplement container with black lid on gym floor',
        quantity: 2,
        price: 76.30
      }],

      shippingAddress: 'Thomas Bernard\n56 Rue de la Paix\n59000 Lille\nFrance',
      paymentMethod: 'Carte bancaire •••• 9012',
      canReturn: true,
      category: 'mass-gainers'
    },
    {
      id: 6,
      orderNumber: 'BF2025-000654',
      date: '05/11/2025',
      total: 198.75,
      status: 'Livré',
      products: [
      {
        id: 12,
        name: 'Isolate Whey 2.5kg Vanille',
        image: "https://images.unsplash.com/photo-1693996045404-d7cc056250e2",
        alt: 'White vanilla protein powder tub with gold trim on marble surface',
        quantity: 1,
        price: 119.90
      },
      {
        id: 13,
        name: 'Glutamine Pure 500g',
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_18775f950-1765759509324.png",
        alt: 'Transparent container with white glutamine powder on black background',
        quantity: 1,
        price: 29.90
      },
      {
        id: 14,
        name: 'Oméga-3 Fish Oil - 120 capsules',
        image: "https://images.unsplash.com/photo-1694499503118-b2a78fd1517a",
        alt: 'Blue omega-3 supplement bottle with yellow fish oil capsules',
        quantity: 1,
        price: 48.95
      }],

      shippingAddress: 'Claire Petit\n12 Avenue de la Liberté\n44000 Nantes\nFrance',
      paymentMethod: 'PayPal',
      deliveryDate: '08/11/2025',
      canReturn: false,
      category: 'proteins'
    }];


    setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setIsLoading(false);
    }, 800);
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    let filtered = [...orders];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
        order.orderNumber.toLowerCase().includes(query) ||
        order.products.some((product) => product.name.toLowerCase().includes(query))
      );
    }

    if (filters.status !== 'all') {
      const statusMap: Record<string, string> = {
        preparation: 'En préparation',
        shipped: 'Expédié',
        delivered: 'Livré'
      };
      filtered = filtered.filter((order) => order.status === statusMap[filters.status]);
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter((order) => order.category === filters.category);
    }

    if (filters.dateRange !== 'all') {
      const now = new Date('2026-01-07');
      const filterDate = new Date(now);

      switch (filters.dateRange) {
        case 'last30':
          filterDate.setDate(now.getDate() - 30);
          break;
        case 'last90':
          filterDate.setDate(now.getDate() - 90);
          break;
        case 'last180':
          filterDate.setDate(now.getDate() - 180);
          break;
        case 'lastYear':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter((order) => {
        const [day, month, year] = order.date.split('/');
        const orderDate = new Date(`${year}-${month}-${day}`);
        return orderDate >= filterDate;
      });
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchQuery, filters, orders, isHydrated]);

  if (!isHydrated) {
    return <LoadingSkeleton />;
  }

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <OrderSearch onSearch={setSearchQuery} />

      <OrderFilters onFilterChange={setFilters} />

      {isLoading ?
      <LoadingSkeleton /> :
      currentOrders.length > 0 ?
      <>
          <div className="space-y-4">
            {currentOrders.map((order) =>
          <OrderCard
            key={order.id}
            orderNumber={order.orderNumber}
            date={order.date}
            total={order.total}
            status={order.status}
            products={order.products}
            trackingNumber={order.trackingNumber}
            shippingAddress={order.shippingAddress}
            paymentMethod={order.paymentMethod}
            deliveryDate={order.deliveryDate}
            canReturn={order.canReturn} />

          )}
          </div>

          <OrderPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage} />

        </> :

      <EmptyOrderState />
      }

      <CustomerSupportInfo />
    </div>);

};

export default OrderHistoryInteractive;