var SessionsApiUtil = {
  signin: function (credentials, success) {
    console.log("trying to log in");
    $.ajax({
      url: '/session',
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
      url: '/session',
      type: 'DELETE',
      dataType: 'json',
      success: function () {
        UserActions.receiveUser({});
      }
    });
  },

  fetchCurrentUser: function () {
    $.ajax({
      url: '/session/new',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        UserActions.receiveUser(currentUser);
      }
    });
  }


};
