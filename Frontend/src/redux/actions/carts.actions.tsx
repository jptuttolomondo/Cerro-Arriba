import { Dispatch } from "redux";
import { AppActions } from "../types_redux/types.redux.tsx";
import { Product } from "../../types/product.types.tsx";
import {
  ItemSelectedPayload,
  AddToCartAction,
  CartItem,
  MinusToCartAction,
  OutToCartAction
} from "../types_redux/interfaces.tsx";
import {
  ITEM_SELECTED,
  UPDATED_CART,
  ADD_TO_CART,
  DECREMENT_PRODUCT,
  OUT_PRODUCT
} from "../types_redux/consts.tsx";

export function itemSelection(payload: ItemSelectedPayload) {
  return function (dispatch: Dispatch<AppActions>) {
    return dispatch({ type: ITEM_SELECTED, payload: payload });
  };
}

export function updatedCart(payload: CartItem[]) {
  return function (dispatch: Dispatch<AppActions>) {
    return dispatch({ type: UPDATED_CART, payload: payload });
  };
}

export function AddToCart(payload: Product) {
  return function (dispatch: Dispatch<AddToCartAction>) {
    return dispatch({
      type: ADD_TO_CART,
      payload: { ...payload, quantity: 1 }
    });
  };
}

export function lessToCart(payload: Product) {
  return function (dispatch: Dispatch<MinusToCartAction>) {
    return dispatch({
      type: DECREMENT_PRODUCT,
      payload: { ...payload, quantity: 1 }
    });
  };
}
export function outToCart(payload: Product) {
  return function (dispatch: Dispatch<OutToCartAction>) {
    return dispatch({
      type: OUT_PRODUCT,
      payload: { ...payload, quantity: 1 }
    });
  };
}
