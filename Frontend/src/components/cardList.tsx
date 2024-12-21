import React, { useState, useEffect } from 'react';
import Card from './cards.tsx';
import axios from 'axios';

type Product = {
  _id: string;
  image: string;
  product_name: string;
  price: number;
  description: string;
};

type CardListProps = {
  onAddToCart: (product: Product) => void;
};

const CardList: React.FC<CardListProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div style={cardListStyles.container}>
      {products.map((product) => (
        <div
          key={product._id}
          style={cardListStyles.wrapper}
          onClick={() => setActiveProduct(product)} // Mostrar overlay solo en clic
        >
          <Card image={product.image} name={product.product_name} price={product.price} />
        </div>
      ))}

      {/* Overlay controlado por el estado */}
      {activeProduct && (
        <div
          style={cardListStyles.overlay}
          onClick={() => setActiveProduct(null)} // Cerrar overlay al hacer clic fuera
        >
          <div style={cardListStyles.overlayContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={activeProduct.image}
              alt={activeProduct.product_name}
              style={cardListStyles.overlayImage}
            />
            <div style={cardListStyles.overlayDetails}>
              <h2>{activeProduct.product_name}</h2>
              <p>{activeProduct.description}</p>
              <p style={cardListStyles.price}>Precio: ${activeProduct.price.toFixed(2)}</p>
              <button
                style={cardListStyles.button}
                onClick={() => onAddToCart(activeProduct)}
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
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    marginTop: '20px',
    backgroundColor: '#121212', // Fondo oscuro para el contenedor
    color: '#fff', // Texto blanco para el contenedor
    padding: '20px',
    maxHeight: '500px', // Altura máxima del contenedor
    overflowY: 'auto' as const, // Habilita el desplazamiento vertical
    border: '1px solid #444', // Opcional: Bordes para el contenedor
    borderRadius: '8px', // Opcional: Bordes redondeados
  },
  wrapper: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '250px',
    backgroundColor: '#333',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
  },
  // container: {
  //   display: 'flex',
  //   gap: '16px',
  //   flexWrap: 'wrap' as const,
  //   justifyContent: 'center',
  //   marginTop: '20px',
  //   backgroundColor: '#121212', // Fondo oscuro para el contenedor
  //   color: '#fff', // Texto blanco para el contenedor
  //   padding: '20px',
    
  // },
  // wrapper: {
  //   position: 'relative' as const,
  //   width: '100%',
  //   maxWidth: '250px',
  //   backgroundColor: '#333', // Fondo más oscuro para cada tarjeta
  //   borderRadius: '8px',
  //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra más suave
  //   overflow: 'hidden',
  //   cursor: 'pointer',
  //   transition: 'transform 0.3s ease-in-out', // Efecto de hover
  // },
  wrapperHover: {
    transform: 'scale(1.05)', // Efecto al pasar el mouse
  },
  overlay: {
    position: 'fixed' as const,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro para el overlay
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlayContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    backgroundColor: '#222', // Fondo más oscuro para el contenido
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    maxWidth: '400px',
    width: '90%',
    zIndex: 1001, // Aseguramos que el contenido del overlay esté encima
  },
  overlayImage: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover' as const,
    marginBottom: '16px',
    borderRadius: '8px',
  },
  overlayDetails: {
    textAlign: 'center' as const,
    color: '#fff', // Aseguramos que el texto en el overlay sea blanco
  },
  price: {
    fontSize: '16px',
    color: '#fff', // Aseguramos que el precio sea blanco
    margin: '8px 0',
    zIndex: 1002, // Aseguramos que el precio esté por encima de otros elementos
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff', // Botón azul
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3', // Cambio de color en hover
    },
  },

  

    // Otros estilos permanecen iguales
  
  
};



export default CardList;
