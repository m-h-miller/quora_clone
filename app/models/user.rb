class User < ActiveRecord::Base
  include PgSearch
  multisearchable :against => :user_name,
                  :using => {
                    :tsearch => {:prefix => true}
                  }

  validates :user_name, presence: true, uniqueness: true
  validates :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_attached_file :avatar, default_url: "big_square300x300.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  after_initialize :ensure_session_token

  attr_reader :password

  has_many(
    :questions,
    class_name: "Question",
    primary_key: :id,
    foreign_key: :author_id
  )

  has_many(
    :answers,
    class_name: "Answer",
    primary_key: :id,
    foreign_key: :author_id
  )

  has_many(
    :answers_to_qs,
    through: :questions,
    source: :answers
  )

  def self.find_by_credentials(user_name, password)
    return nil unless user_name && password
    user = User.find_by(user_name: user_name)
    user && user.is_password?(password) ? user : nil
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    user = User.find_by(provider: provider, uid: uid)
    return user if user

    User.create(
      user_name: auth_hash[:info][:name],
      provider: provider,
      uid: uid,
      password: SecureRandom.urlsafe_base64
    )
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
