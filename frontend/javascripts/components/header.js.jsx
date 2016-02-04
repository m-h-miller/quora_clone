var React = require('react');

var Link = require('react-router').Link;


var CurrentUserStore = require('../stores/current_user_store.js'),
    QuestionsForm = require('./questions/questions_form.js.jsx'),
    SessionsApiUtil = require('../util/sessions_api_util.js');

var Header = React.createClass({
	getInitialState: function () {
      return {
        currentUser: CurrentUserStore.currentUser()
      };
    },

  componentDidMount: function () {
    this.listener = CurrentUserStore.addListener(this._onChange);
  },

  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.currentUser()});
  },

  signout: function () {
    SessionsApiUtil.signout();
  },

	displayForm: function () {
		$("#modal").addClass("is-active");
	},

	hideForm: function () {
		$("#modal").removeClass("is-active");
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
		            <Link to={'/users/' + CurrentUserStore.currentUser().id }>
		            	{ CurrentUserStore.currentUser().user_name }
		            </Link>
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
											className="modal-close js-hide-modal"> &times;
										</span>
								<QuestionsForm />
								</article>
								<div className="modal-screen js-hide-modal"></div>
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

module.exports = Header;
