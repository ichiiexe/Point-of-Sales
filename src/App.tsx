import { useState } from "react";
import Header from "./components/Header";
import Button from "./components/ui/Button";
import {
  categories,
  products,
  ingredients,
  Sauce,
  Toppings,
} from "./Data/Products";
import ProductCard from "./components/ui/ProductCard";
import CartSidebar from "./components/ui/CartSidebar";
import type { Product } from "./Data/Products";

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

function App() {
  const [filter, setFilter] = useState("All");
  const [activeTabId, setActiveTabId] = useState(1);
  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, name: "Tab 1", items: [] },
  ]);
  const [nextTabId, setNextTabId] = useState(2);
  const [showIngredientModal, setShowIngredientModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    if (product.category === "Wok") {
      setPendingProduct(product);
      setShowIngredientModal(true);
    } else {
      addToCartDirect(product);
    }
  };

  const addToCartDirect = (
    product: Product,
    customizations?: Omit<CartItem, keyof Product | "quantity">,
  ) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.id === activeTabId) {
          const newItem: CartItem = {
            ...product,
            quantity: 1,
            ...customizations,
          };
          return {
            ...tab,
            items: [...tab.items, newItem],
          };
        }
        return tab;
      }),
    );
  };

  const removeItemFromCart = (itemIndex: number) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.id === activeTabId) {
          return {
            ...tab,
            items: tab.items.filter((_, index) => index !== itemIndex),
          };
        }
        return tab;
      }),
    );
  };

  const clearCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear this cart?",
    );
    if (confirmed) {
      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          if (tab.id === activeTabId) {
            return {
              ...tab,
              items: [],
            };
          }
          return tab;
        }),
      );
    }
  };

  const createNewTab = () => {
    const newTab: Tab = {
      id: nextTabId,
      name: `Tab ${nextTabId}`,
      items: [],
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTabId(nextTabId);
    setNextTabId(nextTabId + 1);
  };

  const closeTab = (tabId: number) => {
    const tabToClose = tabs.find((t) => t.id === tabId);
    if (tabToClose && tabToClose.items.length > 0) {
      // Show confirmation modal
      const confirmed = window.confirm(
        `Tab ${tabId} is not completed. Are you sure you want to close it?`,
      );
      if (!confirmed) return;
    }
    const newTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId && newTabs.length > 0) {
      setActiveTabId(newTabs[0].id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="p-6 flex gap-6">
        <div className="flex-1 flex flex-col gap-4">
          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                active={filter === category}
                onClick={() => setFilter(category)}
              >
                {category === "All" && "✓"}
                {category === "Wok" && "🍽️"}
                {category === "E-Food" && "🛵"}
                {category === "Drinks" && "🥤"}
                {category === "Beers" && "🍺"}
                {category}
              </Button>
            ))}
            <button className="ml-auto bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2 font-medium transition-colors">
              Deliveries
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-4 gap-3">
            {products
              .filter(
                (product) => filter === "All" || product.category === filter,
              )
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
          </div>
        </div>
        <CartSidebar
          tabs={tabs}
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
          onCreateTab={createNewTab}
          onCloseTab={closeTab}
          onClearCart={clearCart}
          onAddToCart={addToCartDirect}
          pendingProduct={pendingProduct}
          RemoveItem={removeItemFromCart}
        />
      </main>
    </div>
  );
}

export default App;
