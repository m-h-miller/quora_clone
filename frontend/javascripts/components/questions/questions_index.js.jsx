var React = require('react'),
    QuestionStore = require('../../stores/questions.js'),
    FilterStore = require('../../stores/filters.js'),
    QuestionsIndexItem = require('./questions_index_item.js.jsx'),
    ApiUtil = require('../../util/api_util.js');

var QuestionsIndex = React.createClass({
  getInitialState: function () {
    var _qs = QuestionStore.all();
    return {
      questions: _qs,
      page: 1
    };
  },

  componentDidMount: function () {
    this.question_listener = QuestionStore.addListener(this._questionsChange);
    ApiUtil.fetchAllQuestions();
  },

  componentWillUnmount: function () {
    this.question_listener.remove();
  },

  _questionsChange: function () {
    this.setState({ questions: QuestionStore.all() });
  },

  handleClick: function(){
    pageNumber = this.state.page + 1;
    this.setState({ page: pageNumber });
  },

  handleBack: function(){
    pageNumber = this.state.page - 1;
    this.setState({ page: pageNumber });
  },

  render: function () {
    var back_button, forward_button, no_content_message;
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
          return <QuestionsIndexItem key={ question.id } question={ question } />;
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
