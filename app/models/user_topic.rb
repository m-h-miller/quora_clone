class UserTopic < ActiveRecord::Base
  belongs_to :user, inverse_of: :user_topics
  belongs_to :topic, inverse_of: :user_topics
end
