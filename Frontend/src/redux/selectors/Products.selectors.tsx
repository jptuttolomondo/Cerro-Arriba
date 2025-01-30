import { useSelector } from "react-redux";
import { RootState } from "../reducers/index.tsx";

export const useProductsSelector = () =>
  useSelector((state: RootState) => state.productsReducer.products);
