class Spree::CmsBlockOwner < Spree::Base
  belongs_to :cms_block
  belongs_to :owner, polymorphic: true
end
