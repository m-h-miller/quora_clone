var React = require('react'),
    VotingUtil = require('../../util/voting_util.js'),
    CurrentUserStore = require('../../stores/current_user_store.js');

var QuestionUpvoteButton = React.createClass({
  getInitialState: function () {
    var currentUser = CurrentUserStore.currentUser();
    var id = currentUser["id"];
    var pressed = this.props.upvoters[id] == true ? true : false

    return { pressed: pressed };
  },

  handleUpvote: function () {
    this.setState({ pressed: true });
    VotingUtil.upvoteQuestion(this.props.question_id);
  },

  render: function () {
    var text = this.state.pressed == true ? "voted" : "UPVOTE"

    return <button disabled={this.state.pressed} onClick={this.handleUpvote}> {text} </button>;
  }
});

module.exports = QuestionUpvoteButton;
