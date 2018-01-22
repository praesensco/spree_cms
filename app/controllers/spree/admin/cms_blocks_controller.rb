module Spree
  module Admin
    class CmsBlocksController < ResourceController
      def index
        respond_with(@collection)
      end

      private

      def collection
        return @collection if @collection.present?
        # params[:q] can be blank upon pagination
        params[:q] = {} if params[:q].blank?
        params[:q].each do |key, param|
          next if param.blank?
          instance_variable_set "@selected_cms_blocks_#{key}", param
        end

        @collection = super
        @search = @collection.ransack(params[:q])
        @collection = @search.result.
                      page(params[:page]).
                      per(Spree::Config[:admin_properties_per_page])
      end
    end
  end
end
