var AppDispatcher = require('../dispatcher/dispatcher.js'),
    UserConstants = require('../constants/current_user_constants.js'),
    Store = require('flux/utils').Store;

var UsersStore = new Store(AppDispatcher);

var CHANGE_EVENT = "users_change";
var _user = {};

UsersStore.viewedUser = function () {
  return $.extend({}, _user);
};

UsersStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.FOUND_USER:
        _user = payload.user;
        UsersStore.__emitChange();
      break;
  }
};
