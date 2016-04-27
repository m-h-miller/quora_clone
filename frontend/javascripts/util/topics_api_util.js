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
  },

  createTopic: function (topic) {
    $.post('api/topics', {topic: topic}, function (topic) {
      TopicActions.receiveTopic(topic);
    });
  }
};

module.exports = TopicsApiUtil;
