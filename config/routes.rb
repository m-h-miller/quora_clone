Rails.application.routes.draw do
  root to: 'static_pages#root'

  resource :session, only: [:create, :destroy, :new]

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :new, :show, :index]
    resources :questions do
      resources :answers
    end
  end
end
