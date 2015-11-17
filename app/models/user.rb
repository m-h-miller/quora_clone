class User < ActiveRecord::Base
  validates :user_name, presence: true, uniqueness: true
  validates :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  attr_reader :password

  has_many(
    :questions,
    class_name: "Question",
    primary_key: :id,
    foreign_key: :author_id
  )

  def self.find_by_credentials(user_name, password)
    return nil unless user_name && password
    user = User.find_by(user_name: user_name)
    user && user.is_password?(password) ? user : nil
 end

  def password=(password)
    @password = BCrypt::Password.create(password)
    self.password_digest = @password
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

    def ensure_session_token
      self.session_token ||= SecureRandom.urlsafe_base64(16)
    end

end
