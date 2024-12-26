



type Product = {
  _id: string;
  image: string;
  product_name: string;
  price: number;
  quantity?: number;
};

type CartProps = {
  cartItems: Product[];
  onRemoveFromCart: (productId: string) => void;
  onConfirmOrder: () => void;
  
};

const Cart: React.FC<CartProps> = ({ cartItems, onRemoveFromCart, onConfirmOrder }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div style={styles.cart}>
      <h2 style={styles.cartTitle}>Carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul style={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item._id} style={styles.cartItem}>
                <div>
                  <h3>{item.product_name}</h3>
                  <p>Precio: ${item.price.toFixed(2)}</p>
                  <p>Cantidad: {item.quantity || 1}</p>
                </div>
                <button onClick={() => onRemoveFromCart(item._id)}>Quitar</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={onConfirmOrder}>Confirmar Orden</button>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    gap: '12px',
  },
  image: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    objectFit: 'cover' as const,
  },
  removeButton: {
    padding: '6px 10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: 'auto',
  },
  totalContainer: {
    display: 'flex',
    justifyContent: 'center', // Centra horizontalmente
    alignItems: 'center',    // Centra verticalmente
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
    height: 'auto',
    border: 'none',
    borderRadius: '0.5em',
    cursor: 'pointer',
    textAlign: 'center' as const,
    margin: '0 auto', // Asegura que el botón esté centrado si no se usa Flexbox
  },
};


export default Cart;
