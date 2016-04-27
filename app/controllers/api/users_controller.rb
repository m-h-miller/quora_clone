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


    if params[:topic_ids]
      if params[:_destroy] == "true"
        ut_id = UserTopic.find_by(user_id: current_user.id, topic_id: params[:topic_ids]).id
        puts ut_id
        puts "---"

        @user.update(user_topics_attributes: [{ id: ut_id, user_id: current_user.id, topic_id: params[:topic_ids], _destroy: "true" }])
      else
        @user.update(user_topics_attributes: [{ user_id: current_user.id, topic_id: params[:topic_ids] }])
      end

    end

    @user = current_user
    render "api/users/show"
  end

  private
    def user_params
      params.require(:user).permit(:user_name, :session_token, :password, :avatar, user_topics_attributes: [:id, :user_id, :topic_id, :_destroy ])
    end

end
