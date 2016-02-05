var React = require('react'),
    SideBar = require('./sidebar.js.jsx'),
    QuestionsIndex = require('./questions/questions_index.js.jsx');

var IndexPage = React.createClass({
  render: function () {
    return(
      <div className="index-page">
      	<SideBar />
        <QuestionsIndex />
      </div>
    );
  }
});

module.exports = IndexPage;
