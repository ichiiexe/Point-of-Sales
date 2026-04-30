import Header from "./components/ui/Header";
import { products } from "./Data/Products";

function App() {
  return (
    <div className="min-h-screen bg-stone-800">
      <Header />
      <main className="p-6">
        <div>
          <button>All</button>
          <button>Wok</button>
          <button>Wok(E-Food)</button>
          <button>Drinks</button>
          <button>Beers</button>
        </div>
        <div>
          {products.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
