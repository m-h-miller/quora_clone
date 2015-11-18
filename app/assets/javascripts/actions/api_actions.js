window.ApiActions = {
  receiveAllQuestions: function (questions) {
    AppDispatcher.dispatch({
      actionType: QuestionConstants.QUESTIONS_RECEIVED,
      questions: questions
    });
  }
};
