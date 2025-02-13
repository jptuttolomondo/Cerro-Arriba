import axios from "axios";
import { NEW_ORDER, SEND_ORDER_BY_WHATSAPP } from "../types_redux/consts.tsx";
import { AppActions } from "../types_redux/types.redux.tsx";
import { Order } from "../types_redux/interfaces.tsx";
import { Dispatch } from "redux";

export function postToOrder(order: Order) {
  return async function (dispatch: Dispatch<AppActions>) {
    console.log('order en action',order)
    const response = await axios.post(
      import.meta.env.VITE_BACKEND+import.meta.env.VITE_ORDER,
      order,
    );
 
if(response.status!==201) alert('error')
  else return dispatch({ type: NEW_ORDER, payload: response.data });
  };
}
  export function OrderSendByWhatsapp(order: Order) {
    return async function (dispatch: Dispatch<AppActions>) {
     
      const response = await axios.post(
        import.meta.env.VITE_BACKEND + import.meta.env.VITE_WHATSAPP,
        order,
      );
  
      return dispatch({ type: SEND_ORDER_BY_WHATSAPP, payload: response.data });
    };
  }