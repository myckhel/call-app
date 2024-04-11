import { mergeReducers } from "use-redux-states";
import app from "./app";
import auth from "./auth";

const reducers = mergeReducers({ app, auth });

export default reducers;
