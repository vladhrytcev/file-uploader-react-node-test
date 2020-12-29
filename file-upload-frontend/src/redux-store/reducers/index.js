import { combineReducers } from "redux";
import links from "./links";
import errorLoading from "./errorLoading";

export default combineReducers({ links, errorLoading });
