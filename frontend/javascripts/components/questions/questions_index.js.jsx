window.QuestionsIndex = React.createClass({
  getInitialState: function () {
    return { questions: QuestionStore.all(), page: 1 };
  },

  componentDidMount: function () {
    QuestionStore.addQuestionsIndexChangeListener(this._change);
    ApiUtil.loadMoreQuestions(this.state.page);
  },

  componentWillUnmount: function () {
    QuestionStore.removeQuestionsIndexChangeListener(this._change);
  },

  _change: function () {
    this.setState({ questions: QuestionStore.all() });
  },

  handleClick: function(){
    pageNumber = this.state.page + 1;
    ApiUtil.loadMoreQuestions(pageNumber);
    this.setState({page: pageNumber});
  },

  handleBack: function(){
    pageNumber = this.state.page - 1;
    ApiUtil.loadMoreQuestions(pageNumber);
    this.setState({page: pageNumber});
  },

  render: function () {
    var loadMore;
    var back;
    var page;
    var no_content;

    page = <span className="page">{this.state.page}</span>

    if (this.state.questions.length !== 0){
      loadMore = <button onClick={this.handleClick} className="load-more">
        <span>load more!</span>
      </button>;
    }

    if (this.state.page !== 1){
      back = <button onClick={this.handleBack} className="load-more">
        <span>go back!</span>
      </button>;
    }

    if (this.state.questions.length == 0){
      no_content = <div className="no_content"> Nothing to show :( </div>;
    }

    return(
      <div className="page-center">
        <h2 className="main-body-title">Top Stories</h2>

          {this.state.questions.map(function (question) {
            return <QuestionsIndexItem key={question.id} question={question} />;
          })}

          {no_content}

        <div className="page-center-footer">
          {back}
          {loadMore}
          {page}

        </div>

      </div>
    );
  }
});
