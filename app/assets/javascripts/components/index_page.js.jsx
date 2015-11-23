window.IndexPage = React.createClass({
  render: function () {
    return(
      <div className="index-page">
      	<Header />
      	<SideBar />
        <QuestionsIndex />
      </div>
    );
  }
});
