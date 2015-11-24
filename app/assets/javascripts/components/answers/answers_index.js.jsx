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

  // componentWillReceiveProps: function () {
  //   QuestionStore.addAnswersIndexChangeListener(this._change);
  // },

  _change: function () {
    this.setState({ answers: QuestionStore.allQuestionAnswers() });
  },

  render: function () {
    if (typeof this.props.answers === "undefined") { return (<div></div>); }
    debugger;
    return(
      <ul>
        <AnswersForm question={this.props.question}/>
        {this.state.answers.map(function (answer) {
          return <AnswersIndexItem key={answer.id} answer={answer} author={answer.author} />;
        })}
      </ul>
    );
  }
});
