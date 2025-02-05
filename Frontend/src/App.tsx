import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CardList from "./components/cardList.tsx";
import Cart from "./components/cart.tsx";
import { Product } from "./types/product.types.tsx";
import LandingPage from "./components/landPage.tsx"

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [showLanding, setShowLanding] = useState(true);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div>
    {showLanding ? (
     <LandingPage onEnter={() => setShowLanding(false)} />
    ) :(

    <div style={styles.appContainer}>
      {/* Sección de productos */}
      <div style={styles.productsSection}>
        <Routes>
          <Route
            path="/"
            element={<CardList onAddToCart={handleAddToCart} />}
          />
        </Routes>
      </div>

      {/* Sección del carrito */}
      <div style={styles.cartSection}>
        <Cart
          cart={cart}
          onRemoveFromCart={(productId: string) =>
            setCart((prevCart) =>
              prevCart.filter((item) => item._id !== productId),
            )
          }
          onConfirmOrder={() => setCart([])} // Limpiar carrito al confirmar orden
        />
      </div>
    </div>
    )
    }
      </div>
  );
};

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "row" as const,
    height: "100vh", // Altura de la pantalla completa
  },
  productsSection: {
    flex: 2, // Toma 2/3 del ancho disponible
    /* padding: "20px",*/
    overflowY: "auto" as const, // Scroll si el contenido es demasiado largo
    backgroundColor: "#f5f5f5",
  },
  cartSection: {
    flex: 1, // Toma 1/3 del ancho disponible
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo oscuro para diferenciar del contenido
    color: "#fff",
    overflowY: "auto" as const, // Scroll interno
    borderLeft: "1px solid #444", // Línea separadora
  },
};

export default App;
