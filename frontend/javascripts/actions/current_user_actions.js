var UserDispatcher = require('../dispatcher/dispatcher.js'),
    UserConstants = require('../constants/current_user_constants.js');

var UserActions = {
  receiveUser: function (user) {
    UserDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_CURRENT_USER,
      user: user
    });
  },
  foundUser: function (user) {
    UserDispatcher.dispatch({
      actionType: UserConstants.FOUND_USER,
      user: user
    });
  }
};

module.exports = UserActions;
