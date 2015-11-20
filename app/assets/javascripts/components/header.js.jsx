window.Header = React.createClass({

  getInitialState: function () {
    return {
      currentUser: CurrentUserStore.currentUser()
    };
  },

  componentDidMount: function () {
    CurrentUserStore.addChangeHandler(this._onChange);
  },

  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.currentUser()});
  },

  logout: function () {
    SessionsApiUtil.logout();
  },

  render: function () {

    if (CurrentUserStore.isLoggedIn()) {
      return (
      <header class="header">
        <div class="header-wrap group">
          <h1 class="header-logo">
            <a href="#">Quorum</a>
          </h1>

          <nav class="header-nav">
            <ul class="group">

                <li><a href="#"><strong>Home</strong></a></li>
                <li><a href="#"><strong>Write</strong></a></li>
                <li>
                  <a href="#">Notifications <strong class="header-nav-badge">3</strong></a>
                  <ul class="header-nav-drop-down">
                    <li><a href="#">Someone liked your question.</a></li>
                    <li><a herf="#">Someone answered your question.</a></li>
                  </ul>
                </li>


                <div>
                  Logged in as
                  { this.state.currentUser.email }
                  <button onClick={ this.logout }>LOG OUT</button>
              </div>
                <li ><a id="ask-question" href="#"><strong>Ask Question</strong></a></li>

            </ul>
          </nav>

        </div>
      </header>
    )} else {
      return (
        <div>
          <a href="#/login">Login</a>
        </div>
      )
    }
  }
});
