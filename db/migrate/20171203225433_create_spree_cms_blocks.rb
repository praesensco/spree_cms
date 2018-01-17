class CreateSpreeCmsBlocks < ActiveRecord::Migration[5.1]
  def change
    create_table "spree_cms_blocks", force: :cascade do |t|
      t.string   "title"
      t.string   "slug"
      t.text     "body"
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    create_table "spree_cms_blocks_stores", id: false, force: :cascade do |t|
      t.integer  "store_id"
      t.integer  "cms_block_id"
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    add_index "spree_cms_blocks_stores", ["cms_block_id"], name: "index_spree_cms_blocks_stores_on_block_id", using: :btree
    add_index "spree_cms_blocks_stores", ["store_id"], name: "index_spree_cms_blocks_stores_on_store_id", using: :btree
  end
end
