import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["phrasesList", "hiddenInput"]

  connect() {
    console.log("PhrasesFormController conectado");
    this.setupExistingPhrases();
    this.updateHiddenInput();
  }

  setupExistingPhrases() {
    // Adicionar listeners aos botões de remover para frases existentes
    document.querySelectorAll('.remove-phrase').forEach(button => {
      button.addEventListener('click', (event) => this.removePhrase(event));
    });

    // Adicionar listeners para atualizar o input escondido quando o valor das frases mudar
    document.querySelectorAll('.phrase-input').forEach(input => {
      input.addEventListener('input', () => this.updateHiddenInput());
    });
  }

  addPhrase(event) {
    event.preventDefault();
    
    const phrasesList = document.getElementById('phrases-list');
    const placeholder = document.querySelector('.phrase-input').placeholder;
    
    const newPhrase = document.createElement('div');
    newPhrase.classList.add('input-group', 'mb-2', 'phrase-item');
    newPhrase.innerHTML = `
      <input type="text" class="form-control phrase-input" placeholder="${placeholder}">
      <button type="button" class="btn btn-outline-danger remove-phrase">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Adicionar a frase à lista
    phrasesList.appendChild(newPhrase);
    
    // Adicionar event listener ao botão de remover
    newPhrase.querySelector('.remove-phrase').addEventListener('click', (e) => this.removePhrase(e));
    
    // Adicionar event listener ao input para atualizações
    newPhrase.querySelector('.phrase-input').addEventListener('input', () => this.updateHiddenInput());
    
    // Focar no novo input
    newPhrase.querySelector('.phrase-input').focus();
    
    // Atualizar o input escondido
    this.updateHiddenInput();
  }

  removePhrase(event) {
    const phraseItem = event.currentTarget.closest('.phrase-item');
    
    // Não permitir remover a última frase
    const allPhrases = document.querySelectorAll('.phrase-item');
    if (allPhrases.length <= 1) {
      return;
    }
    
    phraseItem.remove();
    this.updateHiddenInput();
  }

  updateHiddenInput() {
    const phrasesInputs = document.querySelectorAll('.phrase-input');
    const phrases = Array.from(phrasesInputs)
      .map(input => input.value.trim())
      .filter(value => value !== '');
    
    // Atualizar o input escondido com os valores separados por quebras de linha
    const hiddenInput = document.getElementById('elements_hidden_input');
    hiddenInput.value = phrases.join('\n');
  }
} 