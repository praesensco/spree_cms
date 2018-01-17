class Spree::CmsBlock < Spree::Base
  sir_trevor_content :body

  has_and_belongs_to_many :stores, join_table: 'spree_cms_blocks_stores'
  has_many :images, -> { order(:position) }, as: :viewable, dependent: :destroy, class_name: 'Spree::CmsImage'

  scope :by_store, ->(store) { joins(:stores).where('spree_cms_blocks_stores.store_id = ?', store) }
  scope :by_group, ->(group) { where(group: group) }

  validates :title, presence: true
  validates :slug, presence: true, uniqueness: true

  has_many :cms_block_owners

  def position_for_owner(owner)
    cms_block_owner = cms_block_owners.find_by(owner: owner)
    return unless cms_block_owner
    cms_block_owner.position
  end

  def blocks(type = nil)
    return body.to_a if type.nil?
    body.to_a.select { |block| block_type? block, type }
  end

  private

  def block_type(block)
    block.class.name.split('::').last
  end

  def block_type?(block, type)
    block_type(block) == type
  end
end
