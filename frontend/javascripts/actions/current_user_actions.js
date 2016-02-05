var CurrentUserDispatcher = require('../dispatcher/dispatcher.js'),
    UserConstants = require('../constants/current_user_constants.js');

var UserActions = {

  // This is currently not being used.
  receiveUsers: function (users) {
    CurrentUserDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USERS,
      users: users
    });
  },

  receiveUser: function (user) {
    CurrentUserDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_CURRENT_USER,
      user: user
    });
  },

  foundUser: function (user) {
    CurrentUserDispatcher.dispatch({
      actionType: UserConstants.FOUND_USER,
      user: user
    });
  }

};

module.exports = UserActions;
