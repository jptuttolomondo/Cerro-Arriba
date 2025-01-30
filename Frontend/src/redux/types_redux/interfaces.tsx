import { Product } from "../../types/product.types.tsx";
import {
  ITEM_SELECTED,
  GET_ALL_PRODUCTS,
  UPDATED_CART,
  ADD_TO_CART,
INCREMENT_PRODUCT,
 DECREMENT_PRODUCT,
OUT_PRODUCT,
NEW_ORDER
} from './consts.tsx'


export interface ItemSelectedAction {
    type: typeof ITEM_SELECTED;
    payload: ItemSelectedPayload;
  }

  export interface ItemSelectedPayload {
    id: string;
    name: string;
    quantity: number;
  }
  
  export interface GetAllProductsAction {
    type: typeof GET_ALL_PRODUCTS;
    payload: Product[];
  }
export interface UpdatedCartAction{
  type: typeof UPDATED_CART;
  payload: CartItem[];
}
export interface AddToCartAction{
  type: typeof ADD_TO_CART;
  payload: CartItem | CartItem[]
}



  export interface ProductsState {
    products: Product[]; // Define el tipo `Product` según tus necesidades
}

export interface OrderState{
  order:Order[];
}

export interface CartProps  {
  cart: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onConfirmOrder: () => void;
};
export interface CartItem {
  _id: string;
  product_name: string;
  price: number;
  quantity: number;
}
export interface CartItem extends Product {
  quantity: number; // Propiedad adicional para el carrito
}


export interface PlusToCartAction{
  type: typeof INCREMENT_PRODUCT;
  payload: CartItem | CartItem[]
}


export interface MinusToCartAction{
  type: typeof DECREMENT_PRODUCT;
  payload: CartItem | CartItem[]
}

export interface OutToCartAction{
  type: typeof OUT_PRODUCT;
  payload: CartItem | CartItem[]
}

export interface UserDetails{
  deliveryTime:string;
  email:string;
  location:string;
  name:string;
  paymentMethod:string;
  whatsapp:string
}

export interface Order{
  cartItems:CartItem|CartItem[];
  totalPrice:number;
  userDetails:UserDetails
}
export interface PostOrder{
  type: typeof NEW_ORDER;
  payload: Order 
}