var ApiActions = require('../actions/api_actions.js');

var ApiUtil = {

  // possibly un-used
  fetchAllQuestions: function () {
    $.get('api/questions', function (questions) {
      ApiActions.receiveAllQuestions(questions);
    });
  },

  createQuestion: function (question, callback) {
   $.post('api/questions', { question: question }, function (question) {
     ApiActions.receiveSingleQuestion(question);
     callback && callback(question.id);
   });
  },

  deleteQuestion: function(question_id) {
    $.ajax({
      url: 'api/questions/' + question_id,
      type: 'DELETE',
      success: function (question_id) {
        ApiUtil.fetchAllQuestions();
      }
    });
  },

  fetchQuestion: function (id) {
    $.get('api/questions/' + id, function (question) {
      ApiActions.receiveSingleQuestion(question);
    });
  },

  deleteAnswer: function (question_id, answer_id) {
    $.ajax({
      url: 'api/questions/' + question_id + '/answers/' + answer_id,
      type: 'DELETE',
      success: function (answer) {
        console.log('delete');
        ApiUtil.fetchAnswers(answer.question_id);
      }
    });
  },

  fetchAnswers: function (question_id) {
    $.get('api/questions/' + question_id + '/answers', function (answers) {
      ApiActions.receiveAllAnswers(answers);
    })
  },

  createAnswer: function (answer, callback) {
    $.post('api/questions/' + answer.question_id + '/answers', { answer: answer }, function (answer) {
      ApiActions.receiveSingleAnswer(answer);
      callback && callback(answer.question_id);
    });
  },

  // this is currently my primary query
    // i will have to extend it with params for: filters + topics
    // but, when dispatched from index page (forward/back page buttons)
    // how will it know the state of the SideBar?

  loadMoreQuestions: function (pageNum) {
    $.get('api/questions', { pageNum: pageNum }, function (questions) {
      ApiActions.receiveMoreQuestions(questions);
    });
  }
};

module.exports = ApiUtil;
