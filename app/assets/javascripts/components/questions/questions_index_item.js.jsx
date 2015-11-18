window.QuestionsIndexItem = React.createClass({
  render: function () {
    return(
      <li className="questions-index-item">
        <p className="questions-index-item-title"> Title: {this.props.question.title} </p>
        <p> Body: {this.props.question.body} </p>
        <p> Author: {this.props.question.author_id} </p>
      </li>
    );
  }
});
