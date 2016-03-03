var React = require('react'),
History = require('react-router').History;



var Search = React.createClass({
  mixins: [ History ],

  componentDidMount: function () {
    // SearchResultsStore.addChangeHandler(this._onChange);
  },

  _onInput: function () {
    console.log("hello");
  },

  // componentWillUnmount

  render: function () {
    return (
      <div className="search-bar">
        <input ref="search" type="text" onChange={ this._onInput } placeholder="Search..."/>
      </div>
    );
  }


});

module.exports = Search;
