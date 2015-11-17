class SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(
      params[:user][:user_name],
      params[:user][:password]
    )
    if user.nil?
      flash.now[:errors] = ["Incorrect username and/or password"]
      render :new
    else
      sign_in!(user)
    end
  end

  def destroy
    sign_out!
  end

  def new
    render :new
  end
end
