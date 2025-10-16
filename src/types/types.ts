interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  image: string;
}

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  price_range: string;
  open: boolean;
  categories: string[];
  photos: string[];
  reviews: Review[];
  location: Location;
  country: string;
}
