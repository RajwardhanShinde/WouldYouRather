import { saveAnswer, saveQuestion } from "../QueApi/api";

export const SAVE_ANSWER = "SAVE_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(Options) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const { optionOneText, optionTwoText } = Options;
    console.log(authedUser, optionOneText, optionTwoText);
    return saveQuestion({
      optionOneText,
      optionTwoText,
      authedUser,
    }).then((question) => dispatch(addQuestion(question)));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function answer({ authedUser, qid, ans }) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    ans,
  };
}

export function handleSaveAnswer(info) {
  return (dispatch) => {
    dispatch(answer(info));

    return saveAnswer(info).catch((e) => {
      console.warn("Error in saving answer:", e);
      alert("Something Went Wrong");
    });
  };
}
