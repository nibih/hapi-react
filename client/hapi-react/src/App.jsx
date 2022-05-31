import { useState, useEffect } from "react";
import Card from "./Card";
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  });
  return (
    <div>
      <h1>Products</h1>
      <div className="card-container">
        {products.map((product) => (
          <Card
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
