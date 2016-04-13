var Dispatcher = require('../dispatcher/dispatcher.js'),
    FilterConstants = require('../constants/filter_constants.js');

var FilterActions = {
  updateFilters: function (filter, filterTopics) {
    Dispatcher.dispatch({
      actionType: FilterConstants.UPDATE_FILTERS,
      filter: filter,
      filterTopics: filterTopics
    });
  },
};

module.exports = FilterActions;
