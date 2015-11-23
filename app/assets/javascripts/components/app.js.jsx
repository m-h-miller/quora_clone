(function(root) {
  root.App = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return { currentUser: null };
    },

    componentWillMount: function () {
      this._ensureSignedIn();
      CurrentUserStore.addChangeHandler(this._ensureSignedIn);
      SessionsApiUtil.fetchCurrentUser();
    },

    _ensureSignedIn: function () {
      if (!CurrentUserStore.isSignedIn()) {
        this.history.pushState(null, "/signin");
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