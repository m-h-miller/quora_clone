class UserVote < ActiveRecord::Base
    # only vote once
  validates :user_id, uniqueness: { scope: [:votable_id, :votable_type]}

  belongs_to :votable, polymorphic: true
  belongs_to :user, inverse_of: :user_votes
end
