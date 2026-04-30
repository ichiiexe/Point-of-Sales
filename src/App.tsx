import { useState } from "react";
import Header from "./components/ui/Header";

function App() {
  return (
    <>
      <Header />
      <main className="p-6">
        <div>
          <button>All</button>
          <button>Wok</button>
          <button>Wok(E-Food)</button>
          <button>Drinks</button>
          <button>Beers</button>
        </div>
      </main>
    </>
  );
}

export default App;
