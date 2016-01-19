FactoryGirl.define do
  factory :answer do
    title "ANSWER TITLE IN CAPS"
    body  "BODY"
    question_id 1

    association :author, factory: :user, strategy: :build
    association :question, factory: :question, strategy: :build
  end
end
