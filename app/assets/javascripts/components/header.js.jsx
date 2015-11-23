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

	  signout: function () {
	    SessionsApiUtil.signout();
	  },

		render: function () {
			if (CurrentUserStore.isSignedIn()) {
				return (
				  <div className="header-wrap group">
						<div className="header-content">
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
			            	{ CurrentUserStore.currentUser().user_name }
			            </a>
			          </li>

			          <li>
			            <button onClick={ this.signout }>SIGN OUT</button>
			          </li>

			          <li>
			          	<a id="ask-question" href="#">
			          		<strong>Ask Question</strong>
			          	</a>
			          </li>

				      </ul>
						</div>
				  </div>
				);
			} else {
				return (
					<div></div>
				);
			}

		}
	})
})(this);
