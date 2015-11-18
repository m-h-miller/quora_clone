(function () {
  var QUESTIONS_INDEX_CHANGE_EVENT = "questionsIndexChange";
  var _questions = [];

  var resetQuestions = function (questions) {
    _questions = questions;
  };

  window.QuestionStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return _questions.slice(0);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case QuestionConstants.QUESTIONS_RECEIVED:
            resetQuestions(payload.questions);
            QuestionStore.emit(QUESTIONS_INDEX_CHANGE_EVENT);
          break;
      }
    })
  });
})();
