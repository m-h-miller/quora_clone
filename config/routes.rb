Rails.application.routes.draw do
  root to: 'static_pages#root'

  get "/auth/facebook/callback", to: "omniauth#facebook"

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy, :show]
    resources :users, only: [:new, :create, :show, :index]
    resources :questions do
      resources :answers do
        resources :comments
      end
    end
  end
end
