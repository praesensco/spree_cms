class AddGroupToSpreeCmsBlocks < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_cms_blocks, :group, :string, default: :default
    add_index :spree_cms_blocks, [:group], name: :index_spree_cms_blocks_on_group, using: :btree

    create_table :spree_cms_block_owners, force: :cascade do |t|
      t.references :owner, polymorphic: true, index: true
      t.integer :cms_block_id
      t.integer :position, default: 0
      t.timestamps
    end

  end
end
