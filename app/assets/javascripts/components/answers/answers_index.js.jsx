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
    debugger;
    if (typeof this.props.question.answers === "undefined") { return (<div></div>); }

    return(
      <ul>
        <AnswersForm question={this.props.question}/>
        {this.state.answers.map(function (answer) {
          return <AnswersIndexItem
                    key={answer.id}
                    question={this.props.question}
                    answer={answer}
                    author={answer.author} />;
        }.bind(this))}
      </ul>
    );
  }
});
