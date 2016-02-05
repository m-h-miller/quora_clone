var AppDispatcher = require('./../dispatcher/dispatcher.js');
var UserConstants = require('../constants/current_user_constants.js');
var Store = require('flux/utils').Store;

var _currentUser = {};

// var CHANGE_EVENT = "CURRENT_USER_CHANGE";

var CurrentUserStore = new Store(AppDispatcher);


CurrentUserStore.currentUser = function () {
  // console.log("CUS.cU:");
  // console.log(_currentUser);
  return $.extend({}, _currentUser);
};

CurrentUserStore.isSignedIn = function () {
  console.log("before conditional");
  console.log(_currentUser);

  if ( _currentUser == {} ) {
    return false;
  }
  else {
    console.log("second conditional iSI");
    console.log(_currentUser);
    console.log(_currentUser.id);
    console.log(typeof _currentUser.id);
    return ( typeof _currentUser.id !== "undefined" );
  }
};

CurrentUserStore.storeUser = function (user) {
  console.log("storeUser, then cU:");
  _currentUser = user;
  console.log(_currentUser);
};

CurrentUserStore.__onDispatch = function (payload) {
  // console.log("CUS._currentUser:");
  // console.log(payload.user.user_name);
  switch (payload.actionType) {
    case UserConstants.RECEIVE_CURRENT_USER:
        CurrentUserStore.storeUser(payload.user);
        CurrentUserStore.__emitChange();
      break;
  }
};

// CurrentUserStore.addChangeListener = function (callback) {
//   this.on(CHANGE_EVENT, callback)
// };
//
// CurrentUserStore.removeChangeListener = function (callback) {
//   this.removeListener(CHANGE_EVENT, callback);
// };

module.exports = CurrentUserStore;
