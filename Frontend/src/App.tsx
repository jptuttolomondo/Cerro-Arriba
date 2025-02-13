import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import CardList from "./components/cardList";
import Cart from "./components/cart";
import LandingPage from "./components/landPage";
import CartButton from "./components/CartButton";
import { Product } from "./types/product.types";

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
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div>
      {showLanding ? (
        <LandingPage onEnter={() => setShowLanding(false)} />
      ) : isMobile ? (
        <div style={styles.mobileContainer}>
          <Routes>
            <Route path="/" element={<CardList onAddToCart={handleAddToCart} />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  onRemoveFromCart={(productId: string) =>
                    setCart((prevCart) =>
                      prevCart.filter((item) => item._id !== productId)
                    )
                  }
                  onConfirmOrder={() => setCart([])}
                />
              }
            />
          </Routes>
          <CartButton itemCount={cart.length} showAddedMessage={false} />
        </div>
      ) : (
        <div style={styles.appContainer}>
          <div style={styles.productsSection}>
            <Routes>
              <Route path="/" element={<CardList onAddToCart={handleAddToCart} />} />
            </Routes>
          </div>
          <div style={styles.cartSection}>
            <Cart
              cart={cart}
              onRemoveFromCart={(productId: string) =>
                setCart((prevCart) =>
                  prevCart.filter((item) => item._id !== productId)
                )
              }
              onConfirmOrder={() => setCart([])}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  mobileContainer: {
    /*display: "flex",*/
    flexDirection: "column" as const,  // Vista vertical
    height: "100vh",
    overflowY: "auto" as const,
    position: "relative" as const,
    backgroundColor: "#f5f5f5",
  },
  appContainer: {
    display: "flex",
    flexDirection: "row" as const,
    height: "100vh",
    with:"100%"
  },
  productsSection: {
    flex: 2,
    overflowY: "auto" as const,
    backgroundColor: "#f5f5f5",
  },
  cartSection: {
    flex: 1,
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    overflowY: "auto" as const,
    borderLeft: "1px solid #444",
  },
 
};

export default App;
