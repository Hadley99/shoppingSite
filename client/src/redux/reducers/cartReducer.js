import { ActionTypes } from "../constants/actionTypes";

const initialState = { cartQty: 0, localCart: [] };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_CART:
      return {
        ...state,
        localCart: [...state.localCart, action.payload],
      };

    case ActionTypes.INCREMENT_QTY: {
      const temp = state.localCart;
      const selected = temp.findIndex(
        (product) => product.id === action.payload
      );
      const prod = temp[selected];
      if (selected >= 0) {
        prod.qty = prod.qty + 1;
        prod.totalPrice = Math.round(prod.price * prod.qty * 100) / 100;
      }
      temp[selected] = prod;
      // console.log(selected);
      return {
        ...state,
        localCart: [...temp],
      };
    }
    case ActionTypes.DECREMENT_QTY: {
      const temp = state.localCart;
      const selected = temp.findIndex(
        (product) => product.id === action.payload
      );
      const prod = temp[selected];
      if (selected >= 0) {
        prod.qty = prod.qty - 1;
        prod.totalPrice = Math.round(prod.price * prod.qty * 100) / 100;
      }
      temp[selected] = prod;
      // console.log(selected);
      return {
        ...state,
        localCart: [...temp],
      };
    }
    case ActionTypes.REMOVE_FROM_CART: {
      const temp = state.localCart;
      const filteredCart = temp.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        localCart: [...filteredCart],
      };
    }
    default:
      return state;
  }
};
