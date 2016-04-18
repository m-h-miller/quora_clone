class CreateUserVotes < ActiveRecord::Migration
  def change
    create_table :user_votes do |t|
      t.integer :user_id, null: false
      t.integer :votable_id, null: false
      t.string :votable_type, null: false
    end

    add_index :user_votes, [:votable_id, :votable_type]
    add_index :user_votes, [:user_id, :votable_id, :votable_type], unique: true
  end
end
