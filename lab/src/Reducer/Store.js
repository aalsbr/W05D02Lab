import { createStore, combineReducers } from "redux";
import counter from "./Counter";
import List from "./List";

const myReducer = combineReducers({ counter, List });
const myStore = createStore(myReducer);

export default myStore;
