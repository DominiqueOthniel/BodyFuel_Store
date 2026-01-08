'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProductImageGalleryProps {
  images: Array<{ url: string; alt: string }>;
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-muted rounded-lg overflow-hidden aspect-square">
        <AppImage
          src={images[selectedImageIndex].url}
          alt={images[selectedImageIndex].alt}
          className={`w-full h-full object-contain transition-smooth cursor-zoom-in ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          onClick={toggleZoom}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-card/90 hover:bg-card rounded-full shadow-elevation-2 transition-smooth"
              aria-label="Image précédente"
            >
              <Icon name="ChevronLeftIcon" size={20} className="text-foreground" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-card/90 hover:bg-card rounded-full shadow-elevation-2 transition-smooth"
              aria-label="Image suivante"
            >
              <Icon name="ChevronRightIcon" size={20} className="text-foreground" />
            </button>
          </>
        )}

        {/* Zoom Indicator */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-card/90 rounded-lg shadow-elevation-2">
          <div className="flex items-center space-x-2">
            <Icon name="MagnifyingGlassIcon" size={16} className="text-muted-foreground" />
            <span className="text-xs font-medium text-foreground caption">
              {isZoomed ? 'Cliquer pour dézoomer' : 'Cliquer pour zoomer'}
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-smooth ${
                selectedImageIndex === index
                  ? 'ring-2 ring-primary shadow-elevation-2'
                  : 'ring-1 ring-border hover:ring-primary/50'
              }`}
              aria-label={`Voir l'image ${index + 1}`}
            >
              <AppImage
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground caption">
        <span className="font-medium text-foreground">
          {selectedImageIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
};

export default ProductImageGallery;