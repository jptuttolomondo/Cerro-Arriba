import axios from 'axios'
import {NEW_ORDER} from '../types_redux/consts.tsx'
import { AppActions } from "../types_redux/types.redux.tsx";
import { Order } from '../types_redux/interfaces.tsx';
import { Dispatch } from "redux";


export function postToOrder(order:Order) {
    return async function (dispatch: Dispatch<AppActions>) {
        console.log(order)
      const response = await axios.post(
        import.meta.env.VITE_BACKEND + import.meta.env.VITE_WHATSAPP,order
      );
    
      return dispatch({ type: NEW_ORDER, payload: response.data });
    };
  }