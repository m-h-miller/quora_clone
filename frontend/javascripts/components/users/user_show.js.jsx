var React = require('react'),
    UsersStore = require('../../stores/users_store.js'),
    UsersApiUtil = require('../../util/users_api_util.js'),
    SideBar = require('../sidebar.js.jsx'),
    QuestionsIndexItem = require('../questions/questions_index_item.js.jsx');

var UserShow = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return {user: UsersStore.viewedUser()};
  },

  componentDidMount: function () {
    this.listener = UsersStore.addListener(this._onChange);
    UsersApiUtil.fetchUser(parseInt(this.props.params.id));
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {
    var content;

    if (typeof this.state.user.questions !== "undefined") {
      content = (
        <div className="users-show-activity">
          {this.state.user.questions.map(function (question) {
            return <QuestionsIndexItem key={question.id} question={question} />;
          })}
        </div>
      );
    }

    return (
      <div className="detail-view">
        <SideBar />
        <div className="page-center">
          <div className="detail">
            <p
              className="detail-title"
              key={ this.props.params.id }>
              Questions asked by { this.state.user.user_name }:
            </p>

          </div>
        <br/>
          <div className="answers">
            <p className="answers-header">User Activity:</p>
            { content }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserShow;
