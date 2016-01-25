# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# RESET THE DB
User.destroy_all
Question.destroy_all
Answer.destroy_all
Topic.destroy_all
QuestionTopic.destroy_all

# GUEST USER
@user = User.create(user_name: "guest", password: "password", avatar: "http://placecorgi.com/200/200")

@topic1 = Topic.create(name: "General", description: "conversation + discussion")
@topic2 = Topic.create(name: "Ruby", description: "A place for discussing the ruby programming language")
@topic3 = Topic.create(name: "Philosophy", description: "for thinkers")
@topic4 = Topic.create(name: "Javascript", description: "js")
@topic5 = Topic.create(name: "React.js", description: "A new library by facebook")

@question1 = Question.create(
  title: "First!",
  body: "First post! cool site, Harry! Let me hire you!",
  author_id: @user.id,
  question_topics_attributes: [
    { question_id: 1, topic_id: @topic1.id }])
@question2 = Question.create(
  title: title,
  body: body,
  author_id: x.id,
  question_topics_attributes: [
    { question_id: 2, topic_id: @topic2.id }])
@question3 = Question.create(
  title: title,
  body: body,
  author_id: x.id,
  question_topics_attributes: [
    { question_id: 3, topic_id: @topic3.id }])





#deprecated?

i=1
while i < 6
  name = Faker::Name.name
  name2 = Faker::Name.name

  title = Faker::Company.bs
  body = Faker::Hacker.say_something_smart
  title = "How to " + title
  title += "?"

  x = User.create(user_name: name, password: "password", avatar: "http://placecorgi.com/200/200")
  y = User.create(user_name: name2, password: "password", avatar: "http://placecorgi.com/200/200")


  i++
end

5.times do




  q1 = Question.create(title: title, body: body, author_id: x.id,
        question_topics_attributes: [
          { question_id: 1, topic_id: @topic1.id }
          ])
  a1 = Answer.create(title: title2, body: body2, author_id: y.id, question_id: q1.id)

  q2 = Question.create(title: title2, body: body2, author_id: y.id)
  a2 = Answer.create(title: title, body: body, author_id: x.id, question_id: q2.id)

  a3 = Answer.create(title: title, body: body, author_id: y.id, question_id: q1.id)

  a4 = Answer.create(title:title2, body: body2, author_id: x.id, question_id: q2.id)
end
