var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    TopicConstants = require('../constants/topic_constants.js'),
    Store = require('flux/utils').Store;

var TopicStore = new Store(AppDispatcher);

var _topics = [],
    _all_topics = [];


var resetTopics = function (topics) {
  _topics = topics.slice(0);
};

var resetAllTopics = function (topics) {
  _all_topics = topics.slice(0);
};

TopicStore.all = function () {
  return _topics.slice(0);
};

TopicStore.allTopics = function () {
  return _all_topics.slice(0);
};

TopicStore.__onDispatch = function (payload) {
  switch(payload.actionType) {

    case TopicConstants.TOPICS_UPDATED:
        resetTopics(payload.topics);
        TopicStore.__emitChange();
      break;

    case TopicConstants.LOAD_ALL_TOPICS:
        resetAllTopics(payload.topics);
        TopicStore.__emitChange();
      break;

  }
};

module.exports = TopicStore;
