window.UserShow = React.createClass({
  findUser: function () {
    return UsersApiUtil.fetchUser(this.props.params.id);
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  componentDidMount: function () {
    // listen to user store, it will hold a rich view of user that includes questions + answers
    QuestionStore.addQuestionsIndexChangeListener(this._onChange);
    QuestionStore.addAnswersIndexChangeListener(this._onChange);
    UsersApiUtil.fetchUser(this.props.params.id);
  },

  getStateFromStore: function () {
    return {
      questions: QuestionStore.findAuthorQuestions(parseInt(this.props.params.id))};
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentWillUnmount: function () {
    QuestionStore.removeQuestionsIndexChangeListener(this._onChange);
  },

  render: function () {
    debugger
    return (
      <div className="detail-view">
        <SideBar />
        <div className="page-center">
          <div className="detail">
            <p
              className="detail-title"
              key={ this.props.params.id }>
              { this.state.author }
            </p>

          </div>
        <br/>
          <div className="answers">
            <p className="answers-header">User Activity:</p>
              {this.state.questions.map(function (question) {
                return <QuestionsIndexItem key={question.id} question={question} />;
              })}
          </div>
        </div>
      </div>
    );
  }
});
