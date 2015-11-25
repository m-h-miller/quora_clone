window.AnswersIndexItem = React.createClass({
  deleteAnswer: function () {
    ApiUtil.deleteAnswer(this.props.question.id, this.props.answer.id);
  },

  render: function () {
    if ( this.props.answer.author.user_name === CurrentUserStore.currentUser().user_name ) {
      return(
        <ul className="answers-index-item">
          <br/>
          <li className="answers-index-item-author">{this.props.answer.author.user_name} wrote: </li>
          <br/>
          <li className="answers-index-item-title">
              {this.props.answer.title}
          </li>
          <li className="answers-index-item-body">{this.props.answer.body} </li>

          <li className="delete-button">
            <button onClick={ this.deleteAnswer }>DELETE</button>
          </li>
        </ul>
      );
    } else {
      return(
        <ul className="answers-index-item">
          <br/>
          <li className="answers-index-item-author">{this.props.answer.author.user_name} wrote: </li>
          <br/>
          <li className="answers-index-item-title">
              {this.props.answer.title}
          </li>
          <li className="answers-index-item-body">{this.props.answer.body} </li>

        </ul>
      );
    }
  }
});
