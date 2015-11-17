class SessionsController < ActionController::Base
  def create
    user = User.find_by_credentials(
      params[:user][:username],
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
    redirect_to new_session_url
  end

  def new
    render :new
  end
end
