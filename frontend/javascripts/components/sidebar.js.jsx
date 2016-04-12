var React = require('react'),
    TopicStore = require('../stores/topics.js'),
    CheckboxGroup = require('react-checkbox-group'),
    TopicsApiUtil = require('../util/topics_api_util.js');

var SideBar = React.createClass({

  getInitialState: function () {
    return {
      value: [],
      allTopics: TopicStore.allTopics()
    };
  },

  componentDidMount: function () {
    this.topic_listener = TopicStore.addListener(this._change);
  },

  componentWillUnmount: function() {
    this.topic_listener.remove();
  },

  _change: function () {
    this.setState({ allTopics: TopicStore.allTopics() });
  },

  handleChange: function () {
    var selected = this.refs.topicsGroup.getCheckedValues();
    TopicsApiUtil.updateSideBarFilters(selected);
  },

  render: function () {
    return(
      <div className="page-left">
		    <h2 className="main-body-title"> FEEDS </h2>
		    <section className="page-left-content title">
		      Select feeds to display.

          <CheckboxGroup name="topics" value={ this.state.value } ref="topicsGroup" onChange={ this.handleChange }>
            {this.state.allTopics.map(function (topic) {
              return (
              <div key={topic.id}>
                <input className="topic-box" type="checkbox"
                  value={topic.name} />
                  {topic.name}
              </div>
              );
            })}
          </CheckboxGroup>

          </section>
      </div>
    );
  }
});

module.exports = SideBar;
