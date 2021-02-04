import { SET_ERROR, SET_LOADING, SET_IS_AUTH } from "../actions/types";
import { getToken } from "../../utils/localStorageHandler";

const initialState = {
  error: "",
  isLoading: false,
  isAuth: getToken()
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
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };
    default:
      return state;
  }
};

export default errorLoading
