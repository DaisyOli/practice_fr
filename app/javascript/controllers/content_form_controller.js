import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form"]

  connect() {
    console.log("ContentFormController connected")
  }

  toggle(event) {
    event.preventDefault()
    const targetId = event.currentTarget.getAttribute('data-target')
    const targetForm = document.querySelector(targetId)
    
    if (!targetForm) {
      console.error(`Elemento não encontrado: ${targetId}`)
      return
    }
    
    try {
      // Toggle do formulário atual usando o objeto bootstrap global
      if (window.bootstrap) {
        const bsCollapse = new window.bootstrap.Collapse(targetForm)
        bsCollapse.toggle()
      } else {
        console.error("Bootstrap não está disponível globalmente")
        // Fallback simples
        targetForm.classList.toggle('show')
      }
    } catch (error) {
      console.error("Erro ao alternar o formulário:", error)
      // Fallback em caso de erro
      targetForm.classList.toggle('show')
    }
  }
} 