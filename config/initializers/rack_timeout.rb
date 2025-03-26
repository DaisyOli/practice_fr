# Define timeout para requisições no Heroku
if defined?(Rack::Timeout)
  Rails.application.config.middleware.insert_before Rack::Runtime, Rack::Timeout, service_timeout: 20
end 