class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :author_id, null: false
    end

    add_index :questions, :title, unique: true
    add_index :questions, :author_id
  end
end
