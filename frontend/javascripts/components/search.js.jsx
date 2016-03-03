var React = require('react'),
    SearchStore = require('../stores/search_store.js'),
    SearchUtil = require('../util/search_util.js');

var Search = React.createClass({

  componentDidMount: function () {
    this.listener = SearchStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  resetForm: function () {

  },

  // listener callback
  _onChange: function () {
    this.setState({ results: SearchStore.results() });
  },

  _onInput: function (e) {
    e.preventDefault();
    var query = $(e.currentTarget).val();

    if ( query.length > 2 ) { SearchUtil.search(query); }
  },

  render: function () {
    var that = this;
    var results = SearchStore.all().map(function (result) {
      if (result._type === "User") {
        var prefix = "/api/users/";
        prefix = prefix + result.user.id;
        return <SearchResult
                  callback={ that.resetForm }
                  key={ result.user.id }
                  prefix={ prefix }
                  user={ result }
                  listName= { result.user.user_name }/>;
      } else if (result._type === "Question") {
          var prefix = "/api/questions/" + result.question.id;
          prefix = prefix + result.question.id;
          return <SearchResult
                  callback={that.resetForm}
                  key={result.question.id}
                  prefix={ prefix }
                  question={ result }
                  listName= { result.question.title }/>;
      } else if (result._type === "Answer") {
          var prefix = "/api/users/";
          prefix = prefix + result.question.id;
          prefix = prefix + "/answers/";
          prefix = prefix + result.answer.id;
          return <SearchResult
                  callback={that.resetForm}
                  key={result.answer.id}
                  prefix={ prefix }
                  answer={ result }
                  listName= { result.answer.title }/>;
      }
    });

    return (
      <div className="search-bar">
        <input ref="search" type="text" onChange={ this._onInput } placeholder="Search..."/>
        <ul className="search-results">
          {results}
        </ul>
      </div>
    );
  }


});

module.exports = Search;
