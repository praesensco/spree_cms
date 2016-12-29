require 'spree_cms/page_helpers'

module SpreeCms
  class Railtie < Rails::Railtie
    initializer "spree_cms.page_helpers" do
      ActionView::Base.send :include, PageHelpers
    end
  end
end
