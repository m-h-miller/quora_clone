class Answer < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:title, :body]

  validates :title, :author_id, :question_id, presence: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id
  )

  belongs_to(
    :question,
    class_name: "Question",
    foreign_key: :question_id,
    primary_key: :id
  )

  has_one(
    :answered_author,
    through: :question,
    source: :author
  )

end
