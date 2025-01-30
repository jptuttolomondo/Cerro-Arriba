import React, { useState, useEffect } from "react";
import { useDispatch } from "../redux/store/store.tsx";
import { useProductsSelector } from "../redux/selectors/Products.selectors.tsx";
import { getAllProducts } from "../redux/actions/products.actions.tsx";
import Card from "./cards.tsx";
import { Product } from "../types/product.types.tsx";
import { CardListProps } from "../types/card.types.tsx";
import { AddToCart } from "../redux/actions/carts.actions.tsx";

const CardList: React.FC<CardListProps> = () => {
  const [loading, setLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();

  const products = useProductsSelector();
  const handleAddToCart = (product: Product) => {
    return dispatch(AddToCart(product));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(getAllProducts());
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div style={cardListStyles.container}>
      <h1 style={cardListStyles.title}>Productos</h1> {/* título */}
      <div style={cardListStyles.productsSection}></div>
      {products.map((product) => (
        <div
          key={product._id}
          style={cardListStyles.wrapper}
          onClick={() => setActiveProduct(product)}
        >
          <Card
            image={product.image}
            name={product.product_name}
            price={product.price}
          />
        </div>
      ))}
      {activeProduct && (
        <div
          style={cardListStyles.overlay}
          onClick={() => setActiveProduct(null)}
        >
          <div
            style={cardListStyles.overlayContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeProduct.image}
              alt={activeProduct.product_name}
              style={cardListStyles.overlayImage}
            />
            <div style={cardListStyles.overlayDetails}>
              <h2>{activeProduct.product_name}</h2>
              <p>{activeProduct.description}</p>
              <p style={cardListStyles.price}>
                Precio: ${activeProduct.price.toFixed(2)}
              </p>
              <button
                style={cardListStyles.button}
                onClick={() => handleAddToCart(activeProduct)}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const cardListStyles = {
  container: {
    display: "flex" as const,
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#121212",
    color: "#fff",
    minHeight: "100vh",
    width: "100%",
    flexWrap: "wrap" as const,
  },
  wrapper: {
    backgroundColor: "#333",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    width: "100%",
    maxWidth: "300px",
  },
  wrapperHover: {
    transform: "scale(1.05)",
  },
  overlay: {
    position: "fixed" as const,
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  overlayContent: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    backgroundColor: "#222",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
    maxWidth: "400px",
    width: "90%",
    zIndex: 1001,
  },
  overlayImage: {
    width: "100%",
    maxHeight: "200px",
    objectFit: "cover" as const,
    marginBottom: "16px",
    borderRadius: "8px",
  },
  overlayDetails: {
    textAlign: "center" as const,
    color: "#fff",
  },
  price: {
    fontSize: "16px",
    color: "#fff",
    margin: "8px 0",
    zIndex: 1002,
  },
  button: {
    padding: "10px 20px",

    backgroundColor: "rgb(255, 228, 0)",

    color: "rgb(0 0 0)",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
  title: {
    fontSize: "24px",
    marginBottom: "16px",
    textAlign: "center" as const,
    color: "#fff",
    width: "100%",
  },
  productsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    justifyItems: "center",
  },
};

export default CardList;
