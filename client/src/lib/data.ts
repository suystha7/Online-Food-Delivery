import { Category, Testimonial } from './types';

export const banners = [
  {
    id: 1,
    image: "/banner/food1.webp",
    alt: "Delicious Food 1",
    title: "Discover the Taste of Excellence",
    description:
      "Indulge in the finest culinary creations from around the world.",
  },
  {
    id: 2,
    image: "/banner/food2.avif",
    alt: "Delicious Food 2",
    title: "A Feast for the Senses",
    description: "Savor every bite with our expertly crafted dishes.",
  },
  {
    id: 3,
    image: "/banner/food.webp",
    alt: "Delicious Food 3",
    title: "Elevate Your Dining Experience",
    description:
      "Join us for an unforgettable journey of flavors and textures.",
  },
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Starters",
    items: [
      {
        id: 1,
        name: "Bruschetta",
        description: "Grilled bread with tomato, basil, and garlic.",
        price: 8.99,
        image: "/images/bruschetta.webp",
      },
      {
        id: 2,
        name: "Garlic Bread",
        description: "Warm bread with garlic butter.",
        price: 5.99,
        image: "/images/garlic-bread.webp",
      },
      {
        id: 3,
        name: "Spaghetti Carbonara",
        description: "Pasta with creamy sauce, bacon, and parmesan.",
        price: 14.99,
        image: "/images/spaghetti.webp",
      },
      {
        id: 4,
        name: "Margherita Pizza",
        description: "Classic pizza with mozzarella, tomato, and basil.",
        price: 12.99,
        image: "/images/margherita-pizza.webp",
      },
      {
        id: 5,
        name: "Margherita Pizza",
        description: "Classic pizza with mozzarella, tomato, and basil.",
        price: 12.99,
        image: "/images/margherita-pizza.webp",
      },
    ],
  }
];

export const dishes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    description: "Pasta with creamy sauce, bacon, and parmesan.",
    price: 14.99,
    image: "/images/spaghetti.webp",
    rating: 4.5,  // Added rating
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Classic pizza with mozzarella, tomato, and basil.",
    price: 12.99,
    image: "/images/margherita-pizza.webp",
    rating: 4.0,  // Added rating
  },
  {
    id: 3,
    name: "Bruschetta",
    description: "Grilled bread with tomato, basil, and garlic.",
    price: 8.99,
    image: "/images/bruschetta.webp",
    rating: 3.5,  // Added rating
  },
  {
    id: 4,
    name: "Garlic Bread",
    description: "Warm bread with garlic butter.",
    price: 5.99,
    image: "/images/garlic-bread.webp",
    rating: 4.2,  // Added rating
  },
  {
    id: 1,
    name: "Spaghetti Carbonara",
    description: "Pasta with creamy sauce, bacon, and parmesan.",
    price: 14.99,
    image: "/images/spaghetti.webp",
    rating: 4.5,  // Added rating
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Classic pizza with mozzarella, tomato, and basil.",
    price: 12.99,
    image: "/images/margherita-pizza.webp",
    rating: 4.0,  // Added rating
  },
  {
    id: 3,
    name: "Bruschetta",
    description: "Grilled bread with tomato, basil, and garlic.",
    price: 8.99,
    image: "/images/bruschetta.webp",
    rating: 3.5,  // Added rating
  },
  {
    id: 4,
    name: "Garlic Bread",
    description: "Warm bread with garlic butter.",
    price: 5.99,
    image: "/images/garlic-bread.webp",
    rating: 4.2,  // Added rating
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "HOLDEN CAULFIELD",
    role: "Senior Product Designer",
    imageUrl: "https://dummyimage.com/302x302",
    quote:
      "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
  },
  {
    name: "ALPER KAMU",
    role: "UI Developer",
    imageUrl: "https://dummyimage.com/300x300",
    quote:
      "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
  },
  {
    name: "HENRY LETHAM",
    role: "CTO",
    imageUrl: "https://dummyimage.com/305x305",
    quote:
      "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
  },
];