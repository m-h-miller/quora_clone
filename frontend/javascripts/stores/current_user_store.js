var AppDispatcher = require('./../dispatcher/dispatcher.js'),
    UserConstants = require('../constants/current_user_constants.js'),
    Store = require('flux/utils').Store;

var CurrentUserStore = new Store(AppDispatcher),
    _currentUser = {};

CurrentUserStore.currentUser = function () {
  return $.extend({}, _currentUser);
};

CurrentUserStore.isSignedIn = function () {
  console.log("CUStore.isSignedIn:");
  if ( _currentUser == {} ) {
    return false;
  }
  else {
    return ( typeof _currentUser.id !== "undefined" );
  }
};

CurrentUserStore.storeUser = function (user) {
  console.log("CUStore.storeUser:");
  _currentUser = user;
};

CurrentUserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.RECEIVE_CURRENT_USER:
        CurrentUserStore.storeUser(payload.user);
        CurrentUserStore.__emitChange();
      break;
  }
};

module.exports = CurrentUserStore;
