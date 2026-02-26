export interface HomeCard {
  id: string;
  title: string;
  type: 'infill' | 'community' | 'duplex';
  price: string;
  sqft: string;
  beds: number;
  baths: number;
  image: string; // Filename in src/assets/homes/ (without extension)
  status: 'For Sale' | 'Under Contract' | 'Coming Soon';
}

// Placeholder data based on NewPad's actual inventory
export const homes: HomeCard[] = [
  {
    id: '1',
    title: 'Modern Infill Home',
    type: 'infill',
    price: '$254,000',
    sqft: '1,278',
    beds: 3,
    baths: 2,
    image: 'home-exterior-1',
    status: 'For Sale',
  },
  {
    id: '2',
    title: 'New Construction Duplex',
    type: 'duplex',
    price: '$428,500',
    sqft: '2,950',
    beds: 6,
    baths: 4,
    image: 'duplex-exterior-1',
    status: 'For Sale',
  },
  {
    id: '3',
    title: 'Contemporary Infill',
    type: 'infill',
    price: '$299,000',
    sqft: '1,560',
    beds: 3,
    baths: 2,
    image: 'home-interior-living',
    status: 'For Sale',
  },
  {
    id: '4',
    title: 'Spacious Family Home',
    type: 'infill',
    price: '$342,000',
    sqft: '1,660',
    beds: 4,
    baths: 2,
    image: 'home-interior-kitchen',
    status: 'Under Contract',
  },
  {
    id: '5',
    title: 'Modern Duplex',
    type: 'duplex',
    price: '$509,000',
    sqft: '3,239',
    beds: 6,
    baths: 4,
    image: 'duplex-interior',
    status: 'Coming Soon',
  },
  {
    id: '6',
    title: 'Urban Infill Home',
    type: 'infill',
    price: '$268,500',
    sqft: '1,397',
    beds: 3,
    baths: 2,
    image: 'home-exterior-dusk',
    status: 'For Sale',
  },
];

// Image map: resolves image filename to imported asset path.
// Astro needs static imports for image optimization, so we map them here.
// These are used by the Astro components (not the React carousel).
export const homeImages: Record<string, ImageMetadata> = {};

// For the React carousel, we pass pre-resolved image URLs from the Astro parent.
export interface HomeCardWithImage extends HomeCard {
  imageUrl: string;
}
