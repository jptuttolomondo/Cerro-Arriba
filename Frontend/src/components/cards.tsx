import React from "react";
import { CardProps } from "../types/card.types.tsx";
import { cardStyles } from "../styles/cardStyles.tsx";
const Card: React.FC<CardProps> = ({ image, name, price }) => {
  return (
    <div style={cardStyles.card}>
      <img src={image} alt={name} style={cardStyles.image} />
      <h3>{name}</h3>
      <p style={cardStyles.price}>${price.toFixed(2)}</p>
    </div>
  );
};


export default Card;
