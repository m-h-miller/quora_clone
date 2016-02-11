var React = require('react'),
    QuestionStore = require('../../stores/questions.js'),
    TopicStore = require('../../stores/topics.js'),
    QuestionsIndexItem = require('./questions_index_item.js.jsx')
    ApiUtil = require('../../util/api_util.js');

var QuestionsIndex = React.createClass({
  getInitialState: function () {
    _qs = QuestionStore.all();
    _ts = TopicStore.all();
    return { questions: _qs, topics: _ts, page: 1 };
  },

  componentDidMount: function () {
    this.listener = QuestionStore.addListener(this._change);
    this.topic_listener = TopicStore.addListener(this._change);
    ApiUtil.loadMoreQuestions(this.state.page);
  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.topic_listener.remove();
  },

  _change: function () {
    this.setState({ questions: QuestionStore.all(), topics: TopicStore.all() });
  },

  handleClick: function(){
    pageNumber = this.state.page + 1;
    ApiUtil.loadMoreQuestions(pageNumber);
    this.setState({ page: pageNumber });
  },

  handleBack: function(){
    pageNumber = this.state.page - 1;
    ApiUtil.loadMoreQuestions(pageNumber);
    this.setState({ page: pageNumber });
  },

  render: function () {
    var loadMore, back, no_content;
    var page = <span className="page">{this.state.page}</span>;

    var filtered = [];
    var topics = this.state.topics;

    // if (this.state.questions.length !== 0) {
      this.state.questions.forEach(function (q) {
        var topic = q.topics[0];
        if (topics.includes(topic.name)) {
          filtered.push(q);
        }
      });
    // }

    // if (this.state.questions.length !== 0){
    if (filtered.length !== 0){
      loadMore = <button onClick={this.handleClick} className="load-more">
        <span> load more! </span>
      </button>;
    }

    if (this.state.page !== 1){
      back = <button onClick={this.handleBack} className="load-more">
        <span> go back! </span>
      </button>;
    }

    // if (this.state.questions.length == 0){
    if (filtered.length == 0){
      no_content = <div className="no_content"> Nothing to show :( </div>;
    }



    return(
      <div className="page-center">
        <h2 className="main-body-title">Top Stories</h2>
          {filtered.map(function (question) {
            return <QuestionsIndexItem key={question.id} question={question} />;
          })}
          { no_content }
        <div className="page-center-footer">
          { back }
          { loadMore }
          { page }
        </div>
      </div>
    );
  }
});

module.exports = QuestionsIndex;
