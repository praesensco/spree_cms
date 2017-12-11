Deface::Override.new(
  virtual_path: 'spree/layouts/admin',
  name: 'add_cms_block_list_to_head',
  insert_top: '[data-hook="admin_inside_head"]',
  partial: 'spree/admin/shared/cms_block_list'
)
