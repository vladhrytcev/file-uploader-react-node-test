import { SET_LINKS, SET_LAST_CREATED_LINK, SET_DOWNLOAD_LINK } from "../actions/types";

const initialState = {
  lastCreated: null,
  links: [],
  downloadLink: null
};

const links =  (state = initialState, action) => {
  switch (action.type) {
    case SET_LINKS:
      return {
        ...state,
        links: action.payload
      };
    case SET_LAST_CREATED_LINK:
      return {
        ...state,
        lastCreated: action.payload
      };
    case SET_DOWNLOAD_LINK:
      return {
        ...state,
        downloadLink: action.payload
      };
    default:
      return state;
  }
};

export default links