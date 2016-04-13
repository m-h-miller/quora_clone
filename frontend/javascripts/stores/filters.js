var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    FilterConstants = require('../constants/filter_constants.js'),
    Store = require('flux/utils').Store;

var FilterStore = new Store(AppDispatcher);

var _filter_topics = [],
    _dropdown_filter;

var resetFilters = function (topics, dropdown) {
  _filter_topics = topics.slice(0);
  _dropdown_filter = dropdown.slice(0);
};

FilterStore.all = function () {
  return {
            filters: _filter_topics.slice(0),
            dropdown: _dropdown_filter.slice(0)
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
