class Api::QuestionsController < ApplicationController
  before_action :require_user_signed_in!
  before_action :require_user_owns_question!, only: [:edit, :update, :destroy]

  def new
    @question = Question.new
    render json: @question
  end

  def index
    @questions = Question.includes(:author).all
  end

  def show
    @question = Question.find(params[:id])
  end

  def create
    @question = current_user.questions.new(question_params)
    if @question.save
      render json: @question
    else
      render json: @question.errors
    end
  end

  private
    def question_params
      params.require(:question).permit(:title, :body)
    end

    def require_user_owns_question!
      return if Post.find(params[:id]).author == current_user
      render json: "Forbidden", status: :forbidden
    end


end
