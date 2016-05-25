var React = require('react'),
    Link = require('react-router').Link,
    CurrentUserStore = require('../stores/current_user_store.js'),
    QuestionsForm = require('./questions/questions_form.js.jsx'),
    SessionsApiUtil = require('../util/sessions_api_util.js'),
    Search = require('./search.js.jsx'),
    TopicsApiUtil = require('../util/topics_api_util.js'),
    TopicStore = require('../stores/topics.js');

var Header = React.createClass({

  getInitialState: function () {
    return {
      allTopics: TopicStore.allTopics()
    };
  },

  componentDidMount: function () {
    this.listener = TopicStore.addListener(this._change);
    TopicsApiUtil.loadAllTopics();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _change: function () {
    this.setState({ allTopics: TopicStore.allTopics() });
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
    var currentUser = this.props.currentUser;

    if ( currentUser.id ) {
  		return (
  		  <div className="header-wrap">
  				<div className="header-content">
  					<h1 className="header-logo">
              <a href="#"> Quorum </a>
            </h1>

            < Search />

            <ul className="header-nav">
              <li>
                <button id="ask-question" onClick= { this.displayForm }>
                  <strong> Ask Question </strong>
                </button>
                <section id="modal" className="modal">
                  <article className="modal-content">
                    <span onClick= { this.hideForm } className="modal-close js-hide-modal">
                      &times;
                    </span>

                    <QuestionsForm allTopics={ this.state.allTopics } />

                  </article>
                  <div className="modal-screen js-hide-modal"></div>
                </section>
              </li>

  	          <li className="header-text-link">
                <a href="#"> Home </a>
              </li>

  	          <li className="header-text-link">
                <Link to={'/topics/'}>
                  Topics
                </Link>
              </li>

  	          <li className="header-text-link">
  	            <Link to={'/users/' + currentUser.id }>
  	            	{ currentUser.user_name.split(" ", 1) }
  	            </Link>
  	          </li>

  	          <li className="header-text-link">
  	            <button onClick={ this.signout }>SIGN OUT</button>
  	          </li>
  		      </ul>
  				</div>
  		  </div>
  		);
    } else {
      return (
        <div></div>
      )
    }
	}
});

module.exports = Header;
