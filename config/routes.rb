Spree::Core::Engine.routes.draw do
  # Add your extension routes here
end

Spree::Core::Engine.add_routes do
  namespace :admin, path: Spree.admin_path do
    resources :cms_blocks
    resources :pages do
      collection do
        get '/category/:category' => 'pages#index'
        get '/category/:category/new' => 'pages#new'
        get '/category/:category/:id/edit' => 'pages#edit'
      end
    end

    post 'upload' => 'upload#upload'
  end
  constraints(Spree::StaticPage) do
    get '/(*path)', to: 'static_content#show', as: 'static'
  end
end
