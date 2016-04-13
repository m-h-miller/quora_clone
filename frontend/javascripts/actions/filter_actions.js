var Dispatcher = require('../dispatcher/dispatcher.js'),
    FilterConstants = require('../constants/filter_constants.js');

var FilterActions = {
  updateFilters: function (topics, dropdown) {
    Dispatcher.dispatch({
      actionType: FilterConstants.UPDATE_FILTERS,
      topics: topics,
      dropdown: dropdown
    });
  },
};

module.exports = FilterActions;
