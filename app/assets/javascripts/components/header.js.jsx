(function(root) {
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

				  <div className="header-wrap group">
				    <h1 className="header-logo"><a href="#">Quorum</a></h1>

			      <ul className="header-nav group">
		          <li><a href="#"><strong>Home</strong></a></li>
		          <li><a href="#"><strong>Write</strong></a></li>

		          <li>
		            <a href="#">Notifications
		            	<strong className="header-nav-badge">3</strong>
		            </a>
		            <ul className="header-nav-drop-down">
		              <li><a href="#">Someone liked your question.</a></li>
		              <li><a herf="#">Someone answered your question.</a></li>
		            </ul>
		          </li>

		          <li>
		            <a href="#">
		            	{CurrentUserStore.currentUser().user_name}
		            </a>
		          </li>

		          <li>
		            <button onClick={ this.logout }>LOG OUT</button>
		          </li>

		          <li>
		          	<a id="ask-question" href="#">
		          		<strong>Ask Question</strong>
		          	</a>
		          </li>

			      </ul>
				  </div>
				);
			} else {
				return (
					<div>
						<a href="/users/new">Sign Up or</a>
					</div>
				);
			}

		}
	})
})(this);
