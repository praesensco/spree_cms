module Spree
  module Admin
    class PagesController < ResourceController
      after_action :remove_unused_assets, only: :update
      before_action :prepare_category, only: %i[index new]

      def index
        @pages = @pages.try(@category)
      end

      protected

      def location_after_save
        edit_admin_page_path
      end

      private

      def prepare_category
        if params[:category].blank?
          redirect_to action: :index, category: :page
          return
        end
        @category = params[:category]
      end

      def remove_unused_assets
        image_ids_to_delete = @page.image_ids
        @page.body.to_a.each do |block|
          next if block.images.nil?

          block.images.each_value do |images_by_type|
            images_by_type.each_value do |image|
              if image[:id].nil?
                image.each_value do |image_element|
                  next if image_element[:id].blank?
                  image_ids_to_delete -= [image_element[:id].to_i]
                end
              else
                image_ids_to_delete -= [image[:id].to_i]
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
