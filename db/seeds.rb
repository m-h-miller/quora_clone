# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Question.destroy_all
Answer.destroy_all

User.create(user_name: "guest", password: "password")

15.times do
  name = Faker::Name.name
  name2 = Faker::Name.name

  title = Faker::Company.bs
  body = Faker::Hacker.say_something_smart
  title = "How to " + title
  title += "?"

  title2 = Faker::Company.bs
  body2 = Faker::Hacker.say_something_smart
  title2 = "How to " + title2
  title2 += "?"

  x = User.create(user_name: name, password: "password")
  y = User.create(user_name: name2, password: "password")

  q1 = Question.create(title: title, body: body, author_id: x.id )
  a1 = Answer.create(title: title2, body: body2, author_id: y.id, question_id: q1.id)

  q2 = Question.create(title: title2, body: body2, author_id: y.id)
  a2 = Answer.create(title: title, body: body, author_id: x.id, question_id: q2.id)
end
