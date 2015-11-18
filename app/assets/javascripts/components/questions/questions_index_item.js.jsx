window.QuestionsIndexItem = React.createClass({
  render: function () {
    return(
      <li className="questions-index-item">
        <p> Title: {this.props.question.title} </p>
        <p> Body: {this.props.question.body} </p>
        <p> Author: {this.props.question.author} </p>
      </li>
    );
  }
});
