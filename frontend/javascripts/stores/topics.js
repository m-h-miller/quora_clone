var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    TopicConstants = require('../constants/topic_constants.js'),
    Store = require('flux/utils').Store;

var TopicStore = new Store(AppDispatcher);

var _topics = [];

var resetToAllTopics = function () {
  _topics = ['General', 'Ruby', 'Philosophy', 'Javascript', 'React.js'].slice(0);
};

var resetTopics = function (topics) {
  _topics = topics.slice(0);
};

TopicStore.all = function () {
  return _topics.slice(0);
};

TopicStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case TopicConstants.TOPICS_CHANGED:
        resetToAllTopics();
        TopicStore.__emitChange();
      break;
    case TopicConstants.TOPICS_UPDATED:
        resetTopics(payload.topics);
        TopicStore.__emitChange();
      break;
  }
};

module.exports = TopicStore;
