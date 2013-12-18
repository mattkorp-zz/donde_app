DondeApp::Application.routes.draw do
  #resources :sessions
  resources :friendships
  resources :users


  get    'signup', to: 'users#new',        as: 'signup'
  post    'login', to: 'session#create'
  post   'logout', to: 'session#destroy',  as: 'logout'

  root to: 'welcome#index'


end
