class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      session[:user_id] = @user.id
      user.active = true
      render json: @user.to_json(except: :password_digest), status: 200
    else
      render json: {message: "can't login"}, status: 401
    end
  end

  def update
    @user = User.where(id: params[:id]).first
    @user.latitude = params[:latitude]
    @user.longitude = params[:longitude]
    @user.active = true
    @user.save
    render json: @user.to_json(except: :password_digest), status: 200
  end
end
