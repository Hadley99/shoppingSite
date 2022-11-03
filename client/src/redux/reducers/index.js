import { combineReducers } from "redux";
import { productsReducer } from "./productReducer";
import { userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";

export const reducers = combineReducers({
  allProducts: productsReducer,
  user: userReducer,
  cart: cartReducer,
});
export default reducers;
