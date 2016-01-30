var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Flux = require('flux'),
    EventEmitter = require('event-emitter'),
    IndexRoute = ReactRouter.IndexRoute,
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
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
    SessionsApiUtil = require('./util/sessions_api_util.js'),
    ApiActions = require('./actions/api_actions.js'),
    CurrentUserActions = require('./actions/current_user_actions.js'),
    AnswerConstants = require('./constants/answer_constants.js'),
    CurrentUserConstants = require('./constants/current_user_constants.js'),
    QuestionConstants = require('./constants/question_constants.js');

// window.CurrentUserStore = require('./stores/current_user_store.js');
// require('./stores/questions.js');
// require('./stores/users_store.js');
//
//
// require('./util/api_util.js');
// require('./util/sessions_api_util.js');
// require('./util/users_api_util.js');




var routes = (
  <Route path="/" component={ App }>
    <IndexRoute component={ IndexPage } />
    <Route path="signin" component={ SessionForm } />
    <Route path="signup" component={ UserForm } />
    <Route path="questions/:id" component={ QuestionDetail } />
    <Route path="users/:id" component={ UserShow } />
  </Route>
);

// var root = document.getElementById("content");
// ReactDOM.render((
//   <Router>
//     <Route path="/" component={ App } >
//       <IndexRoute component={ IndexPage } />
//
//       <Route path="signin" component={ SessionForm } />
//       <Route path="signup" component={ UserForm } />
//
//       <Route path="questions/:id" component={QuestionDetail} />
//       <Route path="users/:id" component={ UserShow } />
//     </Route>
//   </Router>
// ), root);

document.addEventListener("DOMContentLoaded", function () {
  var content = document.getElementById('content');

  if (content) {
    ReactDOM.render(
      <Router>
          { routes }
        </Router>,
      content
    );
  }
});
