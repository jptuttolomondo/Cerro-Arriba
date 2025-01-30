import { combineReducers } from "redux";
import cartReducer from "./cart.reducer.tsx";
import productsReducer from "./products.reducer.tsx";
import orderReducer from "./order.reducer.tsx";

const rootReducer = combineReducers({
  cartReducer: cartReducer,
  productsReducer: productsReducer,
  orderReducer: orderReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
