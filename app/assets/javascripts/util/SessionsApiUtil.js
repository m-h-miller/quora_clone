var SessionsApiUtil = {
  signin: function (credentials, success) {
    $.ajax({
      url: 'api/session',
      type: 'POST',
      dataType: 'json',
      data: {user: credentials},
      success: function (currentUser) {
        UserActions.receiveUser(currentUser);
        success && success();
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
        UserActions.receiveUser(currentUser);
      }
    });
  }


};
