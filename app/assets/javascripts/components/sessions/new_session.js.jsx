(function(root) {
  root.SessionForm = React.createClass({
    mixins: [ReactRouter.History],

    submit: function (e) {
      e.preventDefault();

      var credentials = $(e.currentTarget).serializeJSON();
      SessionsApiUtil.login(credentials, function () {
        this.history.pushState(null, "/");
      }.bind(this));
    },



    render: function() {

      return (
        <form onSubmit={ this.submit }>

          <h1>Logn In!</h1>

          <label>
            Username
            <input type="text" name="user_name" />
          </label>

          <label>
            Password
            <input type="password" name="password" />
          </label>

          <button>Log In!</button>
        </form>
      );
    },

  })
})(this);
