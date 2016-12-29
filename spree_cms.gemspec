lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

require 'spree_cms/version'

Gem::Specification.new do |spec|
  spec.name          = "spree_cms"
  spec.version       = SpreeCms::VERSION
  spec.email         = ["pawel@praesens.co"]
  spec.authors       = ["Paweł Strzałkowski", "Michał Jóźwin"]
  spec.summary       = %q{spree_static combined with sir-trevor-js}
  spec.description   = %q{A combination of spree_static and sir-trevor-js on steroids}
  spec.homepage      = "http://praesens.co/"
  spec.license       = "MIT"

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency 'spree_core', '>= 3.1.0', '< 4.0'
  spec.add_dependency 'sir_trevor_rails'
end
