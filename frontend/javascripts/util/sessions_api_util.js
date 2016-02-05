var UserActions = require('../actions/current_user_actions.js');

var SessionsApiUtil = {
  signin: function (credentials, callback) {
    $.ajax({
      url: 'api/session',
      type: 'POST',
      dataType: 'json',
      data: {user: credentials},
      success: function (currentUser) {
        console.log("sign in success");
        UserActions.receiveUser(currentUser);
        callback && callback();
      }
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

  fetchCurrentUser: function () {
    $.ajax({
      url: 'api/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        console.log("success: fetchCU;");
        console.log(currentUser);
        UserActions.receiveUser(currentUser);
      }
    });
  }
};
module.exports = SessionsApiUtil;
