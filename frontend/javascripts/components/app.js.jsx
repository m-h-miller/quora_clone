var React = require('react'),
    Header = require('./header.js.jsx'),
    CurrentUserStore = require('../stores/current_user_store.js'),
    Store = require('flux/utils').Store;
    SessionsApiUtil = require('../util/sessions_api_util.js'),
    History = require('react-router').History;

var App = React.createClass({
  mixins: [ History ],

  getInitialState: function () {
    return { currentUser: null };
  },

  componentWillMount: function () {
    this.listener = CurrentUserStore.addListener(this._ensureSignedIn);
    SessionsApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    this.listener.remove();
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
    return (
      <div>
        <Header />
        { this.props.children }
      </div>
    );
  },
});

module.exports = App;
