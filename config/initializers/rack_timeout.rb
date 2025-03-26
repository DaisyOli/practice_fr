# Define timeout para requisições no Heroku
Rack::Timeout.timeout = 20 if defined?(Rack::Timeout) # em segundos 