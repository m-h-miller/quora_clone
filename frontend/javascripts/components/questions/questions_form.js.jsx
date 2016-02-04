var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util.js');

var QuestionsForm = React.createClass({
  mixins: [LinkedStateMixin],

  defaults: {
    title: "",
    body: ""
  },

  getInitialState: function () {
    return this.defaults;
  },

  submitQuestion: function (e) {
    e.preventDefault();
    var question = { };
    question.title = this.state.title;
    question.body = this.state.body;
    question.author = CurrentUserStore.currentUser().user_name;

    ApiUtil.createQuestion(question, function (id) {
      this.history.pushState(null, "/questions/" + id, {});
    }.bind(this));

    this.setState(this.defaults);
    this.hideForm();
  },

  hideForm: function () {
    $("#modal").removeClass("is-active");
  },

  render: function () {
    return(
      <form className='new-question-form' onSubmit={this.submitQuestion}>
        <div className="group">
          <label htmlFor='question_title'>Title:</label>
          <input
            type='text'
            id='question_title'
            valueLink={this.linkState('title')} />
        </div><br/>

        <div className="group">
          <label htmlFor='question_body'>Body:</label>
          <input
            type='text'
            id='question_body'
            valueLink={this.linkState('body')} />
        </div><br/>

        <div className="group">
          <label htmlFor='question_body'>Body:</label>
          <input
            type='text'
            id='question_body'
            valueLink={this.linkState('body')} />
        </div><br/>

        <button> Ask Question </button><br/>
      </form>
    );
  }
});
module.exports = QuestionsForm;
