DondeApp::Application.routes.draw do
  #resources :sessions

  resources :users do
    resources :friendships
  end

  get    'signup', to: 'users#new',        as: 'signup'
  post    'login', to: 'session#create'
  post   'logout', to: 'session#destroy',  as: 'logout'

  root to: 'welcome#index'


end
