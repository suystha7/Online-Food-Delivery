
// Define a type for individual menu items
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Define a type for categories
export interface Category {
  id: number;
  name: string;
  items: MenuItem[];
}

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
}

export interface PopularDishesProps {
  dishes: Dish[];
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}


export interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  popular?: boolean;
};

export interface Testimonial {
  name: string;
  role: string;
  imageUrl: string;
  quote: string;
}
