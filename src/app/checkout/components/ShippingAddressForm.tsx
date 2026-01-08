'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  addressComplement: string;
  postalCode: string;
  city: string;
  country: string;
}

interface ShippingAddressFormProps {
  onSubmit: (address: ShippingAddress) => void;
  initialData?: Partial<ShippingAddress>;
}

const ShippingAddressForm = ({ onSubmit, initialData }: ShippingAddressFormProps) => {
  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    addressComplement: initialData?.addressComplement || '',
    postalCode: initialData?.postalCode || '',
    city: initialData?.city || '',
    country: initialData?.country || 'FR',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});

  const euCountries = [
    { code: 'FR', name: 'France' },
    { code: 'BE', name: 'Belgique' },
    { code: 'DE', name: 'Allemagne' },
    { code: 'ES', name: 'Espagne' },
    { code: 'IT', name: 'Italie' },
    { code: 'LU', name: 'Luxembourg' },
    { code: 'NL', name: 'Pays-Bas' },
    { code: 'PT', name: 'Portugal' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingAddress, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^[0-9\s+()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est requise";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis';
    } else if (formData.country === 'FR' && !/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Code postal français invalide (5 chiffres)';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1">
            Prénom <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.firstName ? 'border-error' : 'border-border'
            }`}
            placeholder="Jean"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1">
            Nom <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.lastName ? 'border-error' : 'border-border'
            }`}
            placeholder="Dupont"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
          Email <span className="text-error">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.email ? 'border-error' : 'border-border'
          }`}
          placeholder="jean.dupont@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
          Téléphone <span className="text-error">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.phone ? 'border-error' : 'border-border'
          }`}
          placeholder="+33 6 12 34 56 78"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
          Adresse <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.address ? 'border-error' : 'border-border'
          }`}
          placeholder="123 Rue de la République"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
            {errors.address}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="addressComplement" className="block text-sm font-medium text-foreground mb-1">
          Complément d'adresse
        </label>
        <input
          type="text"
          id="addressComplement"
          value={formData.addressComplement}
          onChange={(e) => handleChange('addressComplement', e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Appartement, étage, etc."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-foreground mb-1">
            Code postal <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.postalCode ? 'border-error' : 'border-border'
            }`}
            placeholder="75001"
          />
          {errors.postalCode && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
              {errors.postalCode}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1">
            Ville <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.city ? 'border-error' : 'border-border'
            }`}
            placeholder="Paris"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-error flex items-center">
              <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
              {errors.city}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-foreground mb-1">
          Pays <span className="text-error">*</span>
        </label>
        <select
          id="country"
          value={formData.country}
          onChange={(e) => handleChange('country', e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {euCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-smooth hover:opacity-90 flex items-center justify-center space-x-2"
      >
        <span>Continuer vers la livraison</span>
        <Icon name="ArrowRightIcon" size={20} />
      </button>
    </form>
  );
};

export default ShippingAddressForm;