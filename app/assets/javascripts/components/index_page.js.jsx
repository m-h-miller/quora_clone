window.IndexPage = React.createClass({
  render: function () {
    return(
      <div>
        <div className="index-page">
          {this.props.children}
          <QuestionsIndex />
        </div>
      </div>
    );
  }
});
