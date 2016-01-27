var CHANGE_EVENT = "users_change";
var _user = {};

window.UsersStore = $.extend({}, EventEmitter.prototype, {

  addChangeHandler: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeHandler: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  viewedUser: function () {
    return $.extend({}, _user);
  },

  dispatcherId: AppDispatcher.register(function (payload) {
    switch (payload.actionType) {

      case UserConstants.FOUND_USER:
          _user = payload.user;
          UsersStore.emit(CHANGE_EVENT);
        break;

    }
  }),
});
