import { Cart } from "../../types/cart.types.tsx";
import { AppActions } from "../types_redux/types.redux";
import {
  ADD_TO_CART,
  UPDATED_CART,
  DECREMENT_PRODUCT,
  OUT_PRODUCT,
} from "../types_redux/consts";
import { Product } from "../../types/product.types.tsx";

const initialState: Cart = {
  products: [], // Inicialmente el carrito está vacío
  totalPrice: 0, // Total inicial es 0
  deliveryDate: undefined, // Valores predeterminados (opcionales)
  deliveryTime: undefined,
  deliveryLocation: undefined,
};

const cartReducer = (state = initialState, action: AppActions): Cart => {
  switch (action.type) {
    case ADD_TO_CART: {
      // Agregar un producto al carrito
      const newProducts = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      const updatedProducts = state.products.map((product) => {
        const newProduct = newProducts.find((p) => p._id === product._id);
        if (newProduct) {
          // Si el producto ya existe en el carrito, incrementar la cantidad y calcular el precio total del producto
          return {
            ...product,
            quantity: product.quantity + (newProduct.quantity || 1),
            totalPrice:
              (product.quantity + (newProduct.quantity || 1)) * product.price,
          };
        }
        return product; // Si no es el producto actual, mantenerlo igual
      });

      // Agregar los nuevos productos que no estaban en el carrito
      const newItems = newProducts
        .filter(
          (newProduct) =>
            !state.products.some((product) => product._id === newProduct._id),
        )
        .map((newProduct) => ({
          ...newProduct,
          quantity: newProduct.quantity || 1,
          totalPrice: (newProduct.quantity || 1) * newProduct.price,
        }));

      const finalProducts = [...updatedProducts, ...newItems];

      // Calcular el precio total del carrito
      const updatedTotalPrice = finalProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      );

      return {
        ...state,
        products: finalProducts,
        totalPrice: updatedTotalPrice,
      };
    }

    case UPDATED_CART: // Actualizar el carrito completo
    {
      const updatedCart = action.payload;
      return { ...state, ...updatedCart };
    }
    case DECREMENT_PRODUCT: {
      const newProducts = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      const updatedProducts = state.products.map((product) => {
        const newProduct = newProducts.find((p) => p._id === product._id);
        if (newProduct) {
          // Si el producto ya existe en el carrito, incrementar la cantidad
          return {
            ...product,
            quantity: product.quantity - (newProduct.quantity || 1),
          };
        }
        return product; // Si no es el producto actual, mantenerlo igual
      });

      // Agregar los nuevos productos que no estaban en el carrito
      const newItems = newProducts.filter(
        (newProduct) =>
          !state.products.some((product) => product._id === newProduct._id),
      );

      const finalProducts = [...updatedProducts, ...newItems];
      const updatedTotalPrice = updatedProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      );

      return {
        ...state,
        products: finalProducts,
        totalPrice: updatedTotalPrice,
      };
    }

    case OUT_PRODUCT: {
      const productToDelete = action.payload as Product;
      const prodDeleted = state.products.filter(
        (prod) => prod._id !== productToDelete._id,
      );
      return { ...state, products: prodDeleted };
    }
    default:
      return state;
  }
};

export default cartReducer;
