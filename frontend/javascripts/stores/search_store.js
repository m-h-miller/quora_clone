var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store,
    SearchConstants = require('../constants/search_constants.js');

var SearchStore = new Store(AppDispatcher);

var _results = [];

var resetResults = function (results) {
  console.log(results);
  _results = results.results.slice(0);
};

SearchStore.results = function () {
  return _results.slice(0);
};

SearchStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SearchConstants.RECEIVE_RESULTS:
        console.log("_results from store:");
        console.log(_results);
        resetResults(payload.results);
        SearchStore.__emitChange();
      break;
  }
};

module.exports = SearchStore;
