class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in!(@user)
      render json: "api/users/show"
    else
      render json: {errors: ["Unprocessable Entity!"]}, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
  end

  private
    def user_params
      params.require(:user).permit(:user_name, :session_token, :password, :avatar)
    end

end
