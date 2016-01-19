FactoryGirl.define do
  factory :question do
    title { Faker::Company.buzzword + "?" }
    body  "Lorem ipsum"

    association :author, factory: :user, strategy: :build
  end

end
