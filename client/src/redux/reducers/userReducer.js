import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  value: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        value: action.payload,
      };
    case ActionTypes.REMOVE_USER:
      return {
        ...state,
        value: action.payload,
      };

    default:
      return state;
  }
};
