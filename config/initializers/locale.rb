# Ensure that Rails correctly loads all locale files
I18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}')]

# Set available locales
I18n.available_locales = [:fr]

# Set default locale
I18n.default_locale = :fr

# Enable fallbacks for missing translations
require "i18n/backend/fallbacks"
I18n::Backend::Simple.include(I18n::Backend::Fallbacks)
I18n.fallbacks.map(fr: [:fr, :en])

# Configurar Devise para usar inglês
DeviseController.class_eval do
  def set_locale
    I18n.locale = :en
  end
end if defined?(DeviseController)

# Log locale settings
Rails.logger.info "I18n configuration:"
Rails.logger.info "  Default locale: #{I18n.default_locale}"
Rails.logger.info "  Available locales: #{I18n.available_locales.inspect}"
Rails.logger.info "  Fallbacks: #{I18n.fallbacks.inspect}"
Rails.logger.info "  Load path: #{I18n.load_path.count} files" 