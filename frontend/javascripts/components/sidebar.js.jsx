var React = require('react'),
    TopicStore = require('../stores/topics.js'),
    CheckboxGroup = require('react-checkbox-group'),
    ApiUtil = require('../util/api_util.js'),
    SessionsApiUtil = require('../util/sessions_api_util.js'),
    TopicsApiUtil = require('../util/topics_api_util.js'),
    FilterActions = require('../actions/filter_actions.js'),
    CurrentUserStore = require('../stores/current_user_store.js');

var SideBar = React.createClass({

  getInitialState: function () {

    var cU = CurrentUserStore.currentUser(),
        values = [];

    if ( cU.topics ) { values = Object.keys(cU.topics) };

    return {
      allTopics: TopicStore.allTopics(),
      filter: "new",
      value: values
    };
  },

  componentDidMount: function () {
    this.topic_listener = TopicStore.addListener(this._change);
    this._dispatchQuery(this.state.filter, this.state.value);
  },

  componentWillUnmount: function() {
    this.topic_listener.remove();
  },

  _change: function () {
    var cU = CurrentUserStore.currentUser().topics;
    var values = [];

    if ( cU ) { values = Object.keys(cU); }

    this.setState({ allTopics: TopicStore.allTopics(), value: values });
  },

  handleCheckbox: function () {
    var values = this.refs.topicsGroup.getCheckedValues();
    this.setState({ value: values });
    this._dispatchQuery(this.state.filter, values);
  },

  handleSelect: function (e) {
    var filter = e.target.value;
    this.setState({ filter: filter })
    this._dispatchQuery(filter, this.state.value);
  },

      // called by handleChange & handleFilter
  _dispatchQuery: function (filter, value) {
    var filter = filter, value = value;
    ApiUtil.loadMoreQuestions2(1, filter, value);
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
