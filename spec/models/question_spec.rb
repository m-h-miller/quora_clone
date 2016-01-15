require "rails_helper.rb"

RSpec.describe Question, type: :model do

  describe "#author" do
    before(:each) do
      @user = create(:user)
      @question = Question.new(attributes_for(:question))
      @question.author_id = @user.id
    end

    it "returns the correct author" do
      author = @question.author
      expect(author).to eq(@user)
    end
  end

  describe "#answers" do
    before(:each) do
      @user = create(:user)
      @question = Question.new(attributes_for(:question))
      @answer1 = Answer.new(attributes_for(:answer))
      @answer2 = Answer.new(attributes_for(:answer))
      @answer1.question_id, @answer2.question_id = @question.id
    end
  end

end
