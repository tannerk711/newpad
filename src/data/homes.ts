export interface HomeCard {
  id: string;
  address: string;
  city: string;
  type: 'infill' | 'duplex';
  price: string;
  sqft: string;
  image: string; // Filename in src/assets/homes/ (without extension)
  status: 'For Sale' | 'Under Contract' | 'Coming Soon';
}

// Real inventory data - alternating infill / duplex
export const homes: HomeCard[] = [
  {
    id: '1',
    address: '2729 Finley St',
    city: 'Fort Worth, TX',
    type: 'infill',
    price: '$309,000',
    sqft: '1,659',
    image: 'infill-1',
    status: 'For Sale',
  },
  {
    id: '2',
    address: '333 N Field St',
    city: 'Burleson, TX',
    type: 'duplex',
    price: '$509,000',
    sqft: '3,239',
    image: 'duplex-1',
    status: 'For Sale',
  },
  {
    id: '3',
    address: '209 Lead Creek Dr',
    city: 'Fort Worth, TX',
    type: 'infill',
    price: '$299,000',
    sqft: '1,384',
    image: 'infill-2',
    status: 'For Sale',
  },
  {
    id: '4',
    address: '301 Eastland St',
    city: 'Cleburne, TX',
    type: 'duplex',
    price: '$428,500',
    sqft: '3,026',
    image: 'duplex-2',
    status: 'For Sale',
  },
  {
    id: '5',
    address: '2513 Birdell Ct',
    city: 'Fort Worth, TX',
    type: 'infill',
    price: '$268,500',
    sqft: '1,397',
    image: 'infill-3',
    status: 'For Sale',
  },
  {
    id: '6',
    address: '1128 E Broadway Ave',
    city: 'Fort Worth, TX',
    type: 'duplex',
    price: '$469,000',
    sqft: '2,950',
    image: 'duplex-3',
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
