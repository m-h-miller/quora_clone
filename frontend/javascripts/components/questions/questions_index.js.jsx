var React = require('react'),
    QuestionStore = require('../../stores/questions.js'),
    FilterStore = require('../../stores/filters.js'),
    QuestionsIndexItem = require('./questions_index_item.js.jsx'),
    ApiUtil = require('../../util/api_util.js');

var QuestionsIndex = React.createClass({
  getInitialState: function () {
    var _qs = QuestionStore.all();
    var _filters = FilterStore.all();
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

    ApiUtil.loadMoreQuestions2(pageNumber, filter, filterTopics);
    this.setState({ page: pageNumber });
  },

  render: function () {
    var back_button, forward_button, no_content_message;

    // var filtered_questions = [],
    //     filterTopics = this.state.filterTopics;
    //
    // if (filterTopics) {
    //   this.state.questions.map(function (q) {
    //     var question_topics = q.topics;
    //     question_topics.map(function (topic) {
    //
    //       // i do not believe filterTopics is an array anymore
    //       if (filterTopics.includes(topic.name)) {
    //         filtered_questions.push(q);
    //       }
    //     });
    //   });
    // }

    var qz = this.state.questions;

    if ( qz.length !== 0 ) {
      forward_button = <button onClick={ this.handleClick } className="load-more"> <span> more! </span> </button>;
    } else {
      no_content_message = <div className="no_content"> Select topics in the Sidebar to display content! </div>;
    }

    if ( this.state.page !== 1 ){
      back_button = <button onClick={ this.handleBack } className="load-more"> <span> back! </span> </button>;
    }

    return(
      <div className="page-center">
        <div className="main-body-title">
          <h2>Top Stories</h2>

        </div>

        {qz.map(function (question) {
          return <QuestionsIndexItem
                  key={ question.id }
                  question={ question } />;
        })}

        { no_content_message }

        <div className="page-center-footer">
          { back_button }
          { forward_button }
          <span className="page"> { this.state.page } </span>
        </div>
      </div>
    );
  }
});

module.exports = QuestionsIndex;
