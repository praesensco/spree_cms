class AddCategoryToSpreePages < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_pages, :category, :string, default: :page
    add_index :spree_pages, [:category], name: :index_spree_pages_on_category, using: :btree
  end
end
