import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/index.tsx";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types_redux/types.redux.tsx";
import { useDispatch as useReduxDispatch } from "react-redux";
export type RootState = ReturnType<typeof rootReducer>;
const store = configureStore({ reducer: rootReducer });

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
export default store;
