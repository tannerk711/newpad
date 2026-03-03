import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { HomeCardWithImage } from '../data/homes';

interface Props {
  homes: HomeCardWithImage[];
}

export default function ImageCarousel({ homes }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const statusColor = (status: string) => {
    if (status === 'For Sale') return 'bg-green-accent text-forest';
    if (status === 'Under Contract') return 'bg-gold text-forest';
    return 'bg-gray-200 text-gray-600';
  };

  return (
    <div className="relative" role="region" aria-label="Available homes carousel" aria-roledescription="carousel">
      {/* Carousel viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex -ml-4 md:-ml-6" aria-live="polite">
          {homes.map((home, idx) => (
            <div
              key={home.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${homes.length}: ${home.address}`}
              className="flex-[0_0_85%] min-w-0 pl-4 md:pl-6 sm:flex-[0_0_45%] lg:flex-[0_0_33.333%]"
            >
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-sage-light">
                  <img
                    src={home.imageUrl}
                    alt={`${home.address}, ${home.city} - ${home.sqft} sqft`}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={450}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Status badge */}
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColor(home.status)}`}
                    >
                      {home.status}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-bold text-forest">{home.address}</h3>
                      <p className="text-sm text-gray-400">{home.city}</p>
                    </div>
                    <span className="text-lg font-bold text-forest sm:shrink-0">
                      {home.price}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-400 sm:gap-3">
                    <span>{home.sqft} sqft</span>
                    <span className="text-gray-300" aria-hidden="true">|</span>
                    <span className="capitalize">{home.type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Previous homes"
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed md:-left-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5 text-forest"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Next homes"
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed md:-right-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5 text-forest"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {homes.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === selectedIndex
                ? 'w-6 bg-forest'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
