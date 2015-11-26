(function(){

  var Link = ReactRouter.Link;

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
      QuestionStore.addAnswersIndexChangeListener(this._onChange);
      var id = this.props.params.id;
      ApiUtil.fetchQuestion(id);
      this.getStateFromStore();
    },

    componentWillReceiveProps: function () {
      this._onChange();
    },

    componentWillUnmount: function () {
      QuestionStore.removeQuestionsIndexChangeListener(this._onChange);
    },

    render: function () {
      if (this.state.question === undefined) { return <div></div>; }
      return (
        <div className="detail-view">
          <SideBar />
          <div className="page-center">
            <div className="detail">
              <p className="detail-title" key={ this.state.question.title }> { this.state.question.title } </p>

                <ul className="questions-index-wrap group">
                  <li className="thumb">
                    <img src={ this.state.question.author.image_url } className="author-thumb" />
                  </li>

                  <li className="questions-detail-author-link">
                    <Link
                      className="questions-index-item-author-link"
                      to={'/users/' + this.state.question.author.id }>
                      <strong>{ this.state.question.author.user_name }</strong>
                    </Link> asked this:
                  </li>
                </ul>

              <p className="detail-body"> { this.state.question.body } </p>
            </div>
          <br/>
            <div className="answers">
              <AnswersIndex question={ this.state.question } />
            </div>
          </div>
        </div>
      );
    }
  });
})();
