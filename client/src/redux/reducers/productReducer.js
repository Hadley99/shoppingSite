import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  products: [],
  filteredProducts: [],
  types: { category: "", sort: "" },
};

export const productsReducer = (state = initialState, action) => {
  let temp = [...state.products];
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };
    }

    case ActionTypes.SET_CATEGORY: {
      return { ...state, types: { ...state.types, category: action.payload } };
    }
    case ActionTypes.SET_SORT: {
      return { ...state, types: { ...state.types, sort: action.payload } };
    }
    case ActionTypes.FILTER_PRODUCTS: {
      if (state.types.category) {
        temp = temp.filter((product) => {
          if (state.types.category === "") return true;
          if (product.category === state.types.category) return product;
        });
      }

      if (state.types.sort) {
        switch (state.types.sort) {
          case "":
            temp = temp.map((prod) => prod);
            break;
          case "ascending":
            temp = temp
              .map((prod) => prod)
              .sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
              });
            break;
          case "decending":
            temp = temp
              .map((prod) => prod)
              .sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
              });
            break;
          case "lowToHigh":
            temp = temp.map((prod) => prod).sort((a, b) => a.price - b.price);
            break;

          case "highToLow":
            temp = temp.map((prod) => prod).sort((a, b) => b.price - a.price);
            break;
          default:
            break;
        }
      }
      return {
        ...state,
        filteredProducts: temp,
      };
    }
    default:
      return state;
  }
};
