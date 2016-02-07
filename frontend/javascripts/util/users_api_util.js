var UserActions = require('../actions/current_user_actions.js');

var UsersApiUtil = {
  // need to read docs on the AJAX syntax i'm trying to use...
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
  },
  // fetchUser: function(user_id) {
  //   $.get('api/users/' + user_id, function (user) {
  //     UserActions.foundUser(user);
  //   });
  // }
};

module.exports = UsersApiUtil;
