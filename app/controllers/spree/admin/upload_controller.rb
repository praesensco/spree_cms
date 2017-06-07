module Spree
  module Admin
    class UploadController < Spree::Admin::BaseController
      def upload
        render json: process_image_upload
      end

      private

      def process_image_upload
        page = Spree::Page.find_by(id: params[:attachment][:page])

        if page.present?
          image = CmsImage.create!(
            file_type: params[:attachment][:block_type],
            attachment: params[:attachment][:file]
          )
          page.images.push(image)
          page.save

          {
            success: true,
            file: {
              id: image.id,
              url: image.attachment.url(:original),
              filename: image.attachment_file_name
            }
          }
        else
          { success: false }
        end
      end
    end
  end
end
