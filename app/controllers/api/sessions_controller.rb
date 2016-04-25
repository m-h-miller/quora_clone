class Api::SessionsController < ApplicationController

  def show
    unless current_user
      render json: {}
      return
    end

    user = current_user
  puts user.to_json
    render "api/users/_user"
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
      render "api/sessions/show"
    end
  end

  def destroy
    sign_out!
    render json: {}
  end

end
