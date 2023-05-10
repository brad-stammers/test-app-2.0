Rails.application.routes.draw do

  get 'sessions/create'
  get 'sessions/destroy'
  get 'home/login'
  get 'home/signup'

  post "/login", to: 'sessions#create'
  post "/logout", to: 'sessions#destroy'
  get "/logged_in", to: 'sessions#is_logged_in?'
  post "/signup", to: 'users#create'

  get "/fruits", to: "home#fruits"

  root to: 'home#index'

  namespace :api do
    namespace :v1 do
      resources :fruits
    end
  end

end
