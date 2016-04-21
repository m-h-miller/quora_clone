var React = require('react'),
    TopicsApiUtil = require('../../util/topics_api_util.js'),
    CurrentUserStore = require('../../stores/current_user_store.js');

var TopicsIndexItem = React.createClass({



  render: function () {
    // var deleteButton;
    //
    // if ( this.props.answer.author.user_name === CurrentUserStore.currentUser().user_name ) {
    //   deleteButton = (
    //     <p className="delete-button">
    //       <button onClick={ this.deleteAnswer }> DELETE ANSWER </button>
    //     </p>
    //   );
    // }

    return(
      <ul className="answers-index-item">
        hello
      </ul>
    );
  }
});

module.exports = TopicsIndexItem;
