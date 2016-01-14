require "rails_helper.rb"

RSpec.describe User, type: :model do

  describe ".find_by_credentials" do
    before(:each) do
      @user = create(:user)
    end

    it "finds the correct user given credentials" do
      result = User.find_by_credentials(@user.user_name, @user.password)
      expect(result).to eq(@user)
    end
  end

  describe "#password="

  describe "#is_password?"

  describe "#generate_session_token"

  describe "#reset_session_token!"


  #associations
  describe "#questions"

  describe "#answers"


  # OAuth, might not be test-able?
  describe ".find_or_create_by_auth_hash"

end


RSpec.describe User, type: :model do

  describe "#password=" do
    before(:each) do
      @user = build(:user)
      @user.password=("password")
    end

    it "sets the instance variable @password" do
      expect(@user.password).to eq("password")
    end

    it "sets an attribute password_digest" do
      expect(@user.password_digest).to_not be_nil
    end

    it "password_digest and password are not the same" do
      expect(@user.password).not_to eq(@user.password_digest)
    end
  end

  describe "#is_password?" do
    before(:each) do
      @user = build(:user)
      @user.password=("password")
    end

    it "returns true if the password is correct" do
      expect(@user.is_password?("password")).to be true
    end

    it "returns false if the password is incorrect" do
      expect(@user.is_password?("password1")).to be false
    end

    it "returns false when given nil" do
      expect(@user.is_password?(nil)).to be false
    end
  end

  describe "#generate_session_token" do
    before(:each) do
      @user = build(:user)
    end

    it "sets the session_token of the user after initialize" do
      expect(@user.session_token).not_to be_nil
    end

    it "does not generate another session_token if one already exists" do
      token = @user.session_token
      @user.generate_session_token
      expect(@user.session_token).to eq(token)
    end
  end

  describe "#reset_session_token" do
    before(:each) do
      @user = build(:user)
    end

    it "changes the session_token" do
      old_token = @user.session_token
      @user.reset_session_token
      expect(@user.session_token).not_to eq(old_token)
    end

    it "returns the new session token" do
      token = @user.reset_session_token
      expect(@user.session_token).to eq(token)
    end

    it "persists changes to the database" do
      expect(@user).to receive(:save)
      @user.reset_session_token
    end
  end


  describe "#groups_led" do
    before(:each) do
      @user = create(:user)
      @group = Group.new(attributes_for(:group))
      @group.organizer_id = @user.id
      @group.save
    end

    it "should have many groups_led" do
      t = User.reflect_on_association(:groups_led)
      expect(t.macro).to eq(:has_many)
    end

    it "returns the groups where the user is the organizer" do
      expect(@user.groups_led).to include(@group)
    end
  end

  describe "groups_where_not_organizer" do
    before(:each) do
      @user = create(:user)
      @group = @user.groups_led.create(attributes_for(:group))
      @user2 = create(:user)
      @group2 = @user2.groups_led.create(attributes_for(:group))
    end

    it "returns the groups the user is not the organizer" do
      expect(@user2.groups_led).not_to include(@group)
      expect(@user2.groups_led).to include(@group2)
    end
  end

  describe "#groups" do
    before(:each) do
      @user = create(:user)
      @group = @user.groups_led.create(attributes_for(:group))
      @user2 = create(:user)
      @group2 = @user2.groups_led.create(attributes_for(:group))
    end

    it "user should have many groups" do
      t = User.reflect_on_association(:groups)
      expect(t.macro).to eq(:has_many)
    end

    it "returns groups the user is part of" do
      expect(@user.groups).to include(@group)
    end

    it "does not return groups the user is not a part of" do
      expect(@user.groups).not_to include(@group2)
    end
  end

  describe "#events" do
    before(:each) do
      @user = create(:user)
      @group = @user.groups_led.create(attributes_for(:group))
      @event = @group.events.create(attributes_for(:event))
    end

    it "user should have many events" do
      t = User.reflect_on_association(:events)
      expect(t.macro).to eq(:has_many)
    end

    it "returns the events a user is a part of" do
      expect(@user.events).to include(@event)
    end

    it "does not return events a user is not a part of" do
      UsersEvent.destroy_all
      expect(@user.events).not_to include(@event)
    end
  end

  describe "#comments" do
    before(:each) do
      @user = create(:user)
      @group = @user.groups_led.create(attributes_for(:group))
      @event = @group.events.create(attributes_for(:event))
      @comment = @event.comments.new(attributes_for(:comment))
      @comment.author_id = @user.id
      @comment.save
    end

    it "returns all the comments the user has created" do
      expect(@user.comments).to include(@comment)
    end
  end
end
