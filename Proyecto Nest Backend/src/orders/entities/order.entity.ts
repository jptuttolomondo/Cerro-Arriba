export class Order {
  cartItems: CartItem[];
  totalPrice: number;
  userDetails: UserDetails;
}
export class CartItem {
  _id: string;
  product_name: string;
  price: number;
  quantity: number;
}
export class UserDetails {
  deliveryTime: string;
  email: string;
  location: string;
  name: string;
  paymentMethod: string;
  whatsapp: string;
}
