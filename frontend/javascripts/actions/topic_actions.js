var Dispatcher = require('../dispatcher/dispatcher.js'),
    TopicConstants = require('../constants/topic_constants.js');

var TopicActions = {

  loadAllTopics: function (topics) {
    Dispatcher.dispatch({
      actionType: TopicConstants.LOAD_ALL_TOPICS,
      topics: topics
    });
  }
};

module.exports = TopicActions;
