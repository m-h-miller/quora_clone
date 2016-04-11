var TopicActions = require('../actions/topic_actions.js');

var FiltersApiUtil = {

  loadTopics: function () {
    $.get('api/topics', function (topics) {
      TopicActions.updateTopics(topics);
    })
  },

    // doesn't hit DB;
    // this function passes the checked values from Sidebar to topic store;
  updateTopics: function (topics) {
    TopicActions.updateTopics(topics);
  },

  loadAllTopics: function () {
    $.get('api/topics', function (topics) {
      TopicActions.loadAllTopics(topics);
    })
  },

};

module.exports = FiltersApiUtil;
