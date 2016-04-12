var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    TopicConstants = require('../constants/topic_constants.js'),
    Store = require('flux/utils').Store;

var TopicStore = new Store(AppDispatcher);

var _filters = [],
    _topics = [];

var resetFilters = function (topics) {
  _filters = topics.slice(0);
};

var resetTopics = function (topics) {
  _topics = topics.slice(0);
};

TopicStore.allFilters = function () {
  return _filters.slice(0);
};

TopicStore.allTopics = function () {
  return _topics.slice(0);
};

TopicStore.__onDispatch = function (payload) {
  switch(payload.actionType) {

    case TopicConstants.UPDATE_SIDEBAR_FILTERS:
        resetFilters(payload.topics);
        TopicStore.__emitChange();
      break;

    case TopicConstants.LOAD_ALL_TOPICS:
        resetTopics(payload.topics);
        TopicStore.__emitChange();
      break;

  }
};

module.exports = TopicStore;
