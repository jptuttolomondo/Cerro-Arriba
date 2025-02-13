import { FC } from "react";
import { Product } from "../types/product.types.tsx";
import { CartItem, CartProps } from "../redux/types_redux/interfaces.tsx";
import {
  useCartSelectorProducts,
  useCartSelectorTotalPrice,
} from "../redux/selectors/Carts.selectors.tsx";
import { useDispatch } from "../redux/store/store.tsx";
import {
  AddToCart,
  lessToCart,
  outToCart,
} from "../redux/actions/carts.actions.tsx";

//import { useNavigate } from 'react-router-dom';
//import Navigation from './navigation.tsx'
import { useState } from "react"; // Importa el hook useState
import OrderForm from "./orderForm.tsx";
import { cartStyles  } from "../styles/cart.styles.tsx"


const Cart: FC<CartProps> = () => {
  const cartUpdated: CartItem[] = useCartSelectorProducts() as CartItem[];
  const totalPrice = useCartSelectorTotalPrice();
  const dispatch = useDispatch();

  // Estado para controlar la visualización del formulario de confirmación
  const [isOrderFormVisible, setOrderFormVisible] = useState(false);

  const handleIncreaseQuantity = (productId: string) => {
    const productToIncrease = cartUpdated.find(
      (prod) => prod._id === productId,
    );
    if (!productToIncrease) return;
    dispatch(AddToCart(productToIncrease as Product));
  };

  const handleDecreaseQuantity = (productId: string) => {
    const productToDecrease = cartUpdated.find(
      (prod) => prod._id === productId,
    );
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
    console.log("Orden confirmada:", cartUpdated, totalPrice);
    // Lógica adicional para enviar la orden
  };

  return (
    <div style={cartStyles.cart}>
      {isOrderFormVisible ? ( // Verifica si debe mostrarse el formulario
        <OrderForm
          cartItems={cartUpdated}
          totalPrice={totalPrice}
          onOrderSubmit={handleOrderSubmit} // Aquí pasamos la función requerida
        />
      ) : (
        <>
          <h2 style={cartStyles.cartTitle}>Carrito de Compras</h2>
          {cartUpdated.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <>
              <ul style={cartStyles.cartList}>
                {cartUpdated.map((item) => (
                 <li key={item._id} style={cartStyles.cartItem}>
                 <div style={cartStyles.productName}>{item.product_name}</div>
                 <div style={cartStyles.price}>Precio: ${item.price.toFixed(2)}</div>
               
                 <div style={cartStyles.quantityControls}>
                   <span style={cartStyles.quantityLabel}>Cantidad:</span>
                   <span style={cartStyles.quantityLabel}>{item.quantity || 1}</span>
                   <div style={cartStyles.quantityButtons}>
                     <button
                       style={cartStyles.controlButton}
                       onClick={() => handleIncreaseQuantity(item._id)}
                     >
                       +
                     </button>
                     <button
                       style={cartStyles.controlButton}
                       onClick={() => handleDecreaseQuantity(item._id)}
                     >
                       -
                     </button>
                   </div>
                 </div>
               
                 <button
                   style={cartStyles.removeButton}
                   onClick={() => handleRemoveFromCart(item._id)}
                 >
                   Quitar
                 </button>
               </li>
                ))}
              </ul>

          
              <div style={cartStyles.quantityLabel}>Total: ${totalPrice.toFixed(2)}</div>
              <button style={cartStyles.confirmButton} onClick={handleConfirmOrder}>
                Confirmar Pedido
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};


export default Cart;
