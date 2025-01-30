import { Product } from "./product.types.tsx";

export type CardProps = {
  image: string;
  name: string;
  price: number;
};

export type CardListProps = {
  onAddToCart: (product: Product) => void;
};
