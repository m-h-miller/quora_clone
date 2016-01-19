require 'faker'

FactoryGirl.define do
  # user factory without associated posts
  factory :user do
    user_name { Faker::Name.name }
    password  "password"

    # user_with_posts will create post data after the user has been created
    factory :user_with_questions do
      # posts_count is declared as a transient attribute and available in
      # attributes on the factory, as well as the callback via the evaluator
      transient do
        questions_count 5
      end
      # the after(:create) yields two values; the user instance itself and the
      # evaluator, which stores all values from the factory, including transient
      # attributes; `create_list`'s second argument is the number of records
      # to create and we make sure the user is associated properly to the post
      after(:create) do |user, evaluator|
        create_list(:question, evaluator.questions_count, author: user)
      end
    end

    factory :user_with_answers do

      transient do
        answers_count 2
      end

      after(:create) do |user, evaluator|
        create_list(:answer, evaluator.answers_count, author: user, question: create(:question, author: user))
      end
    end
  end
end
