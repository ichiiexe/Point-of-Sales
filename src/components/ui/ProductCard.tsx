import type { Product } from "../../Data/Products";

const ProductCard: React.FC<{
  product: Product;
  onAddToCart: (product: Product) => void;
}> = ({ product, onAddToCart }) => {
  const getEmoji = (name: string) => {
    const emojiMap: { [key: string]: string } = {
      //Items
      // Noodles & Rice
      Noodles: "🍜",
      "Egg Noodles": "🍝",
      "Rice Noodles": "🍜",
      "White Rice": "🍚",
      "Brown Rice": "🍚",
      "Veggie Dish": "🥘",
      // Drinks
      "Coca-Cola": "🥤",
      "Coca-Cola Zero": "🥤",
      "Fanta Orange": "🧡",
      "Fanta Lemon": "💛",
      Sprite: "💚",
      "Fuze Tea": "🍵",
      "Schweppes Lemon": "🍹",
      Water: "💧",
      // Beers
      "Alfa Beer": "🍺",
    };
    return emojiMap[name] || "🍽️";
  };

  return (
    <div
      className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 cursor-pointer hover:shadow-lg hover:border-gray-600 transition-all flex flex-col justify-center gap-3"
      onClick={() => onAddToCart(product)}
    >
      <div className="text-4xl">{getEmoji(product.name)}</div>
      <h3 className="text-sm font-semibold text-white ">{product.name}</h3>
      <p className="text-[#ef4444] font-bold text-lg">
        €{product.price.toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
