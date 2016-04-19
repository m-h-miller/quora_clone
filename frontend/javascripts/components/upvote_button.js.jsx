var React = require('react'),
    VotingUtil = require('../util/voting_util.js'),
    CurrentUserStore = require('../stores/current_user_store.js');

var UpvoteButton = React.createClass({

  getInitialState: function () {
    var currentUserID = CurrentUserStore.currentUser().id,
        pressed = false;

    if (!!this.props.upvoters) {
      this.props.upvoters.forEach(function (upvoter) {
        if ( upvoter["user_id"] == currentUserID.toString() ){
          pressed = true;
        }
      });
    }

    if ( this.props.upvoters.includes(currentUserID) ) {
      pressed = true;
    }
    return { pressed: pressed };
  },

  componentDidMount: function () {
    var currentUserID = CurrentUserStore.currentUser().id;

    if ( this.props.upvoters.includes(currentUserID) ) {
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
        <button onClick={ this.upvote }> { text } </button>
    );
  }
});

module.exports = UpvoteButton;
