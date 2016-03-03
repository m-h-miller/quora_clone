var React = require('react'),
    Link = require('react-router').Link,
    CurrentUserStore = require('../stores/current_user_store.js'),
    QuestionsForm = require('./questions/questions_form.js.jsx'),
    SessionsApiUtil = require('../util/sessions_api_util.js'),
    Search = require('./search.js.jsx');

var Header = React.createClass({

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
    var currentUser = this.props.currentUser;

    if ( currentUser.id ) {

  		return (
  		  <div className="header-wrap group">
  				<div className="header-content">
  					<h1 className="header-logo">
              <a href="#"> Quorum </a>
            </h1>

            < Search />

            <ul className="header-nav group">

              <li>
                <button id="ask-question" onClick= { this.displayForm }>
                  <strong> Ask Question </strong>
                </button>
                <section id="modal" className="modal">
                  <article className="modal-content">
                    <span onClick= { this.hideForm } className="modal-close js-hide-modal">
                      &times;
                    </span>
                    <QuestionsForm />
                  </article>
                  <div className="modal-screen js-hide-modal"></div>
                </section>
              </li>
  	          <li className="header-text-link">
                <a href="#"> Home </a>
              </li>
  	          <li className="header-text-link">
                <a href="#"> Write </a>
              </li>
  	          <li className="header-text-link">
  	            <Link to={'/users/' + currentUser.id }>
  	            	{ currentUser.user_name }
  	            </Link>
  	          </li>
  	          <li>
  	            <button onClick={ this.signout }>SIGN OUT</button>
  	          </li>
  		      </ul>
  				</div>
  		  </div>
  		);
    } else {
      return (
        <div> Log in... </div>
      )
    }
	}
});

module.exports = Header;
