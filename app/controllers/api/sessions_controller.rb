class Api::SessionsController < ApplicationController

  def show
    unless current_user
      render json: {}
      return
    end

    @user = current_user
    render json: @user
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:user_name],
      params[:user][:password]
    )
    if @user.nil?
      render json: {errors: ["Wrong!"]}, status: 401
    else
      sign_in!(@user)
      render json: @user
    end
  end

  def destroy
    sign_out!
    render json: {}
  end

end
