// app/javascript/controllers/question_form_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "questionType",
    "contentField",
    "multipleChoiceFields",
    "fillInBlankHelp",
    "orderSentencesHelp",
    "orderSentencesFields",
    "correctAnswerField"
  ];

  connect() {
    console.log("QuestionFormController conectado");
    this.updateFields();
  }

  toggleFields() {
    console.log("toggleFields chamado");
    this.updateFields();
  }

  updateFields() {
    if (!this.hasQuestionTypeTarget) {
      console.log("Alvo questionType não encontrado");
      return;
    }

    const type = this.questionTypeTarget.value;
    console.log("Atualizando campos para tipo:", type);
    
    // Esconder todos os campos específicos
    this.hideAllFields();
    
    // Mostrar campos baseados no tipo selecionado
    switch (type) {
      case 'multiple_choice':
        if (this.hasMultipleChoiceFieldsTarget) {
          console.log("Mostrando campos de múltipla escolha");
          this.multipleChoiceFieldsTarget.style.display = 'block';
        }
        if (this.hasCorrectAnswerFieldTarget) {
          this.correctAnswerFieldTarget.style.display = 'block';
        }
        break;
        
      case 'fill_in_blank':
        if (this.hasFillInBlankHelpTarget) {
          console.log("Mostrando ajuda para lacunas");
          this.fillInBlankHelpTarget.style.display = 'block';
        }
        if (this.hasCorrectAnswerFieldTarget) {
          this.correctAnswerFieldTarget.style.display = 'block';
        }
        break;
        
      case 'order_sentences':
        if (this.hasOrderSentencesHelpTarget) {
          console.log("Mostrando ajuda para ordenar frases");
          this.orderSentencesHelpTarget.style.display = 'block';
        }
        if (this.hasOrderSentencesFieldsTarget) {
          console.log("Mostrando campos para ordenar frases");
          this.orderSentencesFieldsTarget.style.display = 'block';
        }
        if (this.hasCorrectAnswerFieldTarget) {
          console.log("Escondendo campo de resposta correta para ordenar frases");
          this.correctAnswerFieldTarget.style.display = 'none';
        }
        break;
    }

    // Atualizar placeholders e ajuda contextual
    this.updatePlaceholders(type);
  }
  
  hideAllFields() {
    console.log("Escondendo todos os campos específicos");
    if (this.hasMultipleChoiceFieldsTarget) this.multipleChoiceFieldsTarget.style.display = 'none';
    if (this.hasFillInBlankHelpTarget) this.fillInBlankHelpTarget.style.display = 'none';
    if (this.hasOrderSentencesHelpTarget) this.orderSentencesHelpTarget.style.display = 'none';
    if (this.hasOrderSentencesFieldsTarget) this.orderSentencesFieldsTarget.style.display = 'none';
    
    // Mostrar campo de resposta correta por padrão
    if (this.hasCorrectAnswerFieldTarget) this.correctAnswerFieldTarget.style.display = 'block';
  }

  updatePlaceholders(type) {
    const contentField = document.getElementById('content_textarea');
    if (!contentField) return;

    switch (type) {
      case 'fill_in_blank':
        contentField.placeholder = 'Ex: Je _____ le chocolat (Utilisez exactement 5 tirets bas)';
        break;
      case 'multiple_choice':
        contentField.placeholder = 'Saisissez une question à choix multiple';
        break;
      case 'order_sentences':
        contentField.placeholder = 'Saisissez l\'énoncé de la question';
        break;
      default:
        contentField.placeholder = 'Saisissez l\'énoncé de la question';
    }
  }

  toggleForm(event) {
    event.preventDefault();
    console.log("Toggling form visibility...");
    
    if (this.hasFormTarget) {
      this.formTarget.classList.toggle("d-none");
    }
  }
}
