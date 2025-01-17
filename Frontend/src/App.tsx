import React, { useState } from 'react';
import CardList from './components/cardList.tsx';
import Cart from './components/cart.tsx';
import OrderForm from './components/orderForm.tsx';
import { Product } from './types/types.tsx';

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.reduce((updatedCart, item) => {
        if (item._id === productId) {
          if ((item.quantity || 1) > 1) {
            updatedCart.push({ ...item, quantity: (item.quantity || 1) - 1 });
          }
        } else {
          updatedCart.push(item);
        }
        return updatedCart;
      }, [] as Product[])
    );
  };

  const handleConfirmOrder = () => {
    setShowOrderForm(true); // Muestra el formulario al confirmar la orden
  };

  
  const handleOrderSubmit = () => {
    setCart([]); // Vacía el carrito
    setShowOrderForm(false); // Regresa a la vista principal
  };



  return (
    <div style={styles.container}>
      <div style={styles.productsSection}>
        <h1 style={styles.title}>Productos</h1>
        <CardList onAddToCart={handleAddToCart} />
      </div>
      <div style={styles.cartSection}>
        {!showOrderForm ? (
          <Cart
          cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onConfirmOrder={handleConfirmOrder}
          />
        ) : (
          <OrderForm  cartItems={cart} onOrderSubmit={handleOrderSubmit}/>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
    height: '100vh',
    backgroundColor: '#121212',
    color: 'white',
    padding: '16px',
    boxSizing: 'border-box' as const,
  },
  productsSection: {
    flex: 2, // Ocupa el espacio principal
    overflowY: 'auto' as const, // Scroll si hay muchos productos
    paddingRight: '16px',
  },
  cartSection: {
    flex: 1, // Ocupa un tercio del espacio
    height: '90vh',
    position: 'sticky' as const,
    top: '0',
  },
  title: {
    fontSize: '24px',
    marginBottom: '16px',
    textAlign: 'center' as const,
  },
};

export default App;