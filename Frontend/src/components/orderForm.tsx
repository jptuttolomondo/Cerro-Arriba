import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { Product } from '../types/product.types.tsx';


type OrderFormProps = {
  cartItems: Product[];
  onOrderSubmit: () => void;
};
const OrderForm: React.FC<OrderFormProps> =({ cartItems }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    whatsapp: '',
    deliveryTime: '',
    paymentMethod: 'cash',
  });  

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  const orderData = {
    userDetails: formData,
    cartItems,
    total: cartItems.reduce((sum, item) => sum + item.price * (item.quantity||0), 0),
  };
  console.log('Orden enviada:', orderData);

  Swal.fire({
    title: 'Orden enviada con éxito',
    text: 'Te hemos redirigido al inicio',
    icon: 'success',
    confirmButtonColor: 'rgb(255, 228, 0)',
  }).then(() => {
    navigate('/'); // Redirige al path principal
  });
};

  

  return (
    <div style={styles.container}>
      <h2>Formulario de Orden</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.cartSummary}>
          <h3>Productos en el carrito:</h3>
          <ul style={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item._id}>
                {item.product_name} - {item.quantity} x ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          
        </div>

        <div style={styles.field}>
          <label>Nombre:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div style={styles.field}>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div style={styles.field}>
          <label>Ubicación:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div style={styles.field}>
          <label>Número de WhatsApp:</label>
          <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required />
        </div>
        <div style={styles.field}>
          <label>Horario de entrega:</label>
          <input type="text" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} required />
        </div>
        <div style={styles.field}>
          <label>Medio de pago:</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
            <option value="cash">Efectivo</option>
            <option value="transfer">Transferencia</option>
            <option value="credit_card">Tarjeta de crédito</option>
          </select>
        </div>
        <button type="submit" style={styles.submitButton}>Enviar Orden</button>
      </form>
    </div>
  );
}
const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  cartSummary: {
    marginBottom: '16px',
  },
  cartList: {
    listStyle: 'none' as const,
    padding: 0,
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '5px',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: 'rgb(255, 228, 0)',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};


export default OrderForm;