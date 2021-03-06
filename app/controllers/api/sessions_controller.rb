class Api::SessionsController < ApplicationController

  def show
    unless current_user
      render json: {}
      return
    end

    @user = current_user
    render "api/sessions/show"
  end

  def create
    current_user = User.find_by_credentials(
      params[:user][:user_name],
      params[:user][:password]
    )

    if current_user.nil?
      render json: {errors: ["Wrong!"]}, status: 401
    else
      sign_in!(current_user)
      @user = current_user
      render "api/sessions/show"
    end
  end

  def destroy
    sign_out!
    render json: {}
  end
end
