class AddActiveToSpreeCmsBlocks < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_cms_blocks, :active, :boolean, default: :true
  end
end
