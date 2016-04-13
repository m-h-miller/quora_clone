var React = require('react'),
    QuestionStore = require('../../stores/questions.js'),
    TopicStore = require('../../stores/topics.js'),
    QuestionsIndexItem = require('./questions_index_item.js.jsx'),
    ApiUtil = require('../../util/api_util.js');

var QuestionsIndex = React.createClass({
  getInitialState: function () {
    var _qs = QuestionStore.all();
    var _filters = FilterStore.all();
    console.log('Q_index - GIS');
    console.log(_filters);
    return {
      questions: _qs,
      filterTopics: _filters.topics,
      filter: _filters.filter,
      all_filters: _filters,
      page: 1
    };
  },

  componentDidMount: function () {
    this.question_listener = QuestionStore.addListener(this._change);
    this.filter_listener = FilterStore.addListener(this._change);
    var filter = this.state.filter,
        filterTopics = this.state.filterTopics;
    ApiUtil.loadMoreQuestions2(this.state.page, filter, filterTopics);
  },

  componentWillUnmount: function () {
    this.question_listener.remove();
    this.filter_listener.remove();
  },

  _change: function () {
    var filters = FilterStore.all();
    console.log("qIndex _change");
    console.log(filters);
    this.setState({
      questions: QuestionStore.all(),
      filterTopics: filters.filterTopics,
      filter: filters.filter
    });
  },

  handleClick: function(){
    pageNumber = this.state.page + 1;
    var filter = this.state.filter,
        filterTopics = this.state.filterTopics;

    ApiUtil.loadMoreQuestions2(pageNumber, filter, filterTopics);
    this.setState({ page: pageNumber });
  },

  handleBack: function(){
    pageNumber = this.state.page - 1;
    var filter = this.state.filter,
        filterTopics = this.state.filterTopics;

    ApiUtil.loadMoreQuestions2(pageNumber, filter, filterTopics );
    this.setState({ page: pageNumber });
  },

  render: function () {
    var loadMore, back, no_content_message;

    var filtered_questions = [],
        filterTopics = this.state.filterTopics;

    if (filterTopics) {
      this.state.questions.map(function (q) {
        var question_topics = q.topics;
        question_topics.map(function (topic) {

          // i do not believe filterTopics is an array anymore
          if (filterTopics.includes(topic.name)) {
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
          <span className="page"> { this.state.page } </span>;
        </div>
      </div>
    );
  }
});

module.exports = QuestionsIndex;
