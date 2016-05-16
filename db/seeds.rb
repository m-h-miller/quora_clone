# reset the DB
User.destroy_all
Question.destroy_all
Answer.destroy_all
Topic.destroy_all
QuestionTopic.destroy_all
UserTopic.destroy_all

# guest user, myself, & a third sample user
@guest = User.create(user_name: "guest", password: "password", avatar: "http://placecorgi.com/200/200" )
@me = User.create(user_name: "Michael_Miller", password: "password", avatar: "http://placecorgi.com/200/200" )
@user2 = User.create(user_name: "QuorumFan335", password: "password", avatar: "http://placecorgi.com/200/200" )

# topics
@general = Topic.create(name: "General", description: "conversation + discussion")
@topic2 = Topic.create(name: "Ruby", description: "A place for discussing the ruby programming language")
@topic3 = Topic.create(name: "Philosophy", description: "for thinkers")
@topic4 = Topic.create(name: "Javascript", description: "js")
@topic5 = Topic.create(name: "React.js", description: "A 'new' library by facebook")

# Guest User follows several topics
UserTopic.create(user_id: 1, topic_id: 1)
UserTopic.create(user_id: 1, topic_id: 2)
UserTopic.create(user_id: 1, topic_id: 3)
UserTopic.create(user_id: 1, topic_id: 4)

  # Intro question, background on project
@question1 = Question.create(title: "What is Quorum?", body: "Quorum is a Q&A site built with Rails, React.js, and jQuery", author_id: @guest.id, question_topics_attributes: [ { topic_id: @general.id }])
  @answer1 = Answer.create(title: "Built by M.H.Miller", body: "This site showcases my web development skills", author_id: @me.id, question_id: @question1.id)

@question2 = Question.create(title: "What technologies were used to build Quorum?", body: "I am very fascinated by this website", author_id: @guest.id, question_topics_attributes: [ { topic_id: @general.id }])
  @answer2 = Answer.create(title: "Rails!", body: "The back-end is written in Ruby on Rails", author_id: @me.id, question_id: @question2.id)
  @answer21 = Answer.create(title: "AND React.js!", body: "The front-end is written in React & jQuery", author_id: @me.id, question_id: @question2.id)

@question31 = Question.create(title: "Why are you using Webpack?", body: "help i don't understand", author_id: @guest.id, question_topics_attributes: [ {topic_id: @general.id }])
  @answer31 = Answer.create(title: "To compile my JavaScripts", body: "I feel that this reflects a more mature asset pipeline than that of Rails.", author_id: @me.id, question_id: @question2.id)
  @answer32 = Answer.create(title: "Also, to further modularize my assets", body: "This minimizes the impact of the request/response cycle", author_id: @me.id, question_id: @question2.id)

@question3 = Question.create(title: "Object Oriented Programming + Platonism", body: "Boy they sure curtail nicely together. I think Plato's epistemology really demonstrates human concept-formation and learning; but I'm no metaphysicist", author_id: @me.id, question_topics_attributes: [ { topic_id: @topic3.id }])
  @answer3 = Answer.create(title: "Footnotes to Plato.", body: "So they say the rest of philosophy is. Glad you've been reading Wittgenstein, have you made it to Philosophical Investigations yet?", author_id: @guest.id, question_id: @question3.id )

@question4 = Question.create(title: "What is the best JS framework for web development?", body: "just kidding, its obviously React.js", author_id: @guest.id, question_topics_attributes: [ { topic_id: @topic4.id } ])
  @answer4 = Answer.create(title: "Why ask if you already decided on an answer?", body: "Frankly I don't think thats in the spirit of discussion. You are the type of poster that is ruining this community.", author_id: @user2.id, question_id: @question4.id)
