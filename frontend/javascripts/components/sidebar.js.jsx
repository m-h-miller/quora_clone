var React = require('react'),
    TopicStore = require('../stores/topics.js'),
    CheckboxGroup = require('react-checkbox-group');

var SideBar = React.createClass({
  getInitialState: function () {
    return { value: []};
  },

  componentDidMount: function () {
    // this.listener = TopicStore.addListener(this._change);
    // ApiUtil.loadTopics();
    ApiUtil.triggerTopics();
  },

  // componentWillUnmount: function () {
  //   this.listener.remove();
  // },

  handleChange: function () {
    var selected = this.refs.topicsGroup.getCheckedValues();
    ApiUtil.updateTopics(selected);
  },

  render: function () {
    return(
      <div className="page-left">
		    <h2 className="main-body-title"> FEEDS </h2>
		    <section className="page-left-content title">
		      Select feeds to display.

          <CheckboxGroup name="topics" value={ this.state.value } ref="topicsGroup" onChange={ this.handleChange }>
            <input className="topic-box" type="checkbox" value="General" /> General
            <input className="topic-box" type="checkbox" value="Ruby" /> Ruby
            <input className="topic-box" type="checkbox" value="Philosophy" /> Philosophy
            <input className="topic-box" type="checkbox" value="Javascript" /> Javascript
            <input className="topic-box" type="checkbox" value="React.js" /> React.js
          </CheckboxGroup>

          </section>
      </div>
    );
  }
});

module.exports = SideBar;
