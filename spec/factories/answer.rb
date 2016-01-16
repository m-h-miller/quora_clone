FactoryGirl.define do
  factory :answer do
    title "ANSWER TITLE IN CAPS"
    body  "BODY"

    association :author, factory: :user, strategy: :build
    association :question, factory: :question, strategy: :build
  end

end
