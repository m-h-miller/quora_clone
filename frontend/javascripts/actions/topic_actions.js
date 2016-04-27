var Dispatcher = require('../dispatcher/dispatcher.js'),
    TopicConstants = require('../constants/topic_constants.js');

var TopicActions = {

  loadAllTopics: function (topics) {
    Dispatcher.dispatch({
      actionType: TopicConstants.LOAD_ALL_TOPICS,
      topics: topics
    });
  },

  receiveTopic: function (topic) {
    Dispatcher.dispatch({
      actionType: TopicConstants.RECEIVE_TOPIC,
      topic: topic
    });
  }
};

module.exports = TopicActions;
