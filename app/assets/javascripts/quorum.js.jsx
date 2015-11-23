$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var Link = ReactRouter.Link;

  var root = document.getElementById('content');

  React.render((
    <Router>
      <Route path="/" component={ App }>
        <IndexRoute component={ IndexPage } />
        <Route path="/questions/:id" component={QuestionDetail} />
        <Route path="signin" component={ SessionForm } />
      </Route>

      <IndexPage />
    </Router>
  ), root);
});
