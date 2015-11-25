window.UsersApiUtil = {
  signup: function (credentials, callback) {
    $.ajax({
      url: 'api/users',
      type: 'POST',
      dataType: 'json',
      data: {user: credentials},
      success: function (user) {
        debugger
        callback && callback(user);
      },
      error: function () {
        debugger;
      }
    });
  }
};
