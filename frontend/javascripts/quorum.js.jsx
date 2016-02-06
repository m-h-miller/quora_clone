(function () {

console.log("quorum executed.");

var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute;

// top-level components
var App = require('./components/app.js.jsx'),
    SessionForm = require('./components/sessions/new_session.js.jsx'),
    IndexPage = require('./components/index_page.js.jsx'),
    UserForm = require('./components/users/new_user.js.jsx'),
    UserShow = require('./components/users/user_show.js.jsx'),
    QuestionDetail = require('./components/questions/question_detail.js.jsx');

document.addEventListener("DOMContentLoaded", function () {
  console.log('DOM-Content-Loaded: ')
  ReactDOM.render((
    <Router>
        <Route path="/" component={ App }>
          <IndexRoute component={ IndexPage } />
          <Route path="signin" component={ SessionForm } />
          <Route path="signup" component={ UserForm } />
          <Route path="users/:id" component={ UserShow } />
          <Route path="questions/:id" component={ QuestionDetail } />
        </Route>
    </Router>
  ), document.getElementById('content'));
});
})();
