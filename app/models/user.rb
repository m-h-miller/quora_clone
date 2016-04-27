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

  attr_reader :password
  after_initialize :ensure_session_token

  has_many :questions,
    primary_key: :id,
    foreign_key: :author_id,
    dependent: :destroy,
    class_name: "Question"

  has_many :answers,
    primary_key: :id,
    foreign_key: :author_id,
    dependent: :destroy,
    class_name: "Answer"


  has_many(
    :answers_to_qs,
    through: :questions,
    source: :answers
  )

  has_many :user_votes, inverse_of: :user

  has_many :user_topics
  has_many :topics, through: :user_topics, source: :topic

  accepts_nested_attributes_for :user_topics, allow_destroy: true

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
