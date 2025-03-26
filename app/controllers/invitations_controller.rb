class InvitationsController < Devise::InvitationsController
  before_action :configure_permitted_parameters
  before_action :configure_mailer_sender
  
  # Sobrescrevendo métodos do controlador de convites do Devise
  def after_invite_path_for(resource)
    teacher_dashboard_path
  end
  
  # Redirecionar após aceitar o convite
  def after_accept_path_for(resource)
    if resource.is_a?(User) && resource.student?
      student_dashboard_path
    else
      teacher_dashboard_path
    end
  end
  
  protected
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:invite, keys: [:role])
    devise_parameter_sanitizer.permit(:accept_invitation, keys: [])
  end
  
  def configure_mailer_sender
    # Configura dinamicamente o endereço de e-mail do remetente
    mail_address = ENV['GMAIL_USERNAME'] || 'practicefrsite@gmail.com'
    ActionMailer::Base.default_options = { 
      from: mail_address,
      reply_to: mail_address,
      'X-Priority' => '1',
      'X-MSMail-Priority' => 'High',
      'X-Mailer' => 'Practice FR Educational Platform',
      'X-Auto-Response-Suppress' => 'OOF, DR, RN, NRN, AutoReply',
      'Precedence' => 'Bulk'
    }
  end
end