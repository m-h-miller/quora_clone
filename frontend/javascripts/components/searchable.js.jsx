var React = require('react'),
    SearchStore = require('../stores/search_store.js'),
    SearchUtil = require('../util/search_util.js');

var SearchResult = React.createClass({
  render: function () {
    return (
      <li>
        <a onClick={ this.props.callback } href={"#/" + this.props.prefix }>
          { this.props.listName }
        </a>
      </li>
    );
  }
});

module.exports = SearchResult;
