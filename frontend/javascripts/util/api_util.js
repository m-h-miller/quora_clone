var ApiActions = require('../actions/api_actions.js');

var ApiUtil = {
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

  createQuestion: function (question, callback) {
    $.ajax({
      url: 'api/questions',
      type: 'POST',
      data: {question: question},
      success: function (question) {
        console.log(question);
        ApiActions.receiveSingleQuestion(question);
        callback && callback(question.id);
      }
    });
  },

  deleteQuestion: function(question_id) {
    $.ajax({
      url: 'api/questions/' + question_id,
      type: 'DELETE',
      success: function (question_id) {
        console.log("Question deleted!");
        ApiUtil.fetchAllQuestions();
      }
    });
  },

  fetchQuestion: function (id) {
    $.ajax({
      url: 'api/questions/' + id,
      type: 'GET',
      success: function (question) {
        ApiActions.receiveSingleQuestion(question);
      }
    });
  },

  // I am sort of ambivalent about what to do with my routes here.
  // While on the one hand I hate this long nesting for my resources,
  // I also don't want to give the user the ability to view answers
  // absent the question's context.


  deleteAnswer: function(question_id, answer_id) {
    $.ajax({
      url: 'api/questions/' + question_id + '/answers/' + answer_id,
      type: 'DELETE',
      success: function (answer) {
        ApiUtil.fetchAnswers(answer.question_id);
      }
    });
  },

  fetchAnswers: function (question_id) {
    $.ajax({
      url: 'api/questions/' + question_id + '/answers',
      type: 'GET',
      success: function (answers) {
        ApiActions.receiveAllAnswers(answers);
      }
    });
  },

  createAnswer: function (answer, callback) {
    $.ajax({
      url: 'api/questions/' + answer.question_id + '/answers',
      type: 'POST',
      data: {answer: answer},
      success: function (answer) {
        ApiActions.receiveSingleAnswer(answer);
        callback && callback(answer.question_id);
      }
    });
  },

  fetchUserQuestions: function (user_id) {
    $.ajax({
      url: 'api/questions',
      type: 'GET',
      data: {}
    });
  },

  loadMoreQuestions: function(pageNum){
    $.ajax ({
      url: 'api/questions',
      type: 'GET',
      data: {pageNum: pageNum},
      success: function(questions) {
        ApiActions.receiveMoreQuestions(questions);
      }
    });
  }
};
