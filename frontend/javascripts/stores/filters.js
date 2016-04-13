var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    FilterConstants = require('../constants/filter_constants.js'),
    Store = require('flux/utils').Store;

var FilterStore = new Store(AppDispatcher);

var _topics = [],
    _dropdown = "new";

var resetFilters = function (topics, dropdown) {
  _topics = topics.slice(0);
  _dropdown = dropdown.slice(0);
};

FilterStore.all = function () {
  // will this work or do i need an array
  return {
            topics: _topics.slice(0),
            dropdown: _dropdown.slice(0)
          };
};

FilterStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case FilterConstants.UPDATE_FILTERS:
        resetFilters(payload.topics, payload.dropdown);
        FilterStore.__emitChange();
      break;
  }
};

module.exports = FilterStore;
