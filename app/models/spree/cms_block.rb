class Spree::CmsBlock < Spree::Base
  sir_trevor_content :body

  has_and_belongs_to_many :stores, join_table: 'spree_cms_blocks_stores'
  has_many :images, -> { order(:position) }, as: :viewable, dependent: :destroy, class_name: "Spree::CmsImage"

  scope :by_store, ->(store) { joins(:stores).where('spree_cms_blocks_stores.store_id = ?', store) }

  validates :title, presence: true
  validates :slug, presence: true, uniqueness: true
end
