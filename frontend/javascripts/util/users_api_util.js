var UserActions = require('../actions/current_user_actions.js');

var UsersApiUtil = {
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
    $.get('api/users/' + user_id, function (user) {
      UserActions.foundUser(user);
    });
  }
};

module.exports = UsersApiUtil;
