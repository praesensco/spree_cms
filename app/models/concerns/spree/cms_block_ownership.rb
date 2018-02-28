module Spree
  module CmsBlockOwnership
    extend ActiveSupport::Concern
    included do
      has_many :cms_block_owners, as: :owner
      has_many :cms_blocks, through: :cms_block_owners

      def cms_block_by_group(group)
        cms_blocks_by_group(group).find(&:active)
      end

      def cms_blocks_by_group(group)
        return [] if cms_blocks_group_hash[group].blank?
        cms_blocks_group_hash[group]
      end

      def cms_blocks_by_group_with_positions(group)
        cms_blocks_by_group(group).
          map { |b| [b.position_for_owner(self), b] }.to_h
      end

      def cms_block_groups
        cms_blocks_group_hash.keys.uniq
      end

      def cms_blocks_group_hash
        @cms_blocks_group_hash ||= begin
          blocks = {}
          cms_blocks.each do |b|
            blocks[b.group] ||= []
            blocks[b.group] << b
          end
          blocks
        end
      end
    end
  end
end
