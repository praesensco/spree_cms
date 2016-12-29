module SpreeCms
  module Generators
    class InstallGenerator < Rails::Generators::Base
      class_option :auto_run_migrations, type: :boolean, default: false

      def add_javascripts
        js_requires = [
          "//= require spree/backend/spree_cms/lib/underscore",
          "//= require spree/backend/spree_cms/lib/eventable",
          "//= require spree/backend/spree_cms/uploader",
          "//= require spree/backend/spree_cms/sir-trevor-js/sir-trevor",
          "//= require spree/backend/spree_cms/sir-trevor-js/utils",
          "//= require spree/backend/spree_cms/sir-trevor-js/custom-blocks/hero",
          "//= require spree/backend/spree_cms/sir-trevor-js/custom-blocks/banners",
          "//= require spree/backend/spree_cms/initialize",
          ""
        ]
        # append_file 'vendor/assets/javascripts/spree/backend/all.js', js_requires.join("\n")

        puts 'Add manually the following lines to vendor/assets/javascripts/spree/backend/all.js'
        js_requires.each do |req|
          puts req.to_s
        end
      end

      def add_stylesheets
        puts 'Add manually the following lines to vendor/assets/stylesheets/spree/frontend/all.css'
        puts " *= require spree/frontend/spree_cms"
        puts ''

        puts 'Add manually the following lines to vendor/assets/stylesheets/spree/backend/all.css'
        puts " *= require spree/backend/spree_cms"
        puts ''

        # inject_into_file 'vendor/assets/stylesheets/spree/frontend/all.css', " *= require spree/frontend/spree_cms\n", before: /\*\//, verbose: true
        # inject_into_file 'vendor/assets/stylesheets/spree/backend/all.css', " *= require spree/backend/spree_cms\n", before: /\*\//, verbose: true
      end

      def add_migrations
        run 'bundle exec rake railties:install:migrations FROM=spree_cms'
      end

      def run_migrations
        run_migrations = options[:auto_run_migrations] || ['', 'y', 'Y'].include?(ask 'Would you like to run the migrations now? [Y/n]')
        if run_migrations
          run 'bundle exec rake db:migrate'
        else
          puts 'Skipping rake db:migrate, don\'t forget to run it!'
        end
      end
    end
  end
end
