class AddFileTypeToSpreeAssets < ActiveRecord::Migration
  def up
    add_column :spree_assets, :file_type, :string
  end
  def down
    remove_column :spree_assets, :file_type, :string
  end
end
