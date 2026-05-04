import { ShoppingCart, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { Product, Ingredient } from "../../Data/Products";

interface SelectedIngredient {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
  selectedIngredients?: SelectedIngredient[];
  selectedSauce?: string;
  selectedToppings?: SelectedIngredient[];
}

interface Tab {
  id: number;
  name: string;
  items: CartItem[];
}

type CartSidebarProps = {
  tabs: Tab[];
  activeTabId: number;
  onTabChange: (tabId: number) => void;
  onCreateTab: () => void;
  onCloseTab: (tabId: number) => void;
  onRemoveItem: (itemIndex: number) => void;
  onClearCart: () => void;
  ingredients: Ingredient[];
  sauces: Array<{ id: number; name: string }>;
  toppings: Array<{ id: number; name: string }>;
  showIngredientModal: boolean;
  pendingProduct: Product | null;
  onIngredientModalClose: () => void;
  onAddToCart: (product: Product, customizations?: any) => void;
};

const CartSidebar = ({
  tabs,
  activeTabId,
  onTabChange,
  onCreateTab,
  onCloseTab,
  onRemoveItem,
  onClearCart,
  ingredients,
  sauces,
  toppings,
  showIngredientModal,
  pendingProduct,
  onIngredientModalClose,
  onAddToCart,
}: CartSidebarProps) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);
  const [selectedSauce, setSelectedSauce] = useState("");
  const [selectedToppings, setSelectedToppings] = useState<SelectedIngredient[]>([]);

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const subtotal = activeTab
    ? activeTab.items.reduce((sum, item) => {
        const ingredientsPrice = (item.selectedIngredients || []).reduce((s, i) => s + i.price, 0);
        const toppingsPrice = (item.selectedToppings || []).reduce((s, i) => s + i.price, 0);
        return sum + (item.price + ingredientsPrice + toppingsPrice) * item.quantity;
      }, 0)
    : 0;
  const total = subtotal;

  const handleAddIngredients = () => {
    if (pendingProduct) {
      onAddToCart(pendingProduct, {
        selectedIngredients,
        selectedSauce,
        selectedToppings,
      });
      setSelectedIngredients([]);
      setSelectedSauce("");
      setSelectedToppings([]);
      onIngredientModalClose();
    }
  };

  const toggleIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) =>
      prev.some((i) => i.id === ingredient.id)
        ? prev.filter((i) => i.id !== ingredient.id)
        : [...prev, { id: ingredient.id, name: ingredient.name, price: ingredient.price }]
    );
  };

  const toggleTopping = (topping: { id: number; name: string }) => {
    setSelectedToppings((prev) =>
      prev.some((i) => i.id === topping.id)
        ? prev.filter((i) => i.id !== topping.id)
        : [...prev, { id: topping.id, name: topping.name, price: 0 }]
    );
  };

  return (
    <>
      <div className="w-80">
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 h-full flex flex-col">
          {/* Tab Header */}
          <div className="border-b border-gray-700 flex items-center gap-1 p-2 bg-gray-900 overflow-x-auto">
            {/* Existing Tabs */}
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-t-md transition-colors whitespace-nowrap cursor-pointer ${activeTabId === tab.id ? "bg-gray-800 text-white" : "bg-gray-700 text-gray-400 hover:bg-gray-600"}`}
                onClick={() => onTabChange(tab.id)}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.name}</span>
                {/* Only show X for non-first tabs */}
                {tab.id !== 1 && (
                  <button
                    className="hover:text-white transition-colors ml-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(tab.id);
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {/* New Tab Button */}
            <button
              className="px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-t-md transition-colors text-sm font-medium whitespace-nowrap"
              onClick={onCreateTab}
            >
              + New
            </button>
          </div>

          {/* Order Type */}
          <div className="p-4 border-b border-gray-700 flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-medium">ORDER TYPE</label>
            <button className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white py-2 rounded-md font-medium transition-colors">
              🏪 Dine-in
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md font-medium transition-colors">
              🛍️ Takeaway
            </button>
          </div>

          {/* Other Options */}
          <div className="p-4 border-b border-gray-700 flex flex-col gap-2">
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md font-medium transition-colors text-sm">
              👨‍💼 Normal
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md font-medium transition-colors text-sm">
              📦 Staff Food
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md font-medium transition-colors text-sm">
              🏪 Filoseria
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab && activeTab.items.length > 0 ? (
              <div className="flex flex-col gap-3">
                {activeTab.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{item.name}</p>
                      {item.selectedIngredients && item.selectedIngredients.length > 0 && (
                        <p className="text-gray-400 text-xs">
                          + {item.selectedIngredients.map((i) => i.name).join(", ")}
                        </p>
                      )}
                      <p className="text-gray-400 text-xs">
                        {item.quantity}x €{item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#ef4444] font-bold text-sm">
                        €{((item.price + (item.selectedIngredients || []).reduce((s, i) => s + i.price, 0)) * item.quantity).toFixed(2)}
                      </p>
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors mt-1"
                        onClick={() => onRemoveItem(index)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-gray-500 text-center">
                  <div className="text-4xl mb-2">🛒</div>
                  <p className="text-sm">Cart is empty</p>
                </div>
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="border-t border-gray-700 p-4 flex flex-col gap-3">
            <div className="flex justify-between text-gray-400 text-sm">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-700">
              <span>Total</span>
              <span>€{total.toFixed(2)}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md font-medium transition-colors text-sm"
                onClick={onClearCart}
              >
                Clear
              </button>
              <button
                className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white py-2 rounded-md font-medium transition-colors text-sm"
                onClick={() => setShowPaymentModal(true)}
              >
                Pay €{total.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredient Modal */}
      {showIngredientModal && pendingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">{pendingProduct.name}</h2>
              <button
                onClick={onIngredientModalClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ingredients */}
            <div className="mb-4">
              <h3 className="text-gray-300 font-semibold text-sm mb-2">Ingredients</h3>
              <div className="flex flex-col gap-2">
                {ingredients.map((ingredient) => (
                  <label key={ingredient.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedIngredients.some((i) => i.id === ingredient.id)}
                      onChange={() => toggleIngredient(ingredient)}
                      className="rounded"
                    />
                    <span className="text-gray-300 text-sm flex-1">{ingredient.name}</span>
                    <span className="text-gray-400 text-xs">+€{ingredient.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sauce */}
            <div className="mb-4">
              <h3 className="text-gray-300 font-semibold text-sm mb-2">Sauce</h3>
              <select
                value={selectedSauce}
                onChange={(e) => setSelectedSauce(e.target.value)}
                className="w-full bg-gray-700 text-white p-2 rounded-md text-sm"
              >
                <option value="">Select sauce</option>
                {sauces.map((sauce) => (
                  <option key={sauce.id} value={sauce.name}>
                    {sauce.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Toppings */}
            <div className="mb-4">
              <h3 className="text-gray-300 font-semibold text-sm mb-2">Toppings</h3>
              <div className="flex flex-col gap-2">
                {toppings.map((topping) => (
                  <label key={topping.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedToppings.some((i) => i.id === topping.id)}
                      onChange={() => toggleTopping(topping)}
                      className="rounded"
                    />
                    <span className="text-gray-300 text-sm">{topping.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-gray-700">
              <button
                onClick={onIngredientModalClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddIngredients}
                className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white py-2 rounded-md font-medium transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">Select Payment Method</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="text-gray-300 mb-6 pb-4 border-b border-gray-700">
                <p className="text-sm">Total Amount</p>
                <p className="text-2xl font-bold text-[#ef4444]">€{total.toFixed(2)}</p>
              </div>

              <button className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
                💵 Cash
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
                💳 Debit/Credit Card
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
                📱 IRIS
              </button>
            </div>

            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};


export default CartSidebar;
