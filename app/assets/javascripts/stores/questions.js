(function () {
  var QUESTIONS_INDEX_CHANGE_EVENT = "questionsIndexChange";
  var ANSWERS_INDEX_CHANGE_EVENT = "answersIndexChange";

  var _questions = [];
  var _answers = [];

  var resetQuestions = function (questions) {
    _questions = questions.reverse();
    QuestionStore.changed();
  };

  var resetQuestion = function (question) {
    var updated = false;
    _questions.forEach(function (q) {
      if (q.id === question.id) {
        _questions[_questions.indexOf(q)] = question;
        updated = true;
      }
    });
    if (!updated) { _questions.push(question); }
    QuestionStore.changed();
  };

  var resetAnswers = function (answers) {
    _answers = answers.reverse();
    QuestionStore.answersChanged();
  };

  var addAnswer = function (answer) {
    _answers.push(answer);
    QuestionStore.answersChanged();
  };

  window.QuestionStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return _questions.slice(0);
    },

    find: function (id) {
      var question;
      _questions.forEach(function(q) {
        if (q.id === id) { question = q; }
      });
      return question;
    },

    allQuestionAnswers: function () {
      return _answers.slice(0);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case QuestionConstants.QUESTIONS_RECEIVED:
            resetQuestions(payload.questions);
          break;
        case QuestionConstants.QUESTION_RECEIVED:
            resetQuestion(payload.question);
          break;
        case AnswerConstants.ANSWERS_RECEIVED:
            resetAnswers(payload.answers);
          break;
        case AnswerConstants.ANSWER_RECEIVED:
            addAnswer(payload.answer);
          break;
      }
    }),

    addQuestionsIndexChangeListener: function (callback) {
      this.on(QUESTIONS_INDEX_CHANGE_EVENT, callback);
    },
    removeQuestionsIndexChangeListener: function (callback) {
      this.removeListener(QUESTIONS_INDEX_CHANGE_EVENT, callback);
    },
    changed: function () {
      this.emit(QUESTIONS_INDEX_CHANGE_EVENT);
    },

    addAnswersIndexChangeListener: function (callback) {
      this.on(ANSWERS_INDEX_CHANGE_EVENT, callback);
    },
    removeAnswersIndexChangeListener: function (callback) {
      this.removeListener(ANSWERS_INDEX_CHANGE_EVENT, callback);
    },
    answersChanged: function () {
      this.emit(ANSWERS_INDEX_CHANGE_EVENT);
    },



  });
})();
