import { FC } from 'react';
import { Product } from '../types/product.types.tsx';
import {CartItem, CartProps} from '../redux/types_redux/interfaces.tsx';
import { useCartSelectorProducts,useCartSelectorTotalPrice } from '../redux/selectors/Carts.selectors.tsx';
import { useDispatch } from "../redux/store/store.tsx";
import { AddToCart,lessToCart,outToCart} from '../redux/actions/carts.actions.tsx';

//import { useNavigate } from 'react-router-dom';
//import Navigation from './navigation.tsx'
import { useState } from 'react'; // Importa el hook useState
import OrderForm from './orderForm.tsx';

const Cart: FC<CartProps> = () => {
  const cartUpdated: CartItem[] = useCartSelectorProducts() as CartItem[];
  const totalPrice = useCartSelectorTotalPrice();
  const dispatch = useDispatch();

  // Estado para controlar la visualización del formulario de confirmación
  const [isOrderFormVisible, setOrderFormVisible] = useState(false);

  const handleIncreaseQuantity = (productId: string) => {
    const productToIncrease = cartUpdated.find((prod) => prod._id === productId);
    if (!productToIncrease) return;
    dispatch(AddToCart(productToIncrease as Product));
  };

  const handleDecreaseQuantity = (productId: string) => {
    const productToDecrease = cartUpdated.find((prod) => prod._id === productId);
    if (!productToDecrease) return;
    dispatch(lessToCart(productToDecrease as Product));
  };

  const handleRemoveFromCart = (productId: string) => {
    const productToDelete = cartUpdated.find((prod) => prod._id === productId);
    if (!productToDelete) return;
    dispatch(outToCart(productToDelete as Product));
  };

  const handleConfirmOrder = () => {
    console.log(cartUpdated);
    console.log(totalPrice);
    setOrderFormVisible(true); // Muestra el formulario al confirmar
  };

  const handleOrderSubmit = () => {
    console.log('Orden confirmada:', cartUpdated, totalPrice);
    // Lógica adicional para enviar la orden
  };

  return (
    <div style={styles.cart}>
      {isOrderFormVisible ? ( // Verifica si debe mostrarse el formulario
          <OrderForm
          cartItems={cartUpdated}
          totalPrice={totalPrice}
          onOrderSubmit={handleOrderSubmit} // Aquí pasamos la función requerida
        />
      ) : (
        <>
          <h2 style={styles.cartTitle}>Carrito de Compras</h2>
          {cartUpdated.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <>
              <ul style={styles.cartList}>
                {cartUpdated.map((item) => (
                  <li key={item._id} style={styles.cartItem}>
                    <h3>{item.product_name}</h3>
                    <p>Precio: ${item.price.toFixed(2)}</p>
                    <p>Cantidad: {item.quantity || 1}</p>
                    <div style={styles.quantityControls}>
                      <button
                        style={styles.confirmButton}
                        onClick={() => handleIncreaseQuantity(item._id)}
                      >
                        +
                      </button>
                      <button
                        style={styles.confirmButton}
                        onClick={() => handleDecreaseQuantity(item._id)}
                      >
                        -
                      </button>
                    </div>
                    <button
                      style={styles.removeButton}
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
              <button style={styles.confirmButton} onClick={handleConfirmOrder}>
                Confirmar Orden
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};


const styles = {
  cart: {
    width: '100%',
    height: '100%', // Ajusta la altura al contenedor padre
    backgroundColor: '#333',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    overflowY: 'auto' as const, // Scroll interno
    color: '#fff',
    borderRadius: '8px',
  },
  cartTitle: {
    fontSize: '20px',
    fontWeight: 'bold' as const,
    color: '#fff',
    textAlign: 'center' as const,
  },
  cartListContainer: {
    flex: 1, // Ocupa todo el espacio disponible
    overflowY: 'auto' as const, // Scroll para la lista de productos
    padding: '8px',
    border: '1px solid #555',
    borderRadius: '4px',
    backgroundColor: '#444',
  },
  cartList: {
    listStyleType: 'none' as const,
    padding: 0,
    margin: 0,
  },
  cartItem: {
    display: 'flex',
    flexDirection: 'column' as const, // Para apilar elementos verticalmente
    alignItems: 'flex-start' as const, // Alinea los elementos al inicio
    justifyContent: 'flex-start' as const,
    gap: '12px',
    marginBottom: '16px',
    position: 'relative'as const, // Permite posicionar el botón "Quitar" de manera absoluta
  },
  image: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    objectFit: 'cover' as const,
  },
  removeButton: {
    position: 'absolute' as const, // Posición absoluta respecto al contenedor del producto
    bottom: '0', // Lo coloca al final del contenedor
    right: '16px', // Lo alinea a la derecha
    padding: '6px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'as const,
    fontSize: '14px',
  },
  totalContainer: {
    display: 'flex' as const,
    justifyContent: 'center' as const, // Centra horizontalmente
    alignItems: 'center' as const,    // Centra verticalmente
    fontSize: '1.5rem',
    fontWeight: 'bold' as const,
    marginTop: '12px',
    textAlign: 'center' as const,
  },
  confirmButton: {
    padding: '1em 2em',
    backgroundColor: 'rgb(255, 228, 0)',
    color: 'rgb(0 0 0)',
    fontSize: '1rem',
    width: '50%',
    maxWidth: '300px',
    height: 'auto' as const,
    border: 'none',
    borderRadius: '0.5em',
    cursor: 'pointer' as const,
    textAlign: 'center' as const,
    margin: '0 auto' as const, // Asegura que el botón esté centrado si no se usa Flexbox
  },

  quantityControls: {
    display: 'flex' as const,
    flexDirection: 'row' as const, // Los botones de cantidad permanecen en línea
    gap: '8px',
    marginBottom: '8px', // Da espacio debajo de los controles
  },
  controlButton: {
    padding: '0.5em 1em',
    backgroundColor: 'rgb(255, 228, 0)',
    color: 'rgb(0, 0, 0)',
    fontSize: '2 rem', // Aumenta el tamaño del texto
    fontWeight: 'bold' as const, // Opcional: para un texto más grueso
    width: '50%', // Mitad del tamaño de confirmButton
    height: '2.5rem', // Define una altura consistente
    border: 'none' as const,
    borderRadius: '0.25em',
    cursor: 'pointer' as const,
    textAlign: 'center' as const,
    display: 'flex', // Centra el texto vertical y horizontalmente
    justifyContent: 'center'as const,
    alignItems: 'center'as const,
  },
}

export default Cart;
