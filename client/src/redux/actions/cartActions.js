import { ActionTypes } from "../constants/actionTypes";

export const setCart = (cart) => {
  return {
    type: ActionTypes.SET_CART,
    payload: cart,
  };
};

export const incrementQty = (id) => {
  return {
    type: ActionTypes.INCREMENT_QTY,
    payload: id,
  };
};
export const decrementQty = (id) => {
  return {
    type: ActionTypes.DECREMENT_QTY,
    payload: id,
  };
};
export const removeFromCart = (id) => {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: id,
  };
};
