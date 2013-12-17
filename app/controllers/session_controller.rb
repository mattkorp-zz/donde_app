class SessionController < ApplicationController

  def create
    user = User.where(username: params[:username]).first
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      user.active = true
      render json: user.to_json(except: :password_digest), status: 200
    else
      render json: {message: "can't login"}, status: 401
    end
  end

  def destroy
    # logout user and let db know too
    user = User.where(username: params[:username]).first
    user.active = false
    user.save
    session[:user_id] = nil
    redirect_to root_url, notice: "Logged out!"
  end

end
