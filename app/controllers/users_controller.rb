class UsersController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in!(@user)
      render json: "api/questions/"
    else
      render json: {errors: ["Unprocessable Entity!"]}, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  private
    def user_params
      params.require(:user).permit(:user_name, :session_token, :password, :avatar)
    end

end
