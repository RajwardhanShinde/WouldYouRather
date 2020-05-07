import {
  _getUsers,
  _getQuestions,
  _saveQuestion, // Adds New Question
  _saveQuestionAnswer, // Updates Answer
} from "./Data.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveAnswer(info) {
  return _saveQuestionAnswer(info);
}
