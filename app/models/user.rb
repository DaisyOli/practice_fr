class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :activities, dependent: :destroy
  # Removida a associação com quiz_attempts que não existe mais
  # has_many :quiz_attempts, dependent: :destroy
  
  ROLES = %w[teacher student].freeze
  DEFAULT_LANGUAGE = 'fr'.freeze

  validates :role, presence: true, inclusion: { in: ROLES }

  before_validation :set_default_language, on: :create

  def teacher?
    role == 'teacher'
  end

  def student?
    role == 'student'
  end

  def language_name
    'Français'
  end

  private

  def set_default_language
    self.language = DEFAULT_LANGUAGE
  end
end
