var React = require('react'),
    TopicsApiUtil = require('../../util/topics_api_util.js'),
    CurrentUserStore = require('../../stores/current_user_store.js');

var TopicsIndexItem = React.createClass({

  handleClick: function () {
    console.log("handled");
  },


  render: function () {



    return(
      <div className="questions-index-item">
        <div className="questions-index-title">
          <p> <strong> {this.props.topic.name} </strong> </p>

          <p className="questions-index-item-body"> {this.props.topic.description} </p>

          <button onClick={this.handleClick}> Click </button>
        </div>
      </div>
    );
  }
});

module.exports = TopicsIndexItem;
