type Category = "All" | "Wok" | "E-Food" | "Drinks" | "Beers";

export const categories: Category[] = [
  "All",
  "Wok",
  "E-Food",
  "Drinks",
  "Beers",
];

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  imageUrl: string;
}

export interface Ingredient {
  id: number;
  name: string;
  price: number;
}

export const products: Product[] = [
  {
    id: 0,
    name: "Noodles",
    price: 5.9,
    category: "Wok",
    imageUrl: "/images/chicken-noodles.jpg",
  },
  {
    id: 1,
    name: "Egg Noodles",
    price: 5.9,
    category: "Wok",
    imageUrl: "/images/egg-noodles.jpg",
  },
  {
    id: 2,
    name: "Rice Noodles",
    price: 5.9,
    category: "Wok",
    imageUrl: "/images/rice-noodles.jpg",
  },
  {
    id: 3,
    name: "White Rice",
    price: 5.9,
    category: "Wok",
    imageUrl: "/images/e-food-noodles.jpg",
  },
  {
    id: 4,
    name: "Brown Rice",
    price: 5.9,
    category: "Wok",
    imageUrl: "/images/brown-rice.jpg",
  },
  {
    id: 5,
    name: "Veggie Dish",
    price: 5.9,
    category: "Wok",
    imageUrl: "/images/veggie-dish.jpg",
  },
  {
    id: 6,
    name: "Coca-Cola",
    price: 1.5,
    category: "Drinks",
    imageUrl: "/images/coke.jpg",
  },
  {
    id: 7,
    name: "Coca-Cola Zero",
    price: 1.5,
    category: "Drinks",
    imageUrl: "/images/coke-zero.jpg",
  },
  {
    id: 8,
    name: "Fanta Orange",
    price: 1.5,
    category: "Drinks",
    imageUrl: "/images/fanta.jpg",
  },
  {
    id: 9,
    name: "Fanta Lemon",
    price: 1.5,
    category: "Drinks",
    imageUrl: "/images/fanta-lemon.jpg",
  },
  {
    id: 10,
    name: "Sprite",
    price: 1.5,
    category: "Drinks",
    imageUrl: "/images/sprite.jpg",
  },
  {
    id: 11,
    name: "Fuze Tea",
    price: 1.5,
    category: "Drinks",
    imageUrl: "/images/fuze-tea.jpg",
  },
  {
    id: 12,
    name: "Schweppes Lemon",
    price: 1.5,
    category: "Drinks",
    imageUrl: "/images/schweppes-lemon.jpg",
  },
  {
    id: 13,
    name: "Alfa Beer",
    price: 2,
    category: "Beers",
    imageUrl: "/images/alfa-beer.jpg",
  },
  {
    id: 14,
    name: "Water",
    price: 0.5,
    category: "Drinks",
    imageUrl: "/images/water.jpg",
  },
];

export const ingredients: Ingredient[] = [
  { id: 0, name: "Pork", price: 1.2 },
  { id: 1, name: "Chicken", price: 1.5 },
  { id: 2, name: "Beef", price: 1.8 },
  { id: 3, name: "Shrimp", price: 1.9 },
  { id: 4, name: "Mushroom", price: 0.8 },
  { id: 5, name: "Mixed Peppers", price: 0.8 },
  { id: 6, name: "Pineapple", price: 0.8 },
  { id: 7, name: "Bamboo Shoots", price: 0.7 },
  { id: 8, name: "Baby Corn", price: 0.7 },
  { id: 9, name: "Broccoli", price: 0.9 },
  { id: 10, name: "Black Mushroom", price: 0.9 },
  { id: 11, name: "Cashews", price: 0.9 },
];

export const Sauce = [
  { id: 0, name: "Teriyaki" },
  { id: 1, name: "Sweet Chilli" },
  { id: 2, name: "Cantonese" },
  { id: 3, name: "Coconut Curry" },
  { id: 4, name: "Satay" },
  { id: 5, name: "Hot Szechuan" },
];

export const Toppings = [
  { id: 0, name: "Peanuts" },
  { id: 1, name: "Fried Onions" },
  { id: 2, name: "Fried Garlic" },
  { id: 3, name: "Sesame Seeds(mixed)" },
  { id: 4, name: "Fresh Coriander" },
];
