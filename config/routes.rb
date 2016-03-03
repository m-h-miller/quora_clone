Rails.application.routes.draw do
  root to: 'static_pages#root'

  get "/auth/facebook/callback", to: "omniauth#facebook"

  namespace :api, defaults: { format: :json } do
    resource :session, only: [ :create, :destroy, :show ]
    resources :users, only: [ :new, :create, :show, :index ]

    resources :topics, only: [ :new, :create, :index ]

    resources :search, only: :index

    resources :questions do
      resources :answers
    end
  end
end
