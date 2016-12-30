lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

require 'spree_cms/version'

# encoding: UTF-8
Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'spree_cms'
  s.version     = SpreeCms::VERSION
  s.summary       = %q{spree_static combined with sir-trevor-js}
  s.description   = %q{A combination of spree_static and sir-trevor-js on steroids}
  s.required_ruby_version = '>= 2.1.0'

  s.email         = ["pawel@praesens.co"]
  s.authors       = ["Paweł Strzałkowski", "Michał Jóźwin"]
  s.homepage      = "http://praesens.co/"
  s.license = 'BSD-3'

  s.files       = `git ls-files`.split("\n")
  s.require_path = 'lib'
  s.requirements << 'none'

  s.add_dependency 'spree_core', '~> 3.1.3'
  s.add_dependency 'sir_trevor_rails', '~> 0'

  s.add_development_dependency 'capybara', '~> 2.6'
  s.add_development_dependency 'coffee-rails'
  s.add_development_dependency 'database_cleaner'
  s.add_development_dependency 'factory_girl', '~> 4.5'
  s.add_development_dependency 'ffaker'
  s.add_development_dependency 'rspec-rails', '~> 3.4'
  s.add_development_dependency 'sass-rails', '~> 5.0.0'
  s.add_development_dependency 'selenium-webdriver'
  s.add_development_dependency 'simplecov'
  s.add_development_dependency 'sqlite3'

end
