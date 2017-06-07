module Spree
  module Admin
    class PagesController < ResourceController
      after_action :remove_unused_assets, only: :update

      private

      def remove_unused_assets
        image_ids_to_delete = @page.image_ids
        @page.body.to_a.each do |block|
          if !block.images.nil?
            block.images.each do |key, images_by_type|
              images_by_type.each do |image_type, image|
                if image[:id].nil?
                  image.each do |image_element_type, image_element|
                    next if image_element[:id].blank?
                    image_ids_to_delete -= [image_element[:id].to_i]
                  end
                else
                  image_ids_to_delete -= [image[:id].to_i]
                end
              end
            end
          end
        end

        image_ids_to_delete.each do |asset_id|
          Spree::Asset.find(asset_id).delete
        end
      end
    end
  end
end
