var React = require('react'),
    CurrentUserStore = require('../stores/current_user_store.js'),
    SessionsApiUtil = require('../util/sessions_api_util.js'),
    Header = require('./header.js.jsx'),
    History = require('react-router').History;

// var CHANGE_EVENT = "CURRENT_USER_CHANGE";

var App = React.createClass({
  mixins: [ History ],

  getInitialState: function () {
    return { currentUser: null };
  },

  componentWillMount: function () {
    // CurrentUserStore.addChangeListener(this._ensureSignedIn);
    this.listener = CurrentUserStore.addListener(this._ensureSignedIn);
    SessionsApiUtil.fetchCurrentUser();
  },

  // I do not believe this component ought ever unmount.
  // componentWillUnmount: function () {
  //   // this.listener.remove();
  //   CurrentUserStore.removeChangeListener(this._ensure_)
  // },

  componentWillReceiveProps: function (newProps) {
    console.log("newProps:");
    console.log(newProps);
    if (newProps.location.pathname !== "/signin" &&
        newProps.location.pathname !== "/signup") {
      SessionsApiUtil.fetchCurrentUser();
    }
  },

  _ensureSignedIn: function () {
    console.log("_ensureSignedIn");

    if (!CurrentUserStore.isSignedIn()) {
      this.history.pushState(null, "/signin");
    }
    this.setState({ currentUser: CurrentUserStore.currentUser() });
  },

  render: function() {
    console.log("rendered");

    return (
      <div className="app">
        <Header />
        { this.props.children }
      </div>
    );
  },
});

module.exports = App;
