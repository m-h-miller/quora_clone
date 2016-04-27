Rails.application.routes.draw do
  root to: 'static_pages#root'

  get "/auth/facebook/callback", to: "omniauth#facebook"

  namespace :api, defaults: { format: :json } do
    resource :session, only: [ :create, :destroy, :show ]
    resources :users, only: [ :new, :create, :show, :index, :update ]

    resources :topics, only: [ :new, :create, :index, :show ]

    resources :search, only: :index

    resources :questions do
      resources :answers

      member do
        post "upvote"
      end
    end
  end
end
