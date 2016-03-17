var React = require('react'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util.js'),
    History = require('react-router').History,
    CurrentUserStore = require('../../stores/current_user_store.js'),
    CheckboxGroup = require('react-checkbox-group');

var QuestionsForm = React.createClass({
  mixins: [ LinkedStateMixin, History ],

  defaults: { title: "", body: "" },

  getInitialState: function () {
    return this.defaults;
  },

  submitQuestion: function (e) {
    e.preventDefault();
    var question = { };

    question.title = this.state.title;
    question.body = this.state.body;
    question.author = CurrentUserStore.currentUser().user_name;
    question.question_topics_attributes = [];

    var selected = this.refs.questionTopicsGroup.getCheckedValues(),
        topicAttrs = [];


    console.log("selected before *General default logic* : ");
    console.log(selected);

    if ( selected === [] ){
      question.question_topics_attributes.push("General");
    }

    console.log("after :");
    console.log(selected);

    selected.forEach(function (topic) {
      question.question_topics_attributes.push({
        topic_id: topic.id
      });
    });

    console.log("question.question_topics_attributes")
    console.log(question.question_topics_attributes);

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
    console.log("this: (from q_form)");
    console.log(this);
    return(
      <form className='new-question-form' onSubmit={this.submitQuestion}>
        <div className="group">
          <label htmlFor='question_title'>Title:</label>
          <input type='text' id='question_title' valueLink={this.linkState('title')} />
        </div><br/>

        <div className="group">
          <label htmlFor='question_body'>Body:</label>
          <input type='text' id='question_body' valueLink={this.linkState('body')} />
        </div><br/>

        <div>
          <label htmlFor='question_body'>Topics:</label>
          <CheckboxGroup name="topics" value={ this.state.value } ref="questionTopicsGroup">

            <input type="checkbox" value="General" /> General
            <input type="checkbox" value="Ruby" /> Ruby
            <input type="checkbox" value="Philosophy" /> Philosophy
            <input type="checkbox" value="Javascript" /> Javascript
            <input type="checkbox" value="React.js" /> React.js
          </CheckboxGroup>
        </div>

        <button> Ask Question </button><br/>
      </form>
    );
  }
});
module.exports = QuestionsForm;
