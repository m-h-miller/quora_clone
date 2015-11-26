window.AnswersIndex = React.createClass({
  getInitialState: function () {
    return { answers: QuestionStore.allQuestionAnswers() };
  },

  componentDidMount: function () {
    QuestionStore.addAnswersIndexChangeListener(this._change);
    var q = this.props.question.id;
    ApiUtil.fetchAnswers(q);
  },

  componentWillUnmount: function () {
    QuestionStore.removeAnswersIndexChangeListener(this._change);
  },

  _change: function () {
    this.setState({ answers: QuestionStore.allQuestionAnswers() });
  },

  render: function () {
    if (typeof this.props.question.answers === "undefined") { return (<div></div>); }

    return(
      <div className="answers-index-page">
        <AnswersForm question={this.props.question}/>
        <p className="answers-header">Answers:</p>

        <div className="answers-index">
          {this.state.answers.map(function (answer) {
            return <AnswersIndexItem
                      key={answer.id}
                      question={this.props.question}
                      answer={answer} />;
          }.bind(this))}
        </div>
      </div>
    );
  }
});
