var React = require('react'),
    VotingUtil = require('../util/voting_util.js'),
    CurrentUserStore = require('../stores/current_user_store.js');

var UpvoteButton = React.createClass({
  getInitialState: function () {
    return { pressed: false };
  },

  componentDidMount: function () {
    var currentUser = CurrentUserStore.currentUser();
    var id = currentUser["id"];

    if ( this.props.upvoters[id] == true ) {
      this.setState({ pressed: true });
    }
  },

  upvote: function () {
    this.setState({ pressed: true });
    VotingUtil.upvoteQuestion(this.props.question_id);
  },

  render: function () {
    var buttonClass = this.state.pressed == true ? "disabled" : "delete-button"
    var text = this.state.pressed == true ? "UPVOTED" : "UPVOTE"

    return(
        <button className={buttonClass} onClick={this.upvote}> {text} </button>
    );
  }
});

module.exports = UpvoteButton;
