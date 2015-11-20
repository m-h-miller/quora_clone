(function (root) {
  var CHANGE_EVENT = "userChange";

  var _currentUser = {};

  root.CurrentUserStore = $.extend({}, EventEmitter.prototype, {

    addChangeHandler: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeHandler: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    currentUser: function () {
      return $.extend({}, _currentUser);
    },

    isLoggedIn: function () {
      return (typeof _currentUser.id !== "undefined");
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {

        case CurrentUserConstants.RECEIVE_CURRENT_USER:
            _currentUser = payload.currentUser;
            CurrentUserStore.emit(CHANGE_EVENT);
          break;

      }
    }),
  });
})(this);
