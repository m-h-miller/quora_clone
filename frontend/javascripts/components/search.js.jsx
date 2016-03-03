var React = require('react'),
    SearchStore = require('../stores/search_store.js'),
    SearchUtil = require('../util/search_util.js'),
    SearchResult = require('./searchable.js.jsx'),
    SearchActions = require('../actions/search_actions.js');

var Search = React.createClass({

  getInitialState: function () {
    _rs = SearchStore.results();
    return { results: _rs };
  },

  componentDidMount: function () {
    this.listener = SearchStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.listener.remove();
  },

  resetForm: function () {
    // deprecated in favor of ReactDom ...
    var search = React.findDOMNode(this.refs.search);
    search.value= "";
    SearchActions.receiveResults({ results: [] });
  },

  // listener on store
  _onChange: function () {
    this.setState({ results: SearchStore.results() });
  },

  // listener on HTML element
  _onInput: function (e) {
    e.preventDefault();
    var query = $(e.currentTarget).val();

    if ( query.length > 2 ) {
      SearchUtil.search(query);
    }
  },

  render: function () {
    var that = this;
    var results = this.state.results;
    console.log("render:");
    console.log(results);

    var __results = [];
    results.map(function (result) {
      if (result._type === "User") {
        var prefix = "users/";
        prefix = prefix + result.user.id;
        var output =  <SearchResult
                  callback={ that.resetForm }
                  key={ result.user.id }
                  prefix={ prefix }
                  user={ result }
                  listName= { result.user.user_name }/>;
        __results.push(output);
      } else if ( result._type === "Question" ) {
        var prefix = "questions/";
        prefix = prefix + result.question.id;
        var output =  <SearchResult
                callback={ that.resetForm }
                key={ result.question.id }
                prefix={ prefix }
                question={ result }
                listName= { result.question.title }/>;
        __results.push(output);
      } else if ( result._type === "Answer" ) {
        var prefix = "questions/";
        prefix = prefix + result.answer.question_id;

        var output = <SearchResult
                callback={ that.resetForm }
                key={ result.answer.id }
                prefix={ prefix }
                answer={ result }
                listName= { result.answer.title }/>;
        __results.push(output);
      }
    });

    return (
      <div className="search-bar">
        <input ref="search" type="text" onChange={ this._onInput } placeholder="Search..."/>
        <ul className="search-results">
          { __results }
        </ul>
      </div>
    );
  }


});

module.exports = Search;
