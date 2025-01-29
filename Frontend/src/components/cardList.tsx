import React, { useState, useEffect } from "react";
import { useDispatch } from "../redux/store/store.tsx";
import { useProductsSelector } from "../redux/selectors/Products.selectors.tsx";
import { getAllProducts } from "../redux/actions/products.actions.tsx";
import Card from "./cards.tsx";
import { Product } from "../types/product.types.tsx";
import { CardListProps } from "../types/card.types.tsx";
import { AddToCart } from "../redux/actions/carts.actions.tsx";
//import { CartItem } from "../redux/types_redux/interfaces.tsx";
//import { CartProps } from "../redux/types_redux/interfaces.tsx";

const CardList: React.FC<CardListProps> = () => {
  const [loading, setLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();

  const products = useProductsSelector();
  const handleAddToCart= (product:Product)=>{

      return dispatch(AddToCart(product)); // Aquí puedes pasar el producto al carrito usando el dispatch
    

  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(getAllProducts());
     
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div style={cardListStyles.container}>
      <h1 style={cardListStyles.title}>Productos</h1> {/* Mueve aquí el título */}
         <div style={cardListStyles.productsSection}>
          </div>
            
      {products.map((product) => (
        <div
          key={product._id}
          style={cardListStyles.wrapper}
          onClick={() => setActiveProduct(product)} // Mostrar overlay solo en clic
        >
          <Card
            image={product.image}
            name={product.product_name}
            price={product.price}
          />
        </div>
      ))}

      {/* Overlay controlado por el estado */}
      {activeProduct && (
        <div
          style={cardListStyles.overlay}
          onClick={() => setActiveProduct(null)} // Cerrar overlay al hacer clic fuera
        >
          <div
            style={cardListStyles.overlayContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeProduct.image}
              alt={activeProduct.product_name}
              style={cardListStyles.overlayImage}
            />
            <div style={cardListStyles.overlayDetails}>
              <h2>{activeProduct.product_name}</h2>
              <p>{activeProduct.description}</p>
              <p style={cardListStyles.price}>
                Precio: ${activeProduct.price.toFixed(2)}
              </p>
              <button
                style={cardListStyles.button}
                onClick={() => handleAddToCart(activeProduct)}
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const cardListStyles = {
  container: {
    display: "flex" as const,
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#121212",
    color: "#fff",
    minHeight: "100vh",
    width: "100%", // Asegura que ocupe todo el ancho disponible
  flexWrap:"wrap"as const
    
  },
  wrapper: {
    backgroundColor: "#333",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    width: "100%", // Permite que se adapten al ancho de la columna
    maxWidth: "300px", // Límite opcional
    
  },
  wrapperHover: {
    transform: "scale(1.05)", // Efecto al pasar el mouse
  },
  overlay: {
    position: "fixed" as const,
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo oscuro para el overlay
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  overlayContent: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    backgroundColor: "#222", // Fondo más oscuro para el contenido
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
    maxWidth: "400px",
    width: "90%",
    zIndex: 1001 // Aseguramos que el contenido del overlay esté encima
  },
  overlayImage: {
    width: "100%",
    maxHeight: "200px",
    objectFit: "cover" as const,
    marginBottom: "16px",
    borderRadius: "8px"
  },
  overlayDetails: {
    textAlign: "center" as const,
    color: "#fff" // Aseguramos que el texto en el overlay sea blanco
  },
  price: {
    fontSize: "16px",
    color: "#fff", // Aseguramos que el precio sea blanco
    margin: "8px 0",
    zIndex: 1002 // Aseguramos que el precio esté por encima de otros elementos
  },
  button: {
    padding: "10px 20px",
    //backgroundColor: '#007bff', // Botón azul
    backgroundColor: "rgb(255, 228, 0)",
    // color: '#fff',
    color: "rgb(0 0 0)",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#0056b3" // Cambio de color en hover
    }
  },
  title: {
    fontSize: "24px",
    marginBottom: "16px",
    textAlign: "center" as const,
    color: "#fff",
    width: "100%", // Asegura que no afecte el ancho del contenedor
  },
  productsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Filas automáticas
    gap: "16px", // Espaciado entre tarjetas
    width: "100%",
    maxWidth: "1200px", // Limitar el ancho total si es necesario
    margin: "0 auto", // Centra horizontalmente el contenedor
    padding: "20px", // Espaciado interno
    justifyItems: "center", // Opcional: Centra tarjetas en cada columna
  },
};

export default CardList;
