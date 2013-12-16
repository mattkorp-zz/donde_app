DondeApp::Application.routes.draw do
  # resources :friendships
  resources :sessions
  resources :users do
    resources :friendships
  end

  get  'signup', to: 'users#new',        as: 'signup'
  get   'login', to: 'sessions#new',     as: 'login'
  post '/login', to: 'session#create'
  get  'logout', to: 'sessions#destroy', as: 'logout'

  root to: 'welcome#index'

  get "welcome/index"

end
