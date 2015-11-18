(function () {
  var QUESTIONS_INDEX_CHANGE_EVENT = "questionsIndexChange";
  var _questions = [];

  var resetQuestions = function (questions) {
    _questions = questions;
    QuestionStore.changed();
  };

  window.QuestionStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return _questions.slice(0);
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
      }
    })
  });
})();
