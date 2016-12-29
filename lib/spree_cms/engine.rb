module SpreeCms
  class Engine < Rails::Engine
    require 'spree/core'
    isolate_namespace Spree
    engine_name 'spree_cms'

    paths["app/helpers"]

    config.autoload_paths += %W(#{config.root}/lib)

    def self.activate
    end

    config.to_prepare(&method(:activate).to_proc)
  end
end
