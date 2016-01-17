FactoryGirl.define do
  factory :question_topic do
    association :question, factory: :question, strategy: :build
    association :topic, factory: :topic, strategy: :build
  end
end
