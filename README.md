SpreeCms
========

## Installation

1. Add this extension to your Gemfile with this line:
  ```ruby
  gem 'spree_cms', github: 'praesensco/spree_cms'
  ```

2. Install the gem using Bundler:
  ```ruby
  bundle install
  ```

3. Copy & run migrations
  ```ruby
  bundle exec rails g spree_cms:install
  ```

4. Restart your server
  If your server was running, restart it so that it can find the assets properly.
