import {  useSelector } from "react-redux";
import {RootState} from '../reducers/index.tsx'

export const useCartSelectorProducts=()=>useSelector((state:RootState)=>state.cartReducer.products)

export const useCartSelectorTotalPrice=()=>useSelector((state:RootState)=>state.cartReducer.totalPrice)

