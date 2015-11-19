(function () {
  var QUESTIONS_INDEX_CHANGE_EVENT = "questionsIndexChange";
  var _questions = [];

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

    addQuestionsIndexChangeListener: function (callback) {
      this.on(QUESTIONS_INDEX_CHANGE_EVENT, callback);
    },

    removeQuestionsIndexChangeListener: function (callback) {
      this.removeListener(QUESTIONS_INDEX_CHANGE_EVENT, callback);
    },

    changed: function () {
      this.emit(QUESTIONS_INDEX_CHANGE_EVENT);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case QuestionConstants.QUESTIONS_RECEIVED:
            resetQuestions(payload.questions);
          break;
        case QuestionConstants.QUESTION_RECEIVED:
            resetQuestion(payload.question);
          break;
      }
    })
  });
})();
