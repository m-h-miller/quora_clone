var TopicActions = require('../actions/topic_actions.js');

var TopicsApiUtil = {

  loadAllTopics: function () {
    $.get('api/topics', function (topics) {
      TopicActions.loadAllTopics(topics);
    })
  },

  // sidebar calls this
  updateSideBarFilters: function (topics) {
    TopicActions.updateSideBarFilters(topics);
  }
};

module.exports = TopicsApiUtil;
