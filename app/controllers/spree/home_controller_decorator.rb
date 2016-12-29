Spree::HomeController.class_eval do
  before_action :load_homepage, only: [:index]

  private

  def load_homepage
    @page = Spree::Page.by_store(current_store).visible.find_by_slug!('/home')
  end
end
