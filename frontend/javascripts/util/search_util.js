var SearchActions = require('../actions/search_actions.js');

var SearchUtil = {
  search: function (query) {
    console.log(query);
    $.get('api/search', { query: query }, function (results) {
      console.log(results);
      SearchActions.receiveResults(results);
    });
  }

};

module.exports = SearchUtil;
