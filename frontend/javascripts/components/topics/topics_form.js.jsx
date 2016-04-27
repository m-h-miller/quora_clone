var React = require('react'),
    History = require('react-router').History,
    TopicsApiUtil = require('../../util/topics_api_util.js'),
    TopicStore = require('../../stores/topics.js'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');


var TopicsForm = React.createClass({

  mixins: [ LinkedStateMixin, History ],

  defaults: { name: "", description: "" },


  getInitialState: function () {
    return { name: "", description: "" };
  },

  _handleSubmit: function (e) {
    e.preventDefault();
    var topic = {};
    topic.name = this.state.name;
    topic.description = this.state.description;
    TopicsApiUtil.createTopic(topic);
    this.setState(this.defaults);
  },

  render: function () {
    return(
      <form className='new-answer-form' onSubmit={this._handleSubmit}>
        <div>
          <label htmlFor='topic_name'>Topic name:</label>
          <input type='text' id='topic_name' valueLink={this.linkState('name')} />
        </div>
        <div>
          <label htmlFor='topic_description'>Description:</label>
          <input type='text' id='topic_description' valueLink={this.linkState('description')} />
        </div>
        <button> Create Topic </button>
        <br/>
      </form>
    );
  },

});

module.exports = TopicsForm;
