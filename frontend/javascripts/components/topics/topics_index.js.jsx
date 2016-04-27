var React = require('react'),
    TopicStore = require('../../stores/topics.js'),
    TopicsApiUtil = require('../../util/topics_api_util.js'),
    TopicsIndexItem = require('./topics_index_item.js.jsx'),
    CurrentUserStore = require('../../stores/current_user_store.js');

var TopicsIndex = React.createClass({
  getInitialState: function () {
    var cU = CurrentUserStore.currentUser();
    var user_topics = cU.topics;

    return { topics: TopicStore.allTopics(), user_topics: user_topics };
  },

  componentDidMount: function () {
    this.listener = TopicStore.addListener(this._change);
    this.user_listener = CurrentUserStore.addListener(this._change);

    TopicsApiUtil.loadAllTopics();
  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.user_listener.remove();
  },

  _change: function () {
    var cU = CurrentUserStore.currentUser();
    var user_topics = cU.topics;

    this.setState({ topics: TopicStore.allTopics(), user_topics: user_topics });
  },

  render: function () {

    return(
      <div className="index-page">
        <div className="page-center">
          <div className="answers-index-page">

            <p className="answers-header"> Topics: </p>
            <div className="answers-index">
              {this.state.topics.map(function (topic) {

                var followed = this.state.user_topics[topic.id] == true ? true : false;

                return <TopicsIndexItem key={topic.id} topic={topic} followed={followed}/>;
              }.bind(this))}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TopicsIndex;
