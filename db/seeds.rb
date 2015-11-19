# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Question.destroy_all

User.create(user_name: "scooter", password: "scooter")

20.times do
  name = Faker::Name.name
  x = User.create(user_name: name, password: "password")


  title = Faker::Company.bs
  body = Faker::Hacker.say_something_smart

  Question.create(title: title, body: body, author_id: x.id )
end
