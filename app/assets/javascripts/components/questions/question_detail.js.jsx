window.QuestionDetail = React.createClass({
  getStateFromStore: function () {
    return { question: QuestionStore.find(parseInt(this.props.params.id)) };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    QuestionStore.addQuestionsIndexChangeListener(this._onChange);
    var id = this.props.params.id;
    ApiUtil.fetchQuestion(id);
    this.getStateFromStore();
  },

  componentWillUnmount: function () {
    QuestionStore.removeQuestionsIndexChangeListener(this._onChange);
  },

    // if (this.state.question.author.id === ) --- move into render
    // need to add delete buttons for content that the user owns
  render: function () {
    if (this.state.question === undefined) { return <div></div>; }
    return (
      <div>
        <div className="detail">
          <p className="detail-title" key={ this.state.question.title }> { this.state.question.title } </p>
          <p className="detail-body"> { this.state.question.body } </p>
        </div>
      <br/>
        <div className="answers">
          <p className="answers-header">Answers:</p>
          <AnswersIndex question={ this.state.question } answers={ this.state.question.answers }/>
        </div>
      </div>
    );
  }
});
