import rootReducer from "../reducers/index.tsx";
import {
  ItemSelectedAction,
  GetAllProductsAction,
  UpdatedCartAction,
  AddToCartAction,
  CartItem,
  PlusToCartAction,
  MinusToCartAction,
  OutToCartAction,
  PostOrder
} from "./interfaces.tsx";
export type AppActions =
  | ItemSelectedAction
  | GetAllProductsAction
  | UpdatedCartAction
  | AddToCartAction
  | PlusToCartAction
  | MinusToCartAction
  | OutToCartAction
  | PostOrder; //o todas las que necesitemos

export type RootState = ReturnType<typeof rootReducer>;
export type CartState = CartItem[];
export type OrderState = OrderState[];
