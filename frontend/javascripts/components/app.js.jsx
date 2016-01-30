var React = require('react'),
    Header = require('./header.js.jsx'),
    CurrentUserStore = require('../stores/current_user_store.js'),
    SessionsApiUtil = require('../util/sessions_api_util.js');

var App = React.createClass({
  getInitialState: function () {
    return { currentUser: null };
  },
  componentWillMount: function () {
    CurrentUserStore.addChangeHandler(this._ensureSignedIn);
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
    this.setState({currentUser: CurrentUserStore.currentUser()});
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
