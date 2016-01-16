FactoryGirl.define do
  factory :question do
    title "TITLE IN ALL CAPS"
    body  "Lorem ipsum"

    association :author, factory: :user, strategy: :build
  end

end
