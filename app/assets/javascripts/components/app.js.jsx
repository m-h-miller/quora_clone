(function(root) {
  root.App = React.createClass({

    getInitialState: function () {
      return { currentUser: null };
    },

    mixins: [ReactRouter.History],

    componentWillMount: function () {
      this._ensureLoggedIn();
      CurrentUserStore.addChangeHandler(this._ensureLoggedIn);
      SessionsApiUtil.fetchCurrentUser();
    },

    _ensureLoggedIn: function () {
      if (!CurrentUserStore.isLoggedIn()) {
        this.history.pushState(null, "/login");
      }

      this.setState({currentUser: CurrentUserStore.currentUser()});
    },

    render: function() {
      if (!this.state.currentUser) {
        return (
          <img src="spinner.gif" />
        );
      }
      return (
        <div>
          <Header />

          { this.props.children }
        </div>
      );
    },

  })
})(this);
