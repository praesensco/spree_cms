class InitSpreeCms < ActiveRecord::Migration[5.1]
  def change
    create_table "spree_pages", force: :cascade do |t|
      t.string   "title"
      t.text     "body"
      t.string   "slug"
      t.datetime "created_at"
      t.datetime "updated_at"
      t.boolean  "show_in_header",           default: false, null: false
      t.boolean  "show_in_footer",           default: false, null: false
      t.string   "foreign_link"
      t.integer  "position",                 default: 1,     null: false
      t.boolean  "visible",                  default: true
      t.string   "meta_keywords"
      t.string   "meta_description"
      t.string   "layout"
      t.boolean  "show_in_sidebar",          default: false, null: false
      t.string   "meta_title"
      t.boolean  "render_layout_as_partial", default: false
    end

    add_index "spree_pages", ["slug"], name: "index_spree_pages_on_slug", using: :btree

    create_table "spree_pages_stores", id: false, force: :cascade do |t|
      t.integer  "store_id"
      t.integer  "page_id"
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    add_index "spree_pages_stores", ["page_id"], name: "index_spree_pages_stores_on_page_id", using: :btree
    add_index "spree_pages_stores", ["store_id"], name: "index_spree_pages_stores_on_store_id", using: :btree
  end
end
