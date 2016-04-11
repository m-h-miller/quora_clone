var React = require('react'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
    CurrentUserStore = require('../../stores/current_user_store.js');

var QuestionsIndexItem = React.createClass({
  deleteQuestion: function () {
    ApiUtil.deleteQuestion(this.props.question.id);
  },

  render: function () {
    var deleteButton;

    if ( this.props.question.author.user_name === CurrentUserStore.currentUser().user_name ) {
      deleteButton = (
        <p className="delete-button">
          <button onClick={ this.deleteQuestion }>DELETE</button>
        </p>
      );
    }

    var relevant_topics = [];
    var relevant;
    this.props.question.topics.map(function (topic) {
      relevant_topics.push(topic.name);
    });
    relevant_topics.join(', ');

    var time_stamp = "";
    time_stamp = this.props.question.created_at.slice(11, 16) + " on " + this.props.question.created_at.slice(0, 10);

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
          <li className="questions-index-item-author">

          </li>
        </ul>

        <p className="questions-index-item-body">{ this.props.question.body } </p>
        { deleteButton }
      </div>
    );
  }
});
module.exports = QuestionsIndexItem;
