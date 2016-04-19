var VotingUtil = {
  upvoteQuestion: function ( question_id ) {
    $.post('api/questions/' + question_id + '/upvote', function () {
      console.log("upvoted");
    });
  },
};

module.exports = VotingUtil;
