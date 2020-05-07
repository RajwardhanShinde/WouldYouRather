import {
  RECEIVE_QUESTIONS,
  SAVE_ANSWER,
  ADD_QUESTION,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_ANSWER:
      return;
    case ADD_QUESTION:
      const { question } = action;
      console.log(question);
      return {
        ...state,
        [question.id]: question,
      };

    default:
      return state;
  }
}
