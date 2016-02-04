var AppDispatcher = require('./../dispatcher/dispatcher.js');
var UserConstants = require('../constants/current_user_constants.js');
var Store = require('flux/utils').Store;

_currentUser = {};

var CurrentUserStore = new Store(AppDispatcher);

CurrentUserStore.currentUser = function () {
  return $.extend( {}, _currentUser );
};

CurrentUserStore.isSignedIn = function () {
  if ( _currentUser = {} | typeof _currentUser == "undefined" ) {
    return false;
  } else {
    return ( typeof _currentUser.id !== "undefined" );
  }
};

CurrentUserStore.__onDispatch = function (payload) {
  console.log("hit CRU store");
  switch (payload.actionType) {
    case UserConstants.RECEIVE_CURRENT_USER:
        _currentUser = payload.user;
        CurrentUserStore.__emitChange();
      break;
  }
};

module.exports = CurrentUserStore;
