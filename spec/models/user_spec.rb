require "rails_helper.rb"

RSpec.describe User, type: :model do

  describe ".find_by_credentials" do
    before(:each) do
      @user = create(:user)
    end

    it "finds the correct user given credentials" do
      result = User.find_by_credentials("John_Doe_123", "password")
      expect(result).to eq(@user)
    end
  end

  describe "#password=" do
    before(:each) do
      @user = User.create(user_name: "TEST_USER_IGNORE", password: "passcode")
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

    it "cannot be called after initialize" do
      token = @user.session_token
      expect(@user.ensure_session_token).to raise_error
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


  pending "#questions"
  pending "#answers"
  pending "#comments"

  # AS I'm writing this, I haven't yet decided what to do w/r/t topics.
  # All the examples I've seen use preset checkboxes, giving the user no
  # ability to create topics. But I believe the reddit_on_rails program might
  # allow for topic creation, as it has moderators.

  # But even if that is the case, they don't seem to be storing topics in the
  # user db whatsoever... how might someone do this?

  # I will have to investigate similar projects.

  # describe "#topics"




  # OAuth, might not be test-able?
  pending ".find_or_create_by_auth_hash"

end
