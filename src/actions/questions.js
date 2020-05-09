export const SAVE_ANSWER = "SAVE_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function handleAnswer({ authedUser, qid, answer }) {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer,
  };
}
