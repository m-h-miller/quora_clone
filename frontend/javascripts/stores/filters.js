var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    FilterConstants = require('../constants/filter_constants.js'),
    Store = require('flux/utils').Store;

var FilterStore = new Store(AppDispatcher);

var _filterTopics = [],
    _filter = "new";

var resetFilters = function (filter, filterTopics) {
  console.log("reset filters");
  console.log(filter);
  console.log(filterTopics);
  _filterTopics = filterTopics.slice(0);
  _filter = filter.slice(0);
};

FilterStore.all = function () {
  // will this work or do i need an array
  return {
            filterTopics: _filterTopics.slice(0),
            filter: _filter.slice(0)
          };
};

FilterStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case FilterConstants.UPDATE_FILTERS:
        resetFilters(payload.filter, payload.filterTopics);
        FilterStore.__emitChange();
      break;
  }
};

module.exports = FilterStore;
