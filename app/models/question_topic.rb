class QuestionTopic < ActiveRecord::Base
  belongs_to :question, inverse_of: :question_topics
  belongs_to :topic, inverse_of: :question_topics
end
