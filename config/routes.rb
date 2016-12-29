Spree::Core::Engine.add_routes do
  namespace :admin, path: Spree.admin_path do
    resources :pages
    post 'upload' => 'upload#upload'
  end
  constraints(Spree::StaticPage) do
    get '/(*path)', to: 'static_content#show', as: 'static'
  end
end
