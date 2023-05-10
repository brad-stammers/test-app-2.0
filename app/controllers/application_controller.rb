class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  helper_method :logged_in?
  skip_before_action :verify_authenticity_token
  def secret_key
    "PeShVkYp3s6v9y$B&E)H@McQfTjWnZq4"
  end
  def encode_token(payload)
    JWT.encode(payload, secret_key)
  end
  def decode_token(token)
    begin
      JWT.decode(token, secret_key, true, algorithm: 'HS256')
    rescue JWT::DecodeError
      [{error: 'Invalid Token'}]
    end
  end
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  def login!
    session[:user_id] = @user.id
  end
  def logged_in?
    !!session[:user_id]
  end
  def authorised_user?
    @user == current_user
  end
  def logout!
    session.delete(:user_id)
    @current_user = nil
  end
  def set_user
    @user = User.find_by(id: session[:user_id])
  end
end
