var React = require('react'),
    UsersApiUtil = require('../../util/users_api_util.js'),
    CurrentUserStore = require('../../stores/current_user_store.js');

var TopicsIndexItem = React.createClass({

  getInitialState: function () {
    return { followed: this.props.followed };
  },

  _handleClick: function () {
    var user_id = CurrentUserStore.currentUser().id;
    UsersApiUtil.toggleFollow(user_id, this.props.topic.id, this.state.followed);
    this.setState({ followed: !this.state.followed });
  },

  render: function () {
    var text = this.state.followed == true ? "Unfollow Topic" : "Follow Topic";

    return(
      <div className="questions-index-item">
        <div className="questions-index-title">
          <p> <strong> {this.props.topic.name} </strong> </p>

          <p className="questions-index-item-body"> {this.props.topic.description} </p>

          <button onClick={this._handleClick}> {text} </button>

        </div>
      </div>
    );
  }
});

module.exports = TopicsIndexItem;
