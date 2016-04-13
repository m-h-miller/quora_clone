class Question < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:title, :body],
                  :using => {
                    :tsearch => {:prefix => true}
                  }

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

  # private
  #   def self.topical(topic_ids_array)
  #     if !topic_ids_array.nil?
  #       topic_ids_array.select!{ |x| x.is_a? Integer }
  #       # subquery = Topic.where(id: topic_ids_array)
  #       Question.joins(:topics)
  #         .where('topics.id' => topic_ids_array )
  #     else
  #       self
  #     end
  #   end

end
