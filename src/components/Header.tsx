import { BarChart3, LayoutDashboard, Cog } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [activeShift, setActiveShift] = useState("Shift 1");

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">Streetwok</span>
      </div>

      <nav className="flex items-center gap-6">
        <div className="flex gap-1">
          <button
            className={`text-sm px-4 py-2 transition-colors rounded-l-md font-medium ${activeShift === "Shift 1" ? "bg-[#ef4444]" : "bg-gray-700"}`}
            onClick={() => setActiveShift("Shift 1")}
          >
            Shift 1
          </button>
          <button
            className={`text-sm px-4 py-2 transition-colors rounded-r-md font-medium ${activeShift === "Shift 2" ? "bg-[#ef4444]" : "bg-gray-700"}`}
            onClick={() => setActiveShift("Shift 2")}
          >
            Shift 2
          </button>
        </div>

        <div className="flex gap-3">
          <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-2 rounded-md flex items-center gap-2 font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2 font-medium transition-colors">
            <BarChart3 className="w-5 h-5" />
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2 font-medium transition-colors">
            <Cog className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
