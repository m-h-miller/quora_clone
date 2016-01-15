class CreateQuestionTopics < ActiveRecord::Migration
  def change
    create_table :question_topics do |t|
      t.integer :question_id, null: false
      t.integer :topic_id, null: false

      t.timestamps null: false
    end

    add_index :question_topics, :question_id
    add_index :question_topics, :topic_id
    add_index :question_topics, [:question_id, :topic_id], unique: true
  end
end
