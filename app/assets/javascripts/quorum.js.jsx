$(function () {
  var Router = ReactRouter.Router;
  var Route = ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var Link = ReactRouter.Link;

  var root = document.getElementById('content');

    var injected_content;


    if ( CurrentUserStore.isLoggedIn() ) {
      injected_content = (
        <Router>
          <Route path="/" component={IndexPage}></Route>
          <Route path="/questions/:id" component={QuestionDetail}></Route>
        </Router>
      );
    } else {
      injected_content = (
        <Router>
          <Route path="/" component={ UserForm }></Route>
        </Router>
      );
    }

  React.render((
      injected_content
  ), root);
});
