var React = require('react'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
    CurrentUserStore = require('../../stores/current_user_store.js'),
    ApiUtil = require('../../util/api_util.js'),
    UpvoteButton = require('../upvote_button.js.jsx');

var QuestionsIndexItem = React.createClass({
  deleteQuestion: function () {
    ApiUtil.deleteQuestion(this.props.question.id);
  },

  upvote: function () {
    VotingUtil.upvote(this.props.question.id);
  },

  render: function () {
    var deleteButton;

    if ( this.props.question.author.user_name === CurrentUserStore.currentUser().user_name ) {
      deleteButton = (<button onClick={ this.deleteQuestion }>DELETE</button>);
    }

    // join topics with commas
    var relevant_topics = [];
    this.props.question.topics.map(function (topic) {
      relevant_topics.push(topic.name);
    });
    if ( relevant_topics.length > 1){
      relevant_topics = relevant_topics.join(', ');
    }
    var time_stamp = this.props.question.created_at.slice(11, 16) + " on " + this.props.question.created_at.slice(0, 10);

    return(
      <div className="questions-index-item group">
        <h6 className="questions-index-item-title">
          <Link className="questions-index-title" to={ '/questions/' + this.props.question.id } author={ this.props.question.author }>
            { this.props.question.title }
          </Link>
        </h6>
        <ul className="questions-index-wrap group">
          <li className="thumb">
            <img src={ this.props.question.author.image_url } className="author-thumb" />
          </li>
          <li className="questions-index-item-author">
            <Link className="questions-index-item-author-link" to={ '/users/' + this.props.question.author.id }>
              <strong>
                { this.props.question.author.user_name }
              </strong>
            </Link> in: <strong>{ relevant_topics }</strong> at: { time_stamp }
          </li>
        </ul>

        <p className="questions-index-item-body">{ this.props.question.body } </p>

        { deleteButton }
        <UpvoteButton upvoters={ this.props.question.user_votes } question_id={ this.props.question.id } />

      </div>
    );
  }
});
module.exports = QuestionsIndexItem;
