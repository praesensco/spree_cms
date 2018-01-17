module StaticPage
  module_function

  def remove_spree_mount_point(path)
    regex = Regexp.new '\A' + Rails.application.routes.url_helpers.spree_path
    path.sub(regex, '').split('?')[0]
  end
end

module Spree
  class StaticPage
    def self.matches?(request)
      request_match = request.path =~ %r{
        \A\/+
        (admin|account|cart|checkout|content|login|pg\/|orders|products|s\/|session|signup|shipments|states|t\/|tax_categories|user)+
      }x
      return false if request_match
      !Spree::Page.visible.find_by_slug(request.path).nil?
    end
  end
end
