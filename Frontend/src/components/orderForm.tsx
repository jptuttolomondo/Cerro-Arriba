import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { CartItem } from "../types/cart.types.tsx";
import botonSwal from "../styles/swal.module.css";
import styles from "../styles/orderForm.module.css";
import { postToOrder, OrderSendByWhatsapp } from "../redux/actions/order.actions.ts";
import { useDispatch } from "../redux/store/store.tsx";

type OrderFormProps = {
  cartItems: CartItem[];
  totalPrice: number;
  onOrderSubmit: () => void;
};
const OrderForm: React.FC<OrderFormProps> = ({
  cartItems,
  totalPrice,
  onOrderSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    whatsapp: "",
    deliveryTime: "",
    paymentMethod: "cash",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      userDetails: formData,
      cartItems,
      totalPrice: totalPrice,
    };
    console.log("Orden enviada:", orderData);
    dispatch(postToOrder(orderData));
    
    dispatch(OrderSendByWhatsapp(orderData));

    //armar el post de ticket

    Swal.fire({
      title: `Hola ${formData.name}, Muchas Gracias!`,
      text: `Recibiras un mensaje de whatsapp al número ${formData.whatsapp} para coordinar la entrega!`,
      icon: "success",
      confirmButtonColor: "rgb(255, 228, 0)",
      confirmButtonText: "Volver al inicio",

      customClass: {
        confirmButton: botonSwal.customSwalButton,
      },
    }).then(() => {
      navigate("/"); // Redirige al path principal
    });
  };

  return (
    <div className={styles.container}>
      <h2>Datos para entregar tu pedido!</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.cartSummary}>
          <h3>Tu pedido:</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Cantidad</th>
                <th className={styles.tableHeader}>Item</th>
                <th className={styles.tableHeader}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{item.quantity}</td>
                  <td className={styles.tableCell}>{item.product_name}</td>
                  <td className={styles.tableCell}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.total}>
            <span className={styles.totalHighlight}>
              Total : {`${totalPrice.toFixed(2)}`}
            </span>
          </div>
        </div>

        <div className={styles.field}>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Ubicación:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Número de WhatsApp:</label>
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Horario de entrega:</label>
          <input
            type="text"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label>Medio de pago:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="cash">Efectivo</option>
            <option value="transfer">Transferencia</option>
            <option value="credit_card">Tarjeta de crédito</option>
          </select>
        </div>

        <button
          type="submit"
          className={styles.submitButton1}
          onClick={onOrderSubmit}
        >
          Enviar Orden
        </button>
      </form>
    </div>
  );
};
// const styles = {
//   container: {
//     padding: '20px',
//     maxWidth: '500px',
//     margin: '0 auto',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column' as const,
//     gap: '10px',
//   },
//   cartSummary: {
//     marginBottom: '16px',
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse' as const,
//   },
//   tableHeader: {
//     backgroundColor: 'rgb(255, 228, 0)',
//     color:'black',
//     fontWeight: 'bold' as const,
//     textAlign: 'center' as const,
//     padding: '8px',
//     borderBottom: '2px solid #ddd',
//     borderRadius: '4px',
//   },  tableRow: {
//     borderBottom: '1px solid #ddd',
//   },
//   tableCell: {
//     padding: '8px',
//     textAlign: 'left' as const,
//   },
//   field: {
//     display: 'flex',
//     flexDirection: 'column' as const,
//     gap: '5px',
//   },
//   total: {
//     marginTop: '16px',
//     textAlign: 'right' as const,
//     fontWeight: 'bold' as const,
//     fontSize: '16px',
//   },

//   totalHighlight: {
//     backgroundColor: 'rgb(255, 228, 0)',
//     color: 'black',
//     padding: '2px 4px',
//     borderRadius: '4px',
//   },
//   submitButton: {
//     padding: '10px',
//     backgroundColor: 'rgb(255, 228, 0)',
//     color: 'black',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//   },

// };

export default OrderForm;
