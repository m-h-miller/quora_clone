var React = require('react'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
    CurrentUserStore = require('../../stores/current_user_store.js'),
    ApiUtil = require('../../util/api_util.js'),
    QuestionUpvoteButton = require('./question_upvote_button.js.jsx');

var QuestionsIndexItem = React.createClass({
  deleteQuestion: function () {
    ApiUtil.deleteQuestion(this.props.question.id);
  },

  upvote: function () {
    VotingUtil.upvote(this.props.question.id);
  },

  render: function () {
    var deleteButton;

    // join topics with commas
    var relevant_topics = [];
    this.props.question.topics.map(function (topic) {
      relevant_topics.push(topic.name);
    });
    if ( relevant_topics.length > 1){
      relevant_topics = relevant_topics.join(', ');
    }

    return(
      <div className="questions-index-item">
        <h6 className="title-text">
          <Link to={ '/questions/' + this.props.question.id } >
            { this.props.question.title }
          </Link>
        </h6>
        <ul>
          <li className="thumb">
            <img className="author-thumb" src={ this.props.question.author.image_url } />
          </li>
          <li className="small-grey-text">
            <Link to={ '/users/' + this.props.question.author.id }>
              <strong>
                { this.props.question.author.user_name }
              </strong>
            </Link>

            <br/> in:
              <strong>
                { relevant_topics }
              </strong>

          </li>
        </ul>

        <p className="body-text">{ this.props.question.body } </p>

        { deleteButton }
        <QuestionUpvoteButton upvoters={ this.props.question.upvoters } question_id={ this.props.question.id } />

      </div>
    );
  }
});
module.exports = QuestionsIndexItem;
