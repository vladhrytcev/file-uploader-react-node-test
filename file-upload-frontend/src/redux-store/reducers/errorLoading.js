import { SET_ERROR, SET_LOADING } from "../actions/types";

const initialState = {
  error: "",
  isLoading: false,
};

const errorLoading = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default errorLoading
