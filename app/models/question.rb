class Question < ApplicationRecord
  belongs_to :activity
  
  # Atributos virtuais
  attr_accessor :options_text, :sentences_content, :elements_content
  
  # Define os tipos de questões disponíveis
  QUESTION_TYPES = ['multiple_choice', 'fill_in_blank', 'order_sentences', 'order_elements']
  
  validates :content, presence: true, unless: -> { order_sentences? || order_elements? }
  validates :correct_answer, presence: true
  validates :question_type, presence: true, inclusion: { in: QUESTION_TYPES }
  
  # Validações específicas para cada tipo de questão
  validates :options, presence: true, if: :multiple_choice?
  validate :correct_answer_in_options, if: :multiple_choice?
  validate :content_has_blank, if: :fill_in_blank?
  
  before_validation :ensure_options_is_array
  before_validation :process_options_text
  before_validation :process_order_sentences, if: :order_sentences?
  before_validation :process_order_elements, if: :order_elements?
  before_validation :sanitize_content, if: :fill_in_blank?
  
  # Métodos auxiliares para verificar o tipo de questão
  def multiple_choice?
    question_type == 'multiple_choice'
  end
  
  def fill_in_blank?
    question_type == 'fill_in_blank'
  end
  
  def order_sentences?
    question_type == 'order_sentences'
  end
  
  def order_elements?
    question_type == 'order_elements'
  end

  private

  def correct_answer_in_options
    if correct_answer.present? && options.is_a?(Array) && !options.include?(correct_answer)
      errors.add(:correct_answer, "deve ser uma das opções disponíveis")
    end
  end

  def content_has_blank
    Rails.logger.debug "Verificando conteúdo para lacunas: #{content.inspect}"
    unless content&.strip&.include?('_____')
      errors.add(:content, "deve conter pelo menos um espaço em branco (_____)")
      Rails.logger.debug "Erro: conteúdo não contém _____"
    end
  end

  def sanitize_content
    self.content = content.strip if content.present?
  end

  def ensure_options_is_array
    self.options ||= []
    self.options = options.reject(&:blank?) if options.is_a?(Array)
  end

  def process_options_text
    if options_text.present? && multiple_choice?
      self.options = options_text.split(",").map(&:strip)
    end
  end

  def process_order_sentences
    if order_sentences?
      if sentences_content.present?
        sentences = sentences_content.split("\n").map(&:strip).reject(&:blank?)
        self.content = "" # Define o content como vazio para questões de ordenar frases
        self.options = sentences.shuffle
        self.correct_answer = sentences.join("|")
      else
        errors.add(:sentences_content, "não pode ficar em branco")
      end
    end
  end
  
  def process_order_elements
    if order_elements?
      if elements_content.present?
        # Dividir o conteúdo em frases, uma por linha
        phrases = elements_content.split("\n").map(&:strip).reject(&:blank?)
        
        if phrases.empty?
          errors.add(:elements_content, "não pode ficar em branco")
          return
        end
        
        # Para cada frase, dividir em palavras e criar um objeto com a frase original e as palavras embaralhadas
        processed_phrases = []
        phrases.each do |phrase|
          # Dividir a frase em palavras
          words = phrase.split(/\s+/).map(&:strip).reject(&:blank?)
          
          # Verificar se a frase tem palavras
          if words.empty?
            next
          end
          
          # Adicionar a frase processada
          processed_phrases << {
            original: phrase,
            words: words.shuffle # Embaralhar as palavras
          }
        end
        
        # Armazena a lista de frases processadas como um objeto JSON no campo options
        self.options = processed_phrases.map do |p| 
          { original: p[:original], words: p[:words] }
        end
        
        # Armazena as frases originais como resposta correta, separadas por |
        self.correct_answer = phrases.join("|")
        
        # Limpa o conteúdo, já que não é usado para este tipo de questão
        self.content = ""
      else
        errors.add(:elements_content, "não pode ficar em branco")
      end
    end
  end
end

