var React = require('react'),
  ReactDOM = require('react-dom'),
  ReactRouter = require('react-router'),
  Router = ReactRouter.Router,
  Route = ReactRouter.Route,
  IndexRoute = ReactRouter.IndexRoute,
  Link = ReactRouter.Link;

var IndexPage = require('./components/index_page.js.jsx'),
  SessionForm = require('./components/sessions/new_session.js.jsx'),
  UserForm = require('./components/users/new_user.js.jsx'),
  QuestionDetail = require('./components/questions/question_detail.js.jsx'),
  UserShow = require('./components/users/user_show.js.jsx'),
  Header = require('./components/header.js.jsx');

var CurrentUserStore = require('./stores/current_user_store.js'),
  SessionsApiUtil = require('./sessions_api_util.js');


// define app before including it in routes
var App = React.createClass({
  mixins: [ReactRouter.History],
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

var routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ IndexPage } />
    <Route path="signin" component={ SessionForm } />
    <Route path="signup" component={ UserForm } />
    <Route path="questions/:id" component={QuestionDetail} />
    <Route path="users/:id" component={ UserShow } />
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("content");
  ReactDOM.render(
    <Router>{routes}</Router>,
    root
  );
});
