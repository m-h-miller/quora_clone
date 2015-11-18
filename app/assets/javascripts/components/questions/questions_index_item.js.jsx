window.QuestionsIndexItem = React.createClass({
  render: function () {
    return(
      <ul className="questions-index-item">
        <li className="questions-index-item-title">{this.props.question.title}</li>
        <li className="questions-index-item-body">{this.props.question.body} </li>
        <li> Author: {this.props.question.author.user_name} </li>
      </ul>
    );
  }
});
