import { Product } from "./product.types.tsx";

export interface CartItem extends Product {
  quantity: number; // Cantidad de este producto en el carrito
}

export interface Cart {
  products: CartItem[]; // Array de productos en el carrito
  totalPrice: number; // Total a pagar por los productos en el carrito
  deliveryDate?: string; // Fecha de entrega (opcional)
  deliveryTime?: string; // Hora de entrega (opcional)
  deliveryLocation?: string; // Lugar de entrega (opcional)
}
