var React = require('react'),
    TopicStore = require('../../stores/topics.js'),
    TopicsApiUtil = require('../../util/topics_api_util.js'),
    TopicsIndexItem = require('./topics_index_item.js.jsx');

var TopicsIndex = React.createClass({
  getInitialState: function () {
    return { topics: TopicStore.allTopics() };
  },

  componentDidMount: function () {
    this.listener = TopicStore.addListener(this._change);
    TopicsApiUtil.loadAllTopics();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _change: function () {
    this.setState({ topics: TopicStore.allTopics() });
  },

  render: function () {

    return(
      <div className="topics-index-item">

        <p className="answers-header"> Topics: </p>
        <div className="answers-index">
          {this.state.topics.map(function (topic) {
            return <TopicsIndexItem key={ topic.id } topic={ topic } />;
          }.bind(this))}
        </div>
      </div>
    );
  }
});

module.exports = TopicsIndex;
