require "rails_helper.rb"

RSpec.describe Question, type: :model do

  describe "#author" do
    before(:each) do
      @user = create(:user)
      @question = build(:question)
      @question.author_id = @user.id
    end

    it "returns the correct author" do
      author = @question.author
      expect(author).to eq(@user)
    end
  end

  describe "#answers" do
    before(:each) do
      @question = build(:question)
      @answer1 = @question.answers.build(attributes_for(:answer))
      # @answer1.question_id = @question.id
    end

    it "returns the correct answers" do
      expect(@question.answers).to include(@answer1)
    end
  end

end
