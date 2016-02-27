class Question < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:title, :body]

  validates :title, :author_id, presence: true
  validates :title, uniqueness: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many(
    :answers,
    class_name: "Answer",
    foreign_key: :question_id,
    primary_key: :id
  )

  has_many :question_topics

  has_many :topics, through: :question_topics, source: :topic

  accepts_nested_attributes_for :question_topics
end
