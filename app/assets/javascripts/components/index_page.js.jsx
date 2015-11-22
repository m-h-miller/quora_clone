window.IndexPage = React.createClass({
  render: function () {
    return(
      <div>
        <div className="index-page">
        	<Header />
        	<SideBar />
          <QuestionsIndex />
        </div>
      </div>
    );
  }
});
