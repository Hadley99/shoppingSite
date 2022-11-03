import { ActionTypes } from "../constants/actionTypes";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};
export const setCategory = (category) => {
  return {
    type: ActionTypes.SET_CATEGORY,
    payload: category,
  };
};
export const setSort = (sort) => {
  return {
    type: ActionTypes.SET_SORT,
    payload: sort,
  };
};
export const filterProducts = () => {
  return {
    type: ActionTypes.FILTER_PRODUCTS,
  };
};
