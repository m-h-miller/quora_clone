var Dispatcher = require('../dispatcher/dispatcher.js'),
    SearchConstants = require('../constants/search_constants.js');

var SearchActions = {
  receiveResults: function (results) {
    Dispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_RESULTS,
      results: results
    });
  }
};

module.exports = SearchActions;
