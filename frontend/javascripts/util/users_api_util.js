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

  fetchUser: function (user_id) {
    $.get('api/users/' + user_id, function (user) {
      UserActions.foundUser(user);
    });
  },

  toggleFollow: function (user_id, topic_id, _destroy) {
    $.ajax({
      url: 'api/users/' + user_id,
      type: 'PATCH',
      data: { topic_ids: topic_id, _destroy: _destroy },
      success: function (user) {
        console.log("success");
      }
    });
  },


};

module.exports = UsersApiUtil;
