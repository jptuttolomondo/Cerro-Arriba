import React from 'react';
import { CardProps } from '../types/card.types.tsx';

const Card: React.FC<CardProps> = ({ image, name, price }) => {
  return (
    <div style={cardStyles.card}>
      <img src={image} alt={name} style={cardStyles.image} />
      <h3>{name}</h3>
      <p style={cardStyles.price}>${price.toFixed(2)}</p>
    </div>
  );
};

const cardStyles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap', // Los productos se ajustan en pantallas más pequeñas
      gap: '16px',
      justifyContent: 'center', // Alinea los elementos al centro
      marginTop: '20px',
    },
    card: {
      //width: '250px', // Tamaño inicial de la tarjeta
      backgroundColor: 'rgba(160, 162, 127, 0.1)',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 4px 8px rgba(195, 46, 46, 0.1)',
      textAlign: 'center' as const,
      transition: 'transform 0.3s ease',
    },
    image: {
      width: '100%',
      height: '150px',
      objectFit: 'cover' as const,
      borderRadius: '4px',
    },
    name: {
      marginTop: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    price: {
      marginTop: '4px',
      fontSize: '14px',
      color: 'white',
    },


    button: {
      marginTop: '12px',
      padding: '8px 16px',
      backgroundColor: '#4CAF50', // Color verde para el botón
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    '@media (max-width: 768px)': {
      card: {
        width: '200px', // Reducir tamaño de las tarjetas en pantallas medianas
      },
      image: {
        height: '130px', // Reducir el tamaño de la imagen en pantallas más pequeñas
      },
    },
    '@media (max-width: 480px)': {
      card: {
        width: '160px', // Hacer las tarjetas más pequeñas en pantallas móviles
      },
      image: {
        height: '100px', // Ajustar el tamaño de la imagen en pantallas muy pequeñas
      },
      name: {
        fontSize: '14px', // Ajuste de tamaño de la fuente
      },
      price: {
        fontSize: '12px', // Ajuste de tamaño de la fuente
      },
      button: {
        fontSize: '12px', // Ajustar el tamaño del botón
      },
    },
  };
  
export default Card;
