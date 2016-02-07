var UserActions = require('../actions/current_user_actions.js');

var SessionsApiUtil = {
  signin: function (credentials, callback) {
    $.ajax({
      url: 'api/session',
      type: 'POST',
      dataType: 'json',
      data: {user: credentials},
      success: function (currentUser) {
        UserActions.receiveUser(currentUser);
        callback && callback();
      }
    });
  },
  // signin: function (credentials, callback) {
  //   $.post('api/session', { user: credentials }, function (currentUser) {
  //     UserActions.receiveUser(currentUser);
  //     callback && callback();
  //   });
  // },
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
  // signout: function () {
  //   $.delete('api/session', function () {
  //     UserActions.receiveUser({});
  //   });
  // },
  fetchCurrentUser: function () {
    $.ajax({
      url: 'api/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        UserActions.receiveUser(currentUser);
      }
    });
  },
  // fetchCurrentUser: function () {
  //   $.get('api/session', function (currentUser) {
  //     UserActions.receiveUser(curentUser);
  //   });
  // }
};
module.exports = SessionsApiUtil;
