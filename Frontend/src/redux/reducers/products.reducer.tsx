
import {AppActions}from '../types_redux/types.redux.tsx';
import {GET_ALL_PRODUCTS} from '../types_redux/consts.tsx';
import {ProductsState}  from'../types_redux/interfaces.tsx';
  const initialState = {
    products: [],

  };
  
  const productsReducer = (state = initialState, action:AppActions):ProductsState => {
    switch (action.type) {
      case GET_ALL_PRODUCTS:
        return { ...state, products: action.payload };
  

      default:
        return state;
    }
  };
  
  export default productsReducer;