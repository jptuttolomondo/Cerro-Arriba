import { AppActions } from "../types_redux/types.redux.tsx";
import { NEW_ORDER } from "../types_redux/consts.tsx";
import { OrderState } from "../types_redux/interfaces.tsx";
const initialState = {
  order: []
};

const orderReducer = (state = initialState, action: AppActions): OrderState => {
  switch (action.type) {
    case NEW_ORDER:
      return { ...state, order: [...state.order, action.payload] };

    default:
      return state;
  }
};

export default orderReducer;
