class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in!(@user)
      render "api/users/show"
    else
      render json: {errors: ["Unprocessable Entity!"]}, status: 422
    end
  end

  def index
    @user = User.includes(questions: [:answers, :author], answers: [:questions, :author]).all
  end

  def show
    @user = User.includes(:topics, questions: [:author, :answers], answers: [:question, :author]).find(params[:id])
  end

  private
    def user_params
      params.require(:user).permit(:user_name, :session_token, :password, :avatar)
    end

end
