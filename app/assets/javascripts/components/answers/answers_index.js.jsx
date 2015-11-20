window.AnswersIndex = React.createClass({
  getInitialState: function () {
    return { answers: QuestionStore.allQuestionAnswers() };
  },

  componentDidMount: function () {
    QuestionStore.addAnswersIndexChangeListener(this._change);
    this._change();
  },

  componentWillUnmount: function () {
    QuestionStore.removeAnswersIndexChangeListener(this._change);
  },

  componentWillReceiveProps: function () {
    this._change();
  },

  _change: function () {
    this.setState({ answers: QuestionStore.allQuestionAnswers() });
  },

  render: function () {
    if (typeof this.props.answers === "undefined") { return (<div></div>); }
    
    return(
      <ul>
        <AnswersForm question={this.props.question}/>
        {this.props.answers.map(function (answer) {
          return <AnswersIndexItem key={answer.id} answer={answer} />;
        })}
      </ul>
    );
  }
});
