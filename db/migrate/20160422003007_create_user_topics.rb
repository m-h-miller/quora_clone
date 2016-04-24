class CreateUserTopics < ActiveRecord::Migration
  def change
    create_table :user_topics do |t|
      t.integer :user_id, null: false
      t.integer :topic_id, null: false

      t.timestamps null: false
    end

    add_index :user_topics, :user_id
    add_index :user_topics, :topic_id
    add_index :user_topics, [:user_id, :topic_id], unique: true
  end
end
