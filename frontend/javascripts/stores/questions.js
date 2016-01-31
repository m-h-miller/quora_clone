var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    QuestionConstants = require('../constants/question_constants.js'),
    Store = require('flux/utils').Store;

var QUESTIONS_INDEX_CHANGE_EVENT = "questionsIndexChange",
    ANSWERS_INDEX_CHANGE_EVENT = "answersIndexChange";

var _questions = [];
var  _answers = [];

var QuestionStore = new Store(AppDispatcher);

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

QuestionStore.addQuestionsIndexChangeListener = function (callback) {
  this.on(QUESTIONS_INDEX_CHANGE_EVENT, callback);
};
QuestionStore.removeQuestionsIndexChangeListener = function (callback) {
  this.removeListener(QUESTIONS_INDEX_CHANGE_EVENT, callback);
};
QuestionStore.changed = function () {
  this.emit(QUESTIONS_INDEX_CHANGE_EVENT);
};
QuestionStore.addAnswersIndexChangeListener = function (callback) {
  this.on(ANSWERS_INDEX_CHANGE_EVENT, callback);
};
QuestionStore.removeAnswersIndexChangeListener = function (callback) {
  this.removeListener(ANSWERS_INDEX_CHANGE_EVENT, callback);
};
QuestionStore.answersChanged = function () {
  this.emit(ANSWERS_INDEX_CHANGE_EVENT);
};

module.exports = QuestionStore;
