class QuestionsController < ActionController::Base
  before_action :require_user_signed_in!, except: [:show]
  before_action :require_user_owns_question!, only: [:edit, :update, :destroy]

  def new
    @question = Question.new
    render :new
  end

  def show
    @question = Question.find(params[:id])
    render :show
  end

  def create
    @question = current_user.questions.new(question_params)
    if @question.save
      redirect_to questions_url(@question)


end
