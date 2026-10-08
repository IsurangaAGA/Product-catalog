import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async () => {

    try {
      setLoading(true);

      const response = await fetch(
        "https://dummyjson.com/products?page=1&limit=10"
      );

      if (!response.ok) {
        throw new Error("Failed to get products");
      }

      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      setError("Could not load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <h2>Loading..</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <button onClick={getProducts}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Product Catalog</h1>

      <div className="grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />

            <div className="card-body">
              <p className="brand">{product.brand}</p>

              <h2 className="title">{product.title}</h2>

              <div className="price-row">
                <span className="price">
                  ${product.price.toFixed(2)}
                </span>

                <span className="rating">
                  *{product.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

