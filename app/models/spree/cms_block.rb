class Spree::CmsBlock < Spree::Base
  sir_trevor_content :body

  has_and_belongs_to_many :stores, join_table: 'spree_cms_blocks_stores'
  has_many :images, -> { order(:position) }, as: :viewable, dependent: :destroy, class_name: 'Spree::CmsImage'
  has_many :cms_block_owners

  scope :by_store, ->(store) { joins(:stores).where('spree_cms_blocks_stores.store_id = ?', store) }
  scope :by_group, ->(group) { where(group: group) }
  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }

  validates :title, presence: true
  validates :slug, uniqueness: true
  before_save :validate_group_assingment
  before_save :create_slug_before_save

  self.whitelisted_ransackable_attributes = %w[active group title]

  def self.default_group_key
    group_key, = SpreeCms.configuration.cms_block_groups.find { |_, h| h[:default] }
    group_key, = SpreeCms.configuration.cms_block_groups.first if group_key.blank?
    group_key
  end

  def blocks(type = nil)
    return body.to_a if type.nil?
    body.to_a.select { |block| block_type? block, type }
  end

  def position_for_owner(owner)
    cms_block_owner = cms_block_owners.find_by(owner: owner)
    return unless cms_block_owner
    cms_block_owner.position
  end

  private

  def block_type(block)
    block.class.name.split('::').last
  end

  def block_type?(block, type)
    block_type(block) == type
  end

  def create_slug_before_save
    generate_slug if slug.blank?
  end

  def generate_slug
    new_slug_minimal = title.to_s.parameterize
    unless Spree::CmsBlock.exists?(slug: new_slug_minimal)
      return self.slug = new_slug_minimal
    end

    new_slug_iteration = 1
    new_slug = "#{new_slug_minimal}_#{new_slug_iteration}"
    while Spree::CmsBlock.exists?(slug: new_slug)
      new_slug_iteration += 1
      new_slug = "#{new_slug_minimal}_#{new_slug_iteration}"
    end
    self.slug = new_slug
  end

  def validate_group_assingment
    self.group = self.class.default_group_key if group.blank?
  end
end
