import { ActionTypes } from "../constants/actionTypes";

export const loggedIn = (user) => {
  return {
    type: ActionTypes.SET_USER,
    payload: user,
  };
};

export const loggedOut = () => {
  return {
    type: ActionTypes.REMOVE_USER,
    payload: null,
  };
};
