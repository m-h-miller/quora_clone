var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    FilterConstants = require('../constants/filter_constants.js'),
    Store = require('flux/utils').Store;

var FilterStore = new Store(AppDispatcher);

var _filters = [],
    _all_filters = [];

var resetFilters = function (filters) {
  _filters = filters.slice(0);
};

var resetAllFilters = function (filters) {
  _all_filters = filters.slice(0);
};

FilterStore.all = function () {
  return _filters.slice(0);
};

FilterStore.allFilters = function () {
  return _all_filters.slice(0);
};

FilterStore.__onDispatch = function (payload) {
  switch(payload.actionType) {

    case FilterConstants.TOPICS_UPDATED:
        resetFilters(payload.filters);
        FilterStore.__emitChange();
      break;

    case FilterConstants.LOAD_ALL_TOPICS:
        resetAllFilters(payload.filters);
        FilterStore.__emitChange();
      break;

  }
};

module.exports = FilterStore;
