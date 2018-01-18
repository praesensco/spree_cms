module Spree
  module Admin
    class UploadController < Spree::Admin::BaseController
      def upload
        render json: process_image_upload
      end

      private

      def process_image_upload
        resource = if params[:attachment][:page].present?
                     Spree::Page.find_by(id: params[:attachment][:page])
                   elsif params[:attachment][:cmsblock].present?
                     Spree::CmsBlock.find_by(id: params[:attachment][:cmsblock])
                   end
        return { success: false, file: {} } if resource.blank?

        image = CmsImage.create!(
          file_type: params[:attachment][:block_type],
          attachment: params[:attachment][:file]
        )
        resource.images.push(image)
        resource.save

        {
          success: true,
          file: {
            id: image.id,
            url: image.attachment.url(:original),
            filename: image.attachment_file_name
          }
        }
      end
    end
  end
end
