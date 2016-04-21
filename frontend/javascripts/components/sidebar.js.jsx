var React = require('react'),
    TopicStore = require('../stores/topics.js'),
    CheckboxGroup = require('react-checkbox-group'),
    ApiUtil = require('../util/api_util.js'),
    FilterActions = require('../actions/filter_actions.js');

var SideBar = React.createClass({

  getInitialState: function () {
    return {
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
    // future User checkbox post action
    this._dispatchQuery(this.state.filter, selected);
  },

  // handles dropdown selections
  handleSelect: function (e) {
    var filter = e.target.value;
    this.setState({ filter: filter })

    this._dispatchQuery(filter, this.state.filterTopics);
  },

  // called by handleChange & handleFilter
  _dispatchQuery: function (filter, filterTopics) {
    var filter = filter, filterTopics = filterTopics;
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
                <input className="topic-box" type="checkbox" value={topic.id} />
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
