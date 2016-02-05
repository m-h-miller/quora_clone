var React = require('react'),
    ApiUtil = require('../../util/api_util.js'),
    CurrentUserStore = require('../../stores/current_user_store.js');

var AnswersIndexItem = React.createClass({
  deleteAnswer: function () {
    ApiUtil.deleteAnswer(this.props.question.id, this.props.answer.id);
  },

  render: function () {
    var deleteButton;

    if ( this.props.answer.author.user_name === CurrentUserStore.currentUser().user_name ) {
      deleteButton = (
        <p className="delete-button">
          <button onClick={ this.deleteQuestion }>DELETE</button>
        </p>
      );
    }

    return(
      <ul className="answers-index-item">
        <li className="answers-index-item-title">
          { this.props.answer.title }
        </li>
        <ul className="questions-index-wrap group">
          <li className="thumb">
            <img src={ this.props.question.author.image_url } className="author-thumb" />
          </li>
          <li className="answers-index-item-author">
            { this.props.answer.author.user_name } wrote:
          </li>
        </ul>
        <br/>
        <li className="answers-index-item-body">
          { this.props.answer.body }
        </li>
        { deleteButton }
      </ul>
    );
  }
});

module.exports = AnswersIndexItem;
