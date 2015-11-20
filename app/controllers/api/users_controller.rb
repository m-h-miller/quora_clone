class Api::UsersController < ApplicationController

  def index
    @users = User.order(created_at: :desc).all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in!(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new, status: :unprocessable_entity
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
