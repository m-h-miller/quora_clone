var React = require('react'),
    History = require('react-router').History;
    SessionsApiUtil = require('../../util/sessions_api_util.js');

var SessionForm = React.createClass({
  mixins: [ History ],

  defaults: { user_name: "Username", password: "" },

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

  handleContinue: function (e) {
    e.preventDefault();
    var credentials = {
      user_name: "guest",
      password: "password"
    };
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
            <h1> Quorum </h1>
            <h4> The best answer to any question. </h4>
          </div>
          <div className="new-session-form-wrapper">
            <a className="facebook"
              href="/auth/facebook"> Log in with Facebook </a>
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
              <button> Sign In </button>
              <button>
                <a href="#/signup"> Sign up </a>
              </button>
            <button onClick={ this.handleContinue } className="continue-button">
              Continue as Guest
            </button>
            </form>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = SessionForm;
