var React = require('react'),
    TopicStore = require('../stores/topics.js'),
    CheckboxGroup = require('react-checkbox-group'),
    TopicsApiUtil = require('../util/topics_api_util.js');

var SideBar = React.createClass({

  getInitialState: function () {
    return {
      value: [],
      allTopics: TopicStore.allTopics(),
      filterTopics: [],
      filter: "new"
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

  // handles checkbox selections
  handleCheckbox: function () {
    var selected = this.refs.topicsGroup.getCheckedValues();
    this.setState({ filterTopics: selected });

    // double check. this is just triggering a re-render
    // of Q-index, but logic for that will go through
    // Q store once I have this dispatching queries

    // TopicsApiUtil.updateSideBarFilters(selected);
    // can it be so simple?
    _dispatchQuery();
  },

  // handles dropdown selections
  handleSelect: function (e) {
    var filter = e.target.value;
    this.setState({ filter: filter })

    // can it be so simple?
    _dispatchQuery();
  },

  // called by handleChange & handleFilter
  _dispatchQuery: function () {
    var filter = this.state.filter,
        filterTopics = this.state.selectedTopics;

    ApiUtil.loadMoreQuestions2(1, filter, filterTopics);
  },



  render: function () {
    return(
      <div className="page-left">
		    <h2 className="main-body-title"> FEEDS </h2>
		    <section className="page-left-content title">

          FILTER:

          <div style={{padding:"4px"}}/>

          <select name="index-filter" onChange={ this.handleSelect }>
            <option value="new"> New </option>
            <option value="old"> Old </option>
          </select>
          <div style={{padding:"4px"}}/>


          SHOWN:
          <div style={{padding:"4px"}}/>

          <CheckboxGroup name="topics" value={ this.state.value } ref="topicsGroup" onChange={ this.handleCheckbox }>
            {this.state.allTopics.map(function (topic) {
              return (
              <div key={topic.id}>
                <input className="topic-box" type="checkbox" value={topic.name} />
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
