module Spree
  module Admin
    class UploadController < Spree::Admin::BaseController
      def upload
        remove_asset_id = params[:attachment][:remove]

        page_id = params[:attachment][:page]
        if !page_id.nil?
          page = Spree::Page.find(page_id)
          image = CmsImage.new(attachment: params[:attachment][:file])
          image.save
          page.images.push(image)
          page.save

          image.attachment.reprocess!

          response = {
            success: true,
            file: {
              id: image.id,
              url: image.attachment.url(:original),
              filename: image.attachment_file_name
            }
          }
        else
          response = {
            success: false
          }
        end

        render json: response
      end
    end
  end
end
