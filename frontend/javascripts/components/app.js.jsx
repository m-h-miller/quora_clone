var React = require('react'),
    CurrentUserStore = require('../stores/current_user_store.js'),
    SessionsApiUtil = require('../util/sessions_api_util.js'),
    Header = require('./header.js.jsx'),
    History = require('react-router').History;

var App = React.createClass({
  mixins: [ History ],

  getInitialState: function () {
    return { currentUser: CurrentUserStore.currentUser() };
  },

  componentWillMount: function () {
    this.current_user_listener = CurrentUserStore.addListener(this._ensureSignedIn);
    SessionsApiUtil.fetchCurrentUser();
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.location.pathname !== "/signin" &&
        newProps.location.pathname !== "/signup") {
      SessionsApiUtil.fetchCurrentUser();
    }
  },

  _ensureSignedIn: function () {
    if (!CurrentUserStore.isSignedIn()) {
      this.history.pushState(null, "/signin");
    }
    this.setState({ currentUser: CurrentUserStore.currentUser() });
  },

  render: function() {
    var currentUser = this.state.currentUser;

    return (
      <div className="app">
        <Header currentUser={ currentUser } />
        { this.props.children }
      </div>
    );

  },
});

module.exports = App;
