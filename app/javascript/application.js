// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "@hotwired/stimulus"
import "@hotwired/stimulus-loading"
import "@rails/ujs"
import "bootstrap"  // Isso vai importar o bundle completo
import "jquery"
import "jquery_ujs"
import "controllers"
import "sortablejs"

// Inicialização básica
document.addEventListener("turbo:load", () => {
  // Para formulários que não devem usar Turbo
  document.querySelectorAll('form[data-turbo="false"]').forEach(form => {
    form.setAttribute("data-turbo", "false");
  });
  
  console.log("Application initialized")
})
