class Question < ActiveRecord::Base
  validates :title, :author_id, presence: true
  validates :title, uniqueness: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id,
    inverse_of: :questions
  )

end
