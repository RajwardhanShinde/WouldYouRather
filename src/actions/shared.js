import {
  getQuestions,
  saveAnswer,
  saveQuestion,
  getUsers,
} from "../QueApi/api";
import { showLoading, hideLoading } from "react-redux-loading";
import { receiveUsers } from "./users";
import { setAuthedUser } from "./authedUser";
import { receiveQuestions, addQuestion, handleAnswer } from "./questions";

export function handleAddQuestion(Options) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const { optionOneText, optionTwoText } = Options;
    const author = authedUser;
    dispatch(showLoading());
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(hideLoading());
    });
  };
}

export function handleSaveAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    console.log(answer);
    dispatch(showLoading);
    return saveAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(handleAnswer({ authedUser, qid, answer }));
      dispatch(hideLoading());
    });
  };
}

export function handleQuestions() {
  return (dispatch) => {
    dispatch(showLoading());
    return getQuestions().then((questions) => {
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleUsers(AUTHED_ID) {
  return (dispatch) => {
    dispatch(showLoading());
    return getUsers().then((users) => {
      dispatch(receiveUsers(users));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}
