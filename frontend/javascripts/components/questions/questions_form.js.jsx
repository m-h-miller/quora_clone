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
    question.question_topics_attributes = [];

    var selected_topic_ids = this.refs.questionTopicsGroup.getCheckedValues();
    var topicAttrs = [];

    selected_topic_ids.forEach(function (topic_id) {
      question.question_topics_attributes.push({
        topic_id: topic_id
      });
    });

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
    var allTopics = this.props.allTopics;

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

            {allTopics.map(function (topic) {
              return(
                <div className="questionsFormTopicListItem" key={ topic.id }>
                  <input type="checkbox" value={topic.id} />
                  <label> { topic.name } </label>
                  <br/>
                </div>
              );
            })}
          </CheckboxGroup>
        </div>

        <button> Ask Question </button><br/>
      </form>
    );
  }
});
module.exports = QuestionsForm;
