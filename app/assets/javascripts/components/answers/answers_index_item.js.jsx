window.AnswersIndexItem = React.createClass({
  render: function () {
    return(
      <ul className="answers-index-item">
        <br/>
        <li className="answers-index-item-author">{this.props.author.user_name} wrote:
        <br/>
        <li className="answers-index-item-title">
            {this.props.answer.title}
        </li>
        <li className="answers-index-item-body">{this.props.answer.body} </li>
        </li>
      </ul>
    );
  }
});
