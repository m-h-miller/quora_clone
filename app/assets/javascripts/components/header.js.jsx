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

		displayForm: function () {
			$("#modal").addClass("is-active");
			$("#darken").addClass("darkened");
		},

		hideForm: function () {
			$("#modal").removeClass("is-active");
			$("#darken").removeClass("darkened");
		},

		render: function () {
			if (CurrentUserStore.isSignedIn()) {
				return (
				  <div className="header-wrap group">
						<div className="header-content">
							<h1 className="header-logo"><a href="#">Quorum</a></h1>

				      <ul className="header-nav group">
			          <li><a href="#">Home</a></li>
			          <li><a href="#">Write</a></li>

			          <li>
			            <a href="#">
			            	{ CurrentUserStore.currentUser().user_name }
			            </a>
			          </li>

			          <li>
			            <button onClick={ this.signout }>SIGN OUT</button>
			          </li>

			          <li>
			          	<button id="ask-question" onClick= { this.displayForm }>
			          		<strong>Ask Question</strong>
			          	</button>
									<section id="modal" className="modal">
						        <article className="modal-content">
						          <span
												onClick= { this.hideForm }
												className="modal-close js-hide-modal">&times;</span>
											<QuestionsForm />
										</article>
										<div class="modal-screen js-hide-modal"></div>
					      	</section>
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
	});




								// <li>
			     //        <a href="#">Notifications
			     //        	<strong className="header-nav-badge">3</strong>
			     //        </a>
			     //        <ul className="header-nav-drop-down">
			     //          <li><a href="#">Someone liked your question.</a></li>
			     //          <li><a herf="#">Someone answered your question.</a></li>
			     //        </ul>
			     //      </li>
