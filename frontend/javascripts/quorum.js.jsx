
window.React = require('react'),
window.Flux = require('flux'),
window.ReactRouter = require('react-router'),
window.EventEmitter = require('event-emitter'),
  ReactDOM = require('react-dom'),
  Router = ReactRouter.Router,
  Route = ReactRouter.Route,
  IndexRoute = ReactRouter.IndexRoute,
  Link = ReactRouter.Link;

var IndexPage = require('./components/index_page.js.jsx'),
  Header = require('./components/header.js.jsx'),
  SessionForm = require('./components/sessions/new_session.js.jsx'),
  UserForm = require('./components/users/new_user.js.jsx'),
  UserShow = require('./components/users/user_show.js.jsx'),

  AnswersForm = require('./components/answers/answers_form.js.jsx'),
  AnswersIndexItem = require('./components/answers/answers_index_item.js.jsx'),
  AnswersIndex = require('./components/answers/answers_index.js.jsx'),

  QuestionDetail = require('./components/questions/question_detail.js.jsx'),
  QuestionsForm = require('./components/questions/questions_form.js.jsx'),
  QuestionsIndexItem = require('./components/questions/questions_index_item.js.jsx'),
  QuestionsIndex = require('./components/questions/questions_index.js.jsx'),

  App = require('./components/app.js.jsx');


var CurrentUserStore = require('./stores/current_user_store.js'),
  SessionsApiUtil = require('./util/sessions_api_util.js');

window.ApiActions = require('./actions/api_actions.js');
window.CurrentUserActions = require('./actions/current_user_actions.js');

window.AnswerConstants = require('./constants/answer_constants.js');
window.CurrentUserConstants = require('./constants/current_user_constants.js');
window.QuestionConstants = require('./constants/question_constants.js');



window.constants = require('./constants/');
window.Dispatcher = require('./dispatcher/dispatcher.js');
window.stores = require('./stores/');
window.util = require('./util/');





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
