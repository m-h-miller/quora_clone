class Topic < ActiveRecord::Base
  validates :name, :description, presence: true
  validates :name, uniqueness: true

  has_many :question_topics, inverse_of: :topic, dependent: :destroy
  has_many :questions, through: :question_topics, source: :question

  has_many :user_topics, inverse_of: :topic, dependent: :destroy
  has_many :users, through: :user_topics, source: :user
end
