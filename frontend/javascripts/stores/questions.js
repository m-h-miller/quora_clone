var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store,
    QuestionConstants = require('../constants/question_constants.js');

var QuestionStore = new Store(AppDispatcher);
var _questions = [];
var  _answers = [];

var resetQuestions = function (questions) {
  console.log("reset questions: ");
  // console.log(questions);
  // _questions = questions.slice(0);
  var copy = questions;
  _questions = copy;
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

var resetAnswers = function (answers) {
  _answers = answers.reverse();
};

var addAnswer = function (answer) {
  _answers.push(answer);
};

QuestionStore.all = function () {
  // return _questions.slice(0);
  var copy = _questions;
  return copy;
};

QuestionStore.find = function (id) {
  var question;
  _questions.forEach(function(q) {
    if (q.id === id) { question = q; }
  });
  return question;
};

// Double check wtf I'm using this method for
QuestionStore.findAuthorQuestions = function (user_id) {
  var questions = [];
  _questions.forEach(function(q) {
    if (q.author_id === user_id) { questions.push(q); }
  });
  return questions;
};

QuestionStore.allQuestionAnswers = function () {
  return _answers.slice(0);
};

QuestionStore.__onDispatch = function (payload) {
  // console.log(payload);
  console.log("Q Store payload:");
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
      // What in the world could possible be calling this method??
    case QuestionConstants.MORE_QUESTIONS_RECEIVED:
        resetQuestions(payload.questions);
        QuestionStore.__emitChange();
      break;
  }
};

module.exports = QuestionStore;
