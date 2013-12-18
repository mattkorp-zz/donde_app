class User < ActiveRecord::Base
  # has_many :friendships
  # has_many :friends, through: :friendships
  # has_many :inverse_friendships, class_name: "Friendship", foreign_key: "friend_id"
  # has_many :inverse_friends, through: :inverse_friendships, source: :user
  has_many :friends, through: :friendships
  has_many :friendships, foreign_key: "user_id", class_name: "Friendship"

  attr_accessible :username, :email, :password, :password_confirmation, :password_digest, :latitude, :longitude, :active

  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, confirmation: true
  validates :password_confirmation, presence: true

end
