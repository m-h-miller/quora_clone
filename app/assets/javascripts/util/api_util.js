window.ApiUtil = {
  fetchAllQuestions: function () {
    $.ajax({
      url: 'api/questions',
      type: 'GET',
      dataType: 'json',
      success: function (questions) {
        ApiActions.receiveAllQuestions(questions);
      }
    });
  },


};
