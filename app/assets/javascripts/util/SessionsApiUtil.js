var SessionsApiUtil = {
  login: function (credentials, success) {
    console.log("trying to log in");
    $.ajax({
      url: '/session',
      type: 'POST',
      dataType: 'json',
      data: {user: credentials},
      success: function (currentUser) {
        console.log("logged in!");
        UserActions.receiveUser(currentUser);
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
        console.log("fetching");
        UserActions.receiveUser(currentUser);
      }
    });
  }


};
