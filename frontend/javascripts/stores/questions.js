var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store,
    QuestionConstants = require('../constants/question_constants.js'),
    AnswerConstants = require('../constants/answer_constants.js');

var QuestionStore = new Store(AppDispatcher),
    _questions = [],
    _answers = [];

var resetQuestions = function (questions) {
  _questions = questions.slice(0);
};

var resetQuestion = function (question) {
  var updated = false;
  _questions.forEach(function (q) {
    if (q.id === question.id) {
      _questions[_questions.indexOf(q)] = question;
      updated = true;
    }
  });
  if (!updated) {
    _questions.push(question);
  }
};

// I think I avoided reversing Qs b/c I push history to a
// Question Detail component ?
var resetAnswers = function (answers) {
  _answers = answers.reverse();
};

var addAnswer = function (answer) {
  _answers.push(answer);
};

QuestionStore.all = function () {
  return _questions.slice(0);
};

QuestionStore.find = function (id) {
  var question;
  _questions.forEach(function(q) {
    if (q.id === id) { question = q; }
  });
  return question;
};

QuestionStore.findAuthorQuestions = function (user_id) {
  var questions = [];
  _questions.forEach(function(q) {
    if (q.author_id === user_id) { questions.push(q); }
  });
  return questions;
};

  // How am i populating _answers? need to move it to its own store lol
QuestionStore.allQuestionAnswers = function () {
  return _answers.slice(0);
};

QuestionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case QuestionConstants.QUESTIONS_RECEIVED:
        resetQuestions(payload.questions);
        QuestionStore.__emitChange();
      break;
    case QuestionConstants.QUESTION_RECEIVED:
        resetQuestion(payload.question);
        QuestionStore.__emitChange();
      break;
    case AnswerConstants.ANSWERS_RECEIVED:
        resetAnswers(payload.answers);
        QuestionStore.__emitChange();
      break;
    case AnswerConstants.ANSWER_RECEIVED:
        addAnswer(payload.answer);
        QuestionStore.__emitChange();
      break;
    case QuestionConstants.MORE_QUESTIONS_RECEIVED:
        resetQuestions(payload.questions);
        QuestionStore.__emitChange();
      break;
  }
};

module.exports = QuestionStore;
