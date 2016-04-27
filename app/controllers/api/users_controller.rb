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
    @user = User.includes(:user_topics).includes(questions: [:author, :answers], answers: [:question, :author]).find(params[:id])
  end

  def update
    @user = current_user

    # if params[:topic_ids]
    #   puts @user
    #   puts params[:topic_ids]
    #
    #   topic = params[:topic_ids].to_i
    #   topic = [topic]
    #
    #
    #
    #   @user.user_topics_attributes= topic
    #   puts @user
    # end

    if params[:topic_ids]
      if @user.update!(user_topics_attributes: [{ user_id: current_user.id, topic_id: params[:topic_ids] }])
        puts "mama we made it"
        puts "------------------"
        puts "------------------"
      end
    end

    @user = current_user
    render "api/users/show"
  end

  private
    def user_params
      params.require(:user).permit(:user_name, :session_token, :password, :avatar, user_topics_attributes: :topic_id )
    end

end
