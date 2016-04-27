class UserTopic < ActiveRecord::Base
  validates :topic_id, uniqueness: { scope: :user_id }
    # a user can only follow a topic once

  belongs_to :user, inverse_of: :user_topics
  belongs_to :topic, inverse_of: :user_topics
end
