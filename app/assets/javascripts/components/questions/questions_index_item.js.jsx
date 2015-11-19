(function(){

var Link = ReactRouter.Link;

window.QuestionsIndexItem = React.createClass({
  render: function () {
    return(
      <ul className="questions-index-item">
        <li className="questions-index-item-title">
          <Link className="questions-index-title" to={'/questions/' + this.props.question.id}>
            {this.props.question.title}
          </Link>
        </li>
        <br/>
        <li className="questions-index-item-body">{this.props.question.body} </li>
        <li className="questions-index-item-author">
        </li>
      </ul>
    );
  }
});

})();
