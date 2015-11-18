class Api::QuestionsController < ApplicationController
  before_action :require_user_signed_in!, except: [:show]
  before_action :require_user_owns_question!, only: [:edit, :update, :destroy]

  def new
    @question = Question.new
  end

  def index
    @questions = Question.all
  end

  def show
    @question = Question.find(params[:id])
  end

  def create
    @question = current_user.questions.new(question_params)
    if @question.save
      redirect_to question_url(@question)
    else
      flash.now[:errors] = @question.errors.full_messages
      render :new
    end
  end

  private
    def question_params
      params.require(:question).permit(:title, :body, :author_id)
    end

    def require_user_owns_question!
      return if Post.find(params[:id]).author == current_user
      render json: "Forbidden", status: :forbidden
    end


end
