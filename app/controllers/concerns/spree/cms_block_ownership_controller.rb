module Spree
  module CmsBlockOwnershipController
    extend ActiveSupport::Concern
    included do
      after_action :update_cms_block_ownership, only: :update

      def update_cms_block_ownership
        owner = instance_variable_get "@#{params[:controller].split('/').last.singularize}"
        return if owner.blank?

        if params[:cms_blocks].present?
          owner.cms_blocks = []
          params[:cms_blocks].each do |cms_block_id|
            cms_block = Spree::CmsBlock.find_by(id: cms_block_id)
            next unless cms_block.present?
            owner.cms_blocks << cms_block
          end
        end

        if params[:cms_block_positions].present?
          params[:cms_block_positions].each do |cms_block_id, position|
            cms_block_owner = Spree::CmsBlockOwner.find_by(cms_block_id: cms_block_id, owner: owner)
            next unless cms_block_owner.present?
            cms_block_owner.update(position: position)
          end
        end
      end
    end
  end
end
