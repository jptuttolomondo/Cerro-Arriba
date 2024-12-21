import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
const OrderForm: React.FC = () => {
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

    //postear la orden 
    console.log('Orden enviada:', formData);
  //  alert('¡Orden enviada!');

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