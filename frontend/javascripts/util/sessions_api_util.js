var UserActions = require('../actions/current_user_actions.js');

var SessionsApiUtil = {
  fetchCurrentUser: function () {
    $.get('api/session', function (currentUser) {
      UserActions.receiveUser(currentUser);
    });
  },
  signin: function (credentials, callback) {
    $.post('api/session', { user: credentials }, function (currentUser) {
      UserActions.receiveUser(currentUser);
      callback && callback();
    });
  },
  signout: function (  ) {
    $.ajax({
      url: 'api/session',
      type: 'DELETE',
      dataType: 'json',
      success: function () {
        UserActions.receiveUser({});
      }
    });
  },

};
module.exports = SessionsApiUtil;
