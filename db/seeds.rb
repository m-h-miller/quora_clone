# RESET THE DB
User.destroy_all
Question.destroy_all
Answer.destroy_all
Topic.destroy_all
QuestionTopic.destroy_all
UserTopic.destroy_all

# GUEST USER
@guest = User.create(user_name: "guest", password: "password", avatar: "http://placecorgi.com/200/200" )
@user = User.create(user_name: "snarky_dissenter", password: "password", avatar: "http://placecorgi.com/200/200" )

# TOPICS, OBVIOUSLY
@topic1 = Topic.create(name: "General", description: "conversation + discussion")
@topic2 = Topic.create(name: "Ruby", description: "A place for discussing the ruby programming language")
@topic3 = Topic.create(name: "Philosophy", description: "for thinkers")
@topic4 = Topic.create(name: "Javascript", description: "js")
@topic5 = Topic.create(name: "React.js", description: "A new library by facebook")

# Guest User follows several topics
UserTopic.create(user_id: 1, topic_id: 1)
UserTopic.create(user_id: 1, topic_id: 2)
UserTopic.create(user_id: 1, topic_id: 3)

# DEEPLY MEANINGFUL + REALISTIC SEED DATA

@question1 = Question.create(title: "What is Quorum?", body: "Quorum is a Q&A site built with Rails, React.js, and jQuery", author_id: @guest.id, question_topics_attributes: [ { topic_id: @topic1.id }])
  @answer1 = Answer.create(title: "Don't beg for it", body: "have some class", author_id: @user.id, question_id: @question1.id)
@question2 = Question.create(title: "It is such a joy working in Ruby", body: "I've become a zen master also everything is an object lol", author_id: @user.id, question_topics_attributes: [ { topic_id: @topic2.id }])
  @answer2 = Answer.create(title: "You are a stupid hipster", body: "The fact you aren't scripting in COBOL is a disgrace to technology.", author_id: @guest.id, question_id: @question2.id)
@question3 = Question.create(title: "Object Oriented Programming + Platonism", body: "Boy they sure curtail nicely together. I think Plato's epistemology is quite illustrative of the nature of human concept-formation and learning; though naturally I'm no metaphysicist", author_id: @user.id, question_topics_attributes: [ { topic_id: @topic3.id }])
  @answer3 = Answer.create(title: "Footnotes to Plato.", body: "So they say the rest of philosophy is. Glad you've been reading Wittgenstein, have you made it to Philosophical Investigations yet?", author_id: @guest.id, question_id: @question3.id )
@question4 = Question.create(title: "What is the best JS framework for web development?", body: "just kidding, its obviously React.js", author_id: @guest.id, question_topics_attributes: [ { topic_id: @topic4.id } ])
  @answer4 = Answer.create(title: "Why ask if you already decided on an answer?", body: "Frankly I don't think thats in the spirit of discussion. You are the type of poster that is ruining this community.", author_id: @user.id, question_id: @question4.id)
