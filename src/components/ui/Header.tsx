import { LayoutDashboard, Cog, ShoppingCart, ReceiptText } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white px-6 py-2 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Point of Sales</h1>
      <nav className="flex items-center">
        <ul className="flex space-x-4 flex items-center">
          <li>
            <a href="#" className="hover:underline">
              <LayoutDashboard
                className="inline-block w-5 h-5"
                aria-label="Dashboard"
              />
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              <ShoppingCart
                className="inline-block w-5 h-5"
                aria-label="Products"
              />
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              <ReceiptText
                className="inline-block w-5 h-5"
                aria-label="Transactions"
              />
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              <Cog className="inline-block w-5 h-5" aria-label="Settings" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
