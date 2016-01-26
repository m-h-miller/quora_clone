window.UsersApiUtil = {
  signup: function (formData, callback) {
    $.ajax({
      url: 'api/users',
      type: 'POST',
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function (user) {
        callback && callback(user);
      },
    });
  },

  fetchUser: function(user_id) {
    $.ajax({
      url: 'api/users/' + user_id,
      type: 'GET',
      dataType: 'json',
      success: function (user) {
        UserActions.foundUser(user);
      }
    });
  }

};
