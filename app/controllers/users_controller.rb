class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def show
    @user = User.where(id: params[:id]).first
    if @user
      render json: @user.to_json(except: :password_digest), status: 200
    else
      render json: {message: "can't find friend"}, status: 401
    end
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      render json: @user.to_json(except: :password_digest), status: 200
    else
      render json: {message: "can't login"}, status: 401
    end
  end

  def update
    @user = User.where(id: params[:id]).first.tap do |user|
      user.latitude = params[:latitude]
      user.longitude = params[:longitude]
      user.active = true
      user.save!
    end
    render json: @user.to_json(except: :password_digest), status: 200
  end
end
