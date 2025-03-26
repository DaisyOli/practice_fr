class QuestionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_activity
  before_action :set_question, only: [:edit, :update, :destroy]
  before_action :check_teacher_permission

  def new
    @question = @activity.questions.build
  end

  def create
    @question = @activity.questions.build(question_params)
    
    Rails.logger.info "=== Criando nova questão ==="
    Rails.logger.info "Tipo de questão: #{@question.question_type}"
    Rails.logger.info "Conteúdo: #{@question.content.inspect}"
    Rails.logger.info "Resposta correta: #{@question.correct_answer.inspect}"
    Rails.logger.info "Opções: #{@question.options.inspect}"
    Rails.logger.info "Options text: #{@question.options_text.inspect}"
    Rails.logger.info "Sentences content: #{@question.sentences_content.inspect}"

    if @question.save
      Rails.logger.info "Questão salva com sucesso!"
      redirect_to activity_path(@activity, ultimo_id: @question.id), notice: t('messages.question_created')
    else
      Rails.logger.error "Erros ao salvar questão:"
      @question.errors.full_messages.each do |error|
        Rails.logger.error "- #{error}"
      end
      flash.now[:alert] = @question.errors.full_messages.join(", ")
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    Rails.logger.info "=== Atualizando questão #{@question.id} ==="
    Rails.logger.info "Parâmetros: #{question_params.inspect}"
    
    if @question.update(question_params)
      Rails.logger.info "Questão atualizada com sucesso!"
      redirect_to activity_path(@activity, ultimo_id: @question.id), notice: t('messages.question_updated')
    else
      Rails.logger.error "Erros ao atualizar questão:"
      @question.errors.full_messages.each do |error|
        Rails.logger.error "- #{error}"
      end
      flash.now[:alert] = @question.errors.full_messages.join(", ")
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @question.destroy
    redirect_to activity_path(@activity, ultima_acao: 'questao_excluida'), notice: t('messages.question_deleted')
  end

  private

  def set_activity
    @activity = Activity.find(params[:activity_id])
  end

  def set_question
    @question = @activity.questions.find(params[:id])
  end

  def question_params
    permitted = params.require(:question).permit(:content, :correct_answer, :question_type, :options_text, :sentences_content, options: [])
    Rails.logger.info "Parâmetros permitidos em question_params: #{permitted.inspect}"
    permitted
  end

  def check_teacher_permission
    unless current_user.role == "teacher" && @activity.teacher == current_user
      redirect_to activities_path, alert: t('messages.permission_denied')
    end
  end
end

