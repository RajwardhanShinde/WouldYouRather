import {
  _getUsers,
  _getQuestions,
  _saveQuestion, // Adds New Question
  _saveQuestionAnswer, // Updates Answer
} from "./Data.js";

export function getUsers() {
  return _getUsers().then((users) => ({
    users,
  }));
}

export function getQuestions() {
  return _getQuestions();
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveAnswer(info) {
  return _saveQuestionAnswer(info);
}
