require 'spree_core'
require 'spree_cms/engine'
require 'spree_cms/railtie'
require 'sir_trevor_rails'
require 'spree_cms/static_page'

module SpreeCms
  class Configuration
    attr_accessor :layouts
    attr_accessor :cms_block_groups

    def initialize
      @layouts = []
      @cms_block_groups = {}
    end
  end

  class << self
    attr_accessor :configuration

    def configure
      self.configuration ||= Configuration.new
      yield(configuration)
    end
  end
end
