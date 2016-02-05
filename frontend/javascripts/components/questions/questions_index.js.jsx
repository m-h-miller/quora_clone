var React = require('react'),
    QuestionStore = require('../../stores/questions.js'),
    QuestionsIndexItem = require('./questions_index_item.js.jsx')
    ApiUtil = require('../../util/api_util.js');

var QuestionsIndex = React.createClass({
  getInitialState: function () {
    _qs = QuestionStore.all();
    return { questions: _qs, page: 1 };
  },

  componentDidMount: function () {
    // QuestionStore.addChangeListener(this._change);
    this.listener = QuestionStore.addListener(this._change);
    ApiUtil.loadMoreQuestions(this.state.page);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _change: function () {
    this.setState({ questions: QuestionStore.all() });
  },

  handleClick: function(){
    pageNumber = this.state.page + 1;
    ApiUtil.loadMoreQuestions(pageNumber);
    this.setState({ page: pageNumber });
  },

  handleBack: function(){
    pageNumber = this.state.page - 1;
    ApiUtil.loadMoreQuestions(pageNumber);
    this.setState({page: pageNumber});
  },

  render: function () {
    console.log("qs_index state: ");
    console.log(this.state);
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

module.exports = QuestionsIndex;
