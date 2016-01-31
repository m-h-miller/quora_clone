var AppDispatcher = require('./../dispatcher/dispatcher.js');
var UserConstants = require('../constants/current_user_constants.js');

var Store = require('flux/utils').Store;

var CHANGE_EVENT = "change";
var _currentUser = {};

var CurrentUserStore = new Store(AppDispatcher);

CurrentUserStore.currentUser = function () {
  return $.extend( {}, _currentUser );
};

CurrentUserStore.isSignedIn = function () {
  return ( typeof _currentUser.id !== "undefined" );
};

CurrentUserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.RECEIVE_CURRENT_USER:
        _currentUser = payload.user;
        CurrentUserStore.emit(CHANGE_EVENT);
      break;
  }
};

CurrentUserStore.addChangeHandler = function (callback) {
  this.on(CHANGE_EVENT, callback);
};

CurrentUserStore.removeChangeHandler = function (callback) {
  this.removeListener(CHANGE_EVENT, callback);
};
