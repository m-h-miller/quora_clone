(function(root) {
  root.SessionForm = React.createClass({

    mixins: [ReactRouter.History],

    defaults: {
      user_name: "Username",
      password: ""
    },

    getInitialState: function () {
      return this.defaults;
    },

    submit: function (e) {
      e.preventDefault();

      var credentials = $(e.currentTarget).serializeJSON();
      SessionsApiUtil.signin(credentials, function () {
        this.history.pushState(null, "/");
      }.bind(this));
    },



    render: function() {

      return (
        <div className="new-session">

          <div className="new-session-background "></div>
          <div className="new-session-gradient"></div>

          <div className="new-session-content">
            <div className="new-session-header">
              <h1>
                Quorum
              </h1>
              <h4>
                The best answer to any question.
              </h4>
            </div>

            <div className="new-session-form-wrapper">
              <form className="new-session-form group" onSubmit={ this.submit }>
                <label>
                  Username
                  <input type="text" name="user_name" />
                </label>
                <label>
                  Password
                  <input type="password" name="password" />
                </label>
                <br/>
                <button>Sign In</button>
              </form>
            </div>
          </div>
        </div>
      );
    },

  })
})(this);