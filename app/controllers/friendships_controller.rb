class FriendshipsController < ApplicationController
  respond_to :html, :json
    # GET /friendships.json
  def index
    @friendships = []
    user = User.where({id: params[:user_id]}).first
    @friendships << user.friends
    @friendships << user.inverse_friends
    if !@friendships.nil?
      respond_with(@friendships.flatten.to_json)
    else
      respond_with("no friends found")
    end
  end

  # GET /friendships/1.json
  def show
    binding.pry
    user = User.where({id: params[:id]}).first
    friendships = {users: user.friends}
    if !friendships.nil?
      render json: friendships[:users].to_json, status: 200
    else
      render json: "no friends found", status: 200
    end
  end

  # GET /friendships/new
  def new
    @friendship = Friendship.new
  end

  # POST /friendships.json
  def create
    binding.pry
    @friendship = Friendship.new(friendship_params)
    if @friendship.save
      render action: 'show', status: :created, location: @friendship
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /friendships/1.json
  def update
    if @friendship.update(friendship_params)
      head :no_content
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  # DELETE /friendships/1.json
  def destroy
    @friendship.destroy
    head :no_content
  end
end


