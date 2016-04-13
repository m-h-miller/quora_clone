var React = require('react'),
    QuestionStore = require('../../stores/questions.js'),
    TopicStore = require('../../stores/topics.js'),
    QuestionsIndexItem = require('./questions_index_item.js.jsx'),
    ApiUtil = require('../../util/api_util.js');

var QuestionsIndex = React.createClass({
  getInitialState: function () {
    var _qs = QuestionStore.all();
    var _filters = FilterStore.all();
    return {
      questions: _qs,
      topics: _ts,
      filterTopics: _filters.topics,
      dropdown: _filters.dropdown,
      page: 1
    };
  },

  componentDidMount: function () {
    this.listener = QuestionStore.addListener(this._change);
    this.filter_listener = FilterStore.addListener(this._change);
    ApiUtil.loadMoreQuestions(this.state.page);
  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.topic_listener.remove();
  },

  _change: function () {
    this.setState({ questions: QuestionStore.all(), selected_topics: TopicStore.allFilters() });
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
    var loadMore, back, no_content_message;
    var page = <span className="page"> { this.state.page } </span>;

    var filtered_questions = [],
        selected_topics = this.state.selected_topics;

    if (selected_topics) {
      this.state.questions.map(function (q) {
        var question_topics = q.topics;
        question_topics.map(function (topic) {
          if (selected_topics.includes(topic.name)) {
            filtered_questions.push(q);
          }
        });
      });
    }

    if ( filtered_questions.length !== 0 ) {
      loadMore = <button onClick={ this.handleClick } className="load-more"> <span> load more! </span> </button>;
    } else {
      no_content_message = <div className="no_content"> Select topics in the Sidebar to display content! </div>;
    }

    if ( this.state.page !== 1 ){
      back = <button onClick={ this.handleBack } className="load-more"> <span> go back! </span> </button>;
    }

    return(
      <div className="page-center">
        <div className="main-body-title">
          <h2>Top Stories</h2>

        </div>

        {filtered_questions.map(function (question) {
          return <QuestionsIndexItem
                  key={ question.id }
                  question={ question } />;
        })}

        { no_content_message }

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
