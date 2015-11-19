class ChangeQuestions < ActiveRecord::Migration
  def change
    change_column :questions, :body, :string, null: true
  end
end
