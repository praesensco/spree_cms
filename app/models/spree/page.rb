class Spree::Page < ActiveRecord::Base
  sir_trevor_content :body

  default_scope { order(position: :asc) }

  has_and_belongs_to_many :stores, join_table: 'spree_pages_stores'
  has_many :images, -> { order(:position) }, as: :viewable, dependent: :destroy, class_name: "Spree::CmsImage"

  validates :title, presence: true
  validates :slug, presence: true, if: :not_using_foreign_link?
  validates :layout, presence: true, if: :render_layout_as_partial?
  validates :slug, uniqueness: true, if: :not_using_foreign_link?
  validates :foreign_link, uniqueness: true, allow_blank: true

  scope :visible, -> { where(visible: true) }
  scope :header_links, -> { where(show_in_header: true).visible }
  scope :footer_links, -> { where(show_in_footer: true).visible }
  scope :sidebar_links, -> { where(show_in_sidebar: true).visible }

  scope :by_store, ->(store) { joins(:stores).where('spree_pages_stores.store_id = ?', store) }

  before_save :update_positions_and_slug
  before_save :remove_unused_assets

  def initialize(*args)
    super(*args)
    last_page = Spree::Page.last
    self.position = last_page ? last_page.position + 1 : 0
  end

  def link
    foreign_link.blank? ? slug : foreign_link
  end

  private

  def remove_unused_assets
    all_image_ids = image_ids
    body.to_a.each do |block|
      if !block.images.nil?
        block.images.each do |key, images_by_type|
          images_by_type.each do |image_type, image|
            if image[:id].nil?
              image.each do |image_element_type, image_element|
                next if image_element[:id].blank?
                all_image_ids -= [image_element[:id].to_i]
              end
            else
              all_image_ids -= [image[:id].to_i]
            end
          end
        end
      end
    end
    
    all_image_ids.each do |asset_id|
      Spree::Asset.find(asset_id).delete
    end
  end

  def update_positions_and_slug
    # Ensure that all slugs start with a slash.
    slug.prepend('/') if not_using_foreign_link? && !slug.start_with?('/')
    return if new_record?
    return unless (prev_position = Spree::Page.find(id).position)
    if prev_position > position
      Spree::Page.where('? <= position and position < ?', position, prev_position).update_all('position = position + 1')
    elsif prev_position < position
      Spree::Page.where('? < position and position <= ?', prev_position, position).update_all('position = position - 1')
    end
  end

  def not_using_foreign_link?
    foreign_link.blank?
  end
end
