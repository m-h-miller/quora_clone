var React = require('react'),
    TopicsApiUtil = require('../../util/topics_api_util.js'),
    UsersApiUtil = require('../../util/users_api_util.js'),
    CurrentUserStore = require('../../stores/current_user_store.js');

var TopicsIndexItem = React.createClass({

  getInitialState: function () {
    var followed = this.props.followed == true ? true : false;
    return { followed: followed };
  },

  _handleClick: function () {
    var user_id = CurrentUserStore.currentUser().id;

    if ( this.state.followed ) {
      this._unfollowTopic(user_id, this.props.topic.id);
    } else {
      this._followTopic(user_id, this.props.topic.id);
    }

    this.setState({ followed: !this.state.followed });
  },

  _followTopic: function (user_id, topic_id) {
    UsersApiUtil.followTopic(user_id, this.props.topic.id);
  },

  _unfollowTopic: function (id) {
    console.log(this);
  },


  render: function () {
    var text = this.state.followed == true ? "Unfollow Topic" : "Follow Topic";

    return(
      <div className="questions-index-item">
        <div className="questions-index-title">
          <p> <strong> {this.props.topic.name} </strong> </p>

          <p className="questions-index-item-body"> {this.props.topic.description} </p>

          <button disabled={this.state.followed} onClick={this._handleClick}> {text} </button>
        </div>
      </div>
    );
  }
});

module.exports = TopicsIndexItem;
