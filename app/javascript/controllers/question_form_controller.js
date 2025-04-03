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
    "orderElementsHelp",
    "orderElementsFields",
    "correctAnswerField"
  ];

  connect() {
    console.log("QuestionFormController conectado");
    this.updateFields();
  }

  toggleFields() {
    this.updateFields();
  }

  updateFields() {
    if (!this.hasQuestionTypeTarget) return;
    
    const questionType = this.questionTypeTarget.value;
    console.log("Tipo de questão selecionado:", questionType);
    
    // Esconde todos os campos específicos
    if (this.hasMultipleChoiceFieldsTarget) this.multipleChoiceFieldsTarget.style.display = 'none';
    if (this.hasFillInBlankHelpTarget) this.fillInBlankHelpTarget.style.display = 'none';
    if (this.hasOrderSentencesHelpTarget) this.orderSentencesHelpTarget.style.display = 'none';
    if (this.hasOrderSentencesFieldsTarget) this.orderSentencesFieldsTarget.style.display = 'none';
    if (this.hasOrderElementsHelpTarget) this.orderElementsHelpTarget.style.display = 'none';
    if (this.hasOrderElementsFieldsTarget) this.orderElementsFieldsTarget.style.display = 'none';
    
    // Mostra o campo de resposta correta por padrão
    if (this.hasCorrectAnswerFieldTarget) this.correctAnswerFieldTarget.style.display = 'block';
    
    // Mostra campos específicos baseado no tipo
    switch (questionType) {
      case 'multiple_choice':
        if (this.hasMultipleChoiceFieldsTarget) this.multipleChoiceFieldsTarget.style.display = 'block';
        break;
      case 'fill_in_blank':
        if (this.hasFillInBlankHelpTarget) this.fillInBlankHelpTarget.style.display = 'block';
        break;
      case 'order_sentences':
        if (this.hasOrderSentencesHelpTarget) this.orderSentencesHelpTarget.style.display = 'block';
        if (this.hasOrderSentencesFieldsTarget) this.orderSentencesFieldsTarget.style.display = 'block';
        if (this.hasCorrectAnswerFieldTarget) this.correctAnswerFieldTarget.style.display = 'none';
        break;
      case 'order_elements':
        if (this.hasOrderElementsHelpTarget) this.orderElementsHelpTarget.style.display = 'block';
        if (this.hasOrderElementsFieldsTarget) this.orderElementsFieldsTarget.style.display = 'block';
        if (this.hasCorrectAnswerFieldTarget) this.correctAnswerFieldTarget.style.display = 'none';
        break;
    }
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
      case 'order_elements':
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
