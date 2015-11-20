var SessionsApiUtil = {
  login: function (credentials, success) {
    $.ajax({
      url: '/session',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function (currentUser) {
        console.log("logged in!");
        ApiActions.receiveCurrentUser(currentUser);
        success && success();
      }
    });
  },

  logout: function (  ) {
    $.ajax({
      url: '/session',
      type: 'DELETE',
      dataType: 'json',
      success: function () {
        console.log("logged out!");
        ApiActions.receiveCurrentUser({});
      }
    });
  },

  fetchCurrentUser: function () {
    $.ajax({
      url: '/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        ApiActions.receiveCurrentUser(currentUser);
      }
    });
  }


};
