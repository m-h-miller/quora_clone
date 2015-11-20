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

User.create(user_name: "scooter", password: "scooter")

10.times do
  name = Faker::Name.name
  name2 = Faker::Name.name

  title = Faker::Company.bs
  body = Faker::Hacker.say_something_smart

  x = User.create(user_name: name, password: "password")
  y = User.create(user_name: name2, password: "password")

  q = Question.create(title: title, body: body, author_id: x.id )
  a = Answer.create(title: title, body: body, author_id: y.id, question_id: q.id)
end
