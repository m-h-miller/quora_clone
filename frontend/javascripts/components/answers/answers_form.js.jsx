var React = require('react'),
    ApiUtil = require('../../util/api_util.js'),
    History = require('react-router').History,
    LinkedStateMixin = require('react-addons-linked-state-mixin');

var AnswersForm = React.createClass({
  // Sooooo why don't I need the history mixin?
  // Ergo I must check whether I need it at ANY of the places
  // that I've included it.
  mixins: [ LinkedStateMixin ],

  defaults: { title: "", body: "" },

  getInitialState: function () {
    return this.defaults;
  },

  submitAnswer: function (e) {
    e.preventDefault();
    var answer = { };
    answer.title = this.state.title;
    answer.body = this.state.body;
    answer.question_id = this.props.question.id;
    ApiUtil.createAnswer(answer, function (question_id) {
      this.history.pushState(null, "/questions/" + question_id, {});
    }.bind(this));
    this.setState(this.defaults);
  },

  render: function () {
    return(
      <form className='new-answer-form' onSubmit={this.submitAnswer}>
        <div>
          <label htmlFor='answer_title'>Title:</label>
          <input type='text' id='answer_title' valueLink={this.linkState('title')} />
        </div>
        <div>
          <label htmlFor='answer_body'>Body:</label>
          <input type='text' id='answer_body' valueLink={this.linkState('body')} />
        </div>
        <button> Answer Question </button>
        <br/>
      </form>
    );
  }
});

module.exports = AnswersForm;
