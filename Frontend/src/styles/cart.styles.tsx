export const cartStyles = {
  // Contenedor general del carrito
  cart: {
    height: "100%",
    backgroundColor: "#121212",
    padding: "1rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    overflowY: "auto" as const,
    color: "#fff",
    borderRadius: "0.7rem",
    border: "0.0625rem solid rgba(195, 46, 46, 0.1)",
    boxShadow: "0 0.40rem 0.8rem rgba(195, 46, 46, 0.1)",
  },
  cartTitle: {
    padding: "1rem",
    fontSize: "2rem", // Ajusta según convenga
    fontWeight: "bold" as const,
    color: "#fff",
    textAlign: "center" as const,
  },
  cartListContainer: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "0.5rem",
    border: "0.0625rem solid #555",
    borderRadius: "0.25rem",
    backgroundColor: "#444",
  },
  cartList: {
    listStyleType: "none" as const,
    padding: 0,
    margin: 0,
  },
  // Cada ítem del carrito se muestra como una "tarjeta"
  cartItem: {
    backgroundColor: "rgba(160, 162, 127, 0.1)",
    borderRadius: "0.5rem",
    boxShadow: "0 0.5rem 0.5rem rgba(195, 46, 46, 0.1)",
    padding: "1rem",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start" as const,
    fontSize: "1.25rem",
    position: "relative" as const,
  },
  // Reducir el espacio entre el nombre y el precio
  productName: {
    marginBottom: "0.25rem",
  },
  price: {
    marginTop: "0.25rem",
    fontSize: "1.2rem",
    color: "#fff",
  },
  image: {
    width: "3.75rem", // 60px
    height: "3.75rem",
    borderRadius: "0.5rem",
    objectFit: "cover" as const,
  },
  // Contenedor para la sección de cantidad (etiqueta, valor y botones)
  quantityControls: {
    display: "flex" as const,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    width: "100%",
    marginTop: "0.5rem",
  },
  // Etiqueta "Cantidad:"
  quantityLabel: {
    fontSize: "1.2rem",
    marginRight: "0.5rem",
  },
  // Valor de la cantidad
  quantityValue: {
    fontSize: "1.2rem",
    minWidth: "2rem",
    textAlign: "center" as const,
    marginRight: "1rem",
  },
  // Contenedor para los botones + y -
  quantityButtons: {
    display: "flex" as const,
    gap: "1rem", // Aumenta la separación entre los botones
  },
  // Botones de control (+ y -)
  controlButton: {
    backgroundColor: "rgba(247, 195, 6, 0.82)",
    color: "rgb(0, 0, 0)",
    padding:"0.2rem 0.5rem",
    fontSize: "1.5rem", // Sin espacios ("2rem")
    fontWeight: "bold" as const,
    width: "2rem",
    height: "2.5rem",
    border: "none" as const,
    borderRadius: "0.25em",
    cursor: "pointer" as const,
    display: "flex",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  // Botón "Quitar" se coloca en una línea aparte
  removeButton: {
    marginTop: "1rem", // Separa el botón del final del ítem
    alignSelf: "flex-end" as const,
    padding: "0.6rem 0.8rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "0.25rem",
    cursor: "pointer" as const,
    fontSize: "0.875rem",
  },
  totalContainer: {
    display: "flex" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    fontSize: "1.5rem",
    fontWeight: "bold" as const,
    marginTop: "0.75rem",
    textAlign: "center" as const,
  },
  confirmButton: {
    padding: "1em 2em",
    backgroundColor: "rgba(247, 195, 6, 0.82)",
    color: "rgb(0 0 0)",
    fontSize: "1.2rem",
    fontWeight: "bold" as const,
    width: "50%",
    maxWidth: "18.75rem",
    height: "auto" as const,
    border: "none",
    borderRadius: "0.5em",
    cursor: "pointer" as const,
    textAlign: "center" as const,
    margin: "0 auto" as const,
  },
};
