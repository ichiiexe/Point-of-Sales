import { ShoppingCart, Trash2 } from "lucide-react";
import type { Product } from "../../Data/Products";

interface CartItem extends Product {
  quantity: number;
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
  RemoveItem: (itemId: number) => void;
  onClearCart: () => void;
  pendingProduct: Product | null;
  onAddToCart: (product: Product) => void;
};

const CartSidebar = ({
  tabs,
  activeTabId,
  onTabChange,
  onCreateTab,
  onCloseTab,
  RemoveItem,
  onClearCart,
  pendingProduct,
}: CartSidebarProps) => {
  const activeTab = tabs.find((t) => t.id === activeTabId);
  const subtotal = activeTab
    ? activeTab.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;
  const total = subtotal;

  return (
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

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab && activeTab.items.length > 0 ? (
            <div className="flex flex-col gap-3">
              {activeTab.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-700 p-3 rounded-md"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">
                      {item.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {item.quantity}x €{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#ef4444] font-bold">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="text-gray-400 hover:text-red-500 transition-colors mt-1"
                      onClick={() => RemoveItem(item.id)}
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
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
function RemoveItem(itemId: number) {
  throw new Error("Function not implemented.");
}
