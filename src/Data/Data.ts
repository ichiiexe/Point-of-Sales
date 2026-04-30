type Category = "all" | "wok" | "wok-e-food" | "drinks" | "beers";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: 0,
    name: "Noodles",
    price: 5.9,
    category: "wok",
    imageUrl: "/images/chicken-noodles.jpg",
  },
  {
    id: 1,
    name: "Egg Noodles",
    price: 5.9,
    category: "wok",
    imageUrl: "/images/egg-noodles.jpg",
  },
  {
    id: 2,
    name: "Rice Noodles",
    price: 5.9,
    category: "wok",
    imageUrl: "/images/rice-noodles.jpg",
  },
  {
    id: 3,
    name: "White Rice",
    price: 5.9,
    category: "wok",
    imageUrl: "/images/e-food-noodles.jpg",
  },
  {
    id: 4,
    name: "Brown Rice",
    price: 5.9,
    category: "wok",
    imageUrl: "/images/brown-rice.jpg",
  },
  {
    id: 5,
    name: "Coca-Cola",
    price: 1.5,
    category: "drinks",
    imageUrl: "/images/coke.jpg",
  },
  {
    id: 6,
    name: "Coca-Cola Zero",
    price: 1.5,
    category: "drinks",
    imageUrl: "/images/coke-zero.jpg",
  },
  {
    id: 7,
    name: "Fanta Orange",
    price: 1.5,
    category: "drinks",
    imageUrl: "/images/fanta.jpg",
  },
  {
    id: 8,
    name: "Fanta Lemon",
    price: 1.5,
    category: "drinks",
    imageUrl: "/images/fanta-lemon.jpg",
  },
  {
    id: 9,
    name: "Sprite",
    price: 1.5,
    category: "drinks",
    imageUrl: "/images/sprite.jpg",
  },
  {
    id: 10,
    name: "Fuze Tea",
    price: 1.5,
    category: "drinks",
    imageUrl: "/images/fuze-tea.jpg",
  },
  {
    id: 11,
    name: "Schweppes Lemon",
    price: 1.5,
    category: "drinks",
    imageUrl: "/images/schweppes-lemon.jpg",
  },
  {
    id: 12,
    name: "Alfa Beer",
    price: 2,
    category: "beers",
    imageUrl: "/images/alfa-beer.jpg",
  },
  {
    id: 13,
    name: "Water",
    price: 0.5,
    category: "drinks",
    imageUrl: "/images/water.jpg",
  },
];
