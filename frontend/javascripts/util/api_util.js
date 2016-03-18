var ApiActions = require('../actions/api_actions.js');

var ApiUtil = {
  triggerTopics: function () {
    ApiActions.triggerTopics();
  },

  loadTopics: function () {
    $.get('api/topics', function (topics) {
      ApiActions.updateTopics(topics);
    })
  },

    // doesn't hit DB;
    // this function passes the checked values from Sidebar to topic store;
  updateTopics: function (topics) {
    ApiActions.updateTopics(topics);
  },

      loadAllTopics: function () {
        $.get('api/topics', function (topics) {
          ApiActions.loadAllTopics(topics);
        })
      },



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

  loadMoreQuestions: function (pageNum) {
    $.get('api/questions', { pageNum: pageNum }, function (questions) {
      ApiActions.receiveMoreQuestions(questions);
    });
  }
};

module.exports = ApiUtil;
