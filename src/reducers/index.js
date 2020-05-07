import users from "./users";
import authedUser from "./authedUser";
import questions from "./questions";
import { loadingBarReducer } from "react-redux-loading";
import { combineReducers } from "redux";
export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
});
