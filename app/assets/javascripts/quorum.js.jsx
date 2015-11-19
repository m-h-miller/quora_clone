$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var Link = ReactRouter.Link;

  var root = document.getElementById('content');

  React.render((
    <Router>
      <Route path="/" component={IndexPage}>
      </Route>
      <Route path="/questions/:id" component={QuestionDetail}></Route>
    </Router>
  ), root);
});
