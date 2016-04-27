class Api::TopicsController < ApplicationController

  def new
    @topic = Topic.new
    render json: @topic
  end

  def create
    puts params

    @topic = Topic.new(topic_params)
    if @topic.save
      render "api/topics/show"
    else
      render json: @topic.errors, status: :unprocessable_entity
    end
  end

  def show
    @topic = Topic.find(params[:id])
  end

  def index
    @topics = Topic.all
  end

  private
    def topic_params
      params.require(:topic).permit(:name, :description)
    end

end
