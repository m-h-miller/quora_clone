var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    Store = require('flux/utils').Store,
    SearchConstants = require('../constants/search_constants.js');

var SearchStore = new Store(AppDispatcher);

var _results = [];

SearchStore.all = function () {
  return _results.slice(0);
};

SearchStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SearchConstants.Query_CHANGED:
        _results = payload.results;
        SearchStore.__emitChange();
      break;
  }
};

module.exports = SearchStore;
