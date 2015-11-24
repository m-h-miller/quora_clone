class Api::AnswersController < ApplicationController
  before_action :require_user_owns_answer!, only: [:edit, :update, :destroy]

  def new
    @answer = Answer.new
    render json: @answer
  end

  def index
    @answers = Answer.includes(:author).where("question_id = ?", params[:question_id])
  end

  def show
    @answer = Answer.find(params[:id])
  end

  def create
    @answer = current_user.answers.new(answer_params)
    if @answer.save
      render "api/answers/show"
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  private
    def answer_params
      params.require(:answer).permit(:title, :body, :question_id)
    end

    def require_user_owns_answer!
      return if Answer.find(params[:id]).author == current_user
      render json: "Forbidden", status: :forbidden
    end

end
