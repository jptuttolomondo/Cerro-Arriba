import axios from "axios";
import { Dispatch } from "redux";

import { AppActions } from "../types_redux/types.redux.tsx";
import { GET_ALL_PRODUCTS } from "../types_redux/consts.tsx";

export function getAllProducts() {
  return async function (dispatch: Dispatch<AppActions>) {
    const response = await axios.get(
      import.meta.env.VITE_BACKEND + import.meta.env.VITE_PRODUCTS_BACK
    );
    
    return dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
  };
}

