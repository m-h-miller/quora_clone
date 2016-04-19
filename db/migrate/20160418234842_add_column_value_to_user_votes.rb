class AddColumnValueToUserVotes < ActiveRecord::Migration
  def change
    add_column :user_votes, :value, :integer
  end
end
