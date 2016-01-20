require "rails_helper.rb"

RSpec.describe User, type: :model do

  describe ".find_by_credentials" do
    before(:each) do
      @user = create(:user)
    end

    it "finds the correct user given credentials" do
      result = User.find_by_credentials(@user.user_name, "password")
      expect(result).to eq(@user)
    end
  end

  describe "#password=" do
    before(:each) do
      @user = User.create(password: "passcode")
    end

    it "sets the instance variable @password" do
      expect(@user.password).to eq("passcode")
    end

    it "sets an attribute password digest" do
      expect(@user.password_digest).to_not be_nil
    end

    it "mutates the password_digest" do
      expect(@user.password).not_to eq(@user.password_digest)
    end
  end

  describe "#is_password?" do
    before(:each) do
      @user = build(:user)
      @user.password=("passcode2")
    end

    it "returns true for correct password" do
      expect(@user.is_password?("passcode2")).to be true
    end

    it "returns false for wrong password" do
      expect(@user.is_password?("passcode")).to be false
    end

    it "returns false for null field" do
      expect(@user.is_password?(nil)).to be false
    end
  end

  describe "#ensure_session_token" do
    before(:each) do
      @user = build(:user)
    end

    it "sets the session_token of user after_initialize" do
      expect(@user.session_token).not_to be_nil
    end
  end

  describe "#reset_session_token!" do
    before(:each) do
      @user = build(:user)
    end

    it "resets the session_token" do
      old_token = @user.session_token
      @user.reset_session_token!
      expect(@user.session_token).not_to eq(old_token)
    end

    it "returns the new token" do
      token = @user.reset_session_token!
      expect(@user.session_token).to eq(token)
    end

    it "persists changes to database" do
      expect(@user).to receive(:save!)
      @user.reset_session_token!
    end
  end

#associations

  describe "#questions" do
    before(:each) do
      @user = create(:user_with_questions)
    end

    it "returns a user's posted questions" do
      expect(@user.questions).to_not be_nil
    end

    it "returns the right amount of questions" do
      expect(@user.questions.count).to eq(5)
    end
  end


  describe "#answers" do
    before(:each) do
      @asker = create(:user_with_questions)
      @answerer = create(:user)
      @answer = @asker.questions.first.answers.create
      @user = create(:user_with_answers)
    end

    it "returns the answerer's answer" do
      expect(@user.answers.count).to eq(2)
    end
  end


    pending "#comments"
    # OAuth, might not be test-able?
    pending ".find_or_create_by_auth_hash"




end
