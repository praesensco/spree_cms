SirTrevor.Blocks.CmsBlock = SirTrevor.Blocks.Abstract.extend({
  type: 'cms_block',
  title: 'Cms Block',
  header: '',
  blockHtml: _.template([
    '<div class="row">',
      '<div class="col-md-12">',
        SpreeCmsForm.getSelectTemplate('block_id', 'CMS Block', availableCmsBlocks),
      '</div>',
      '<input class="js-state" type="hidden" name="state" value="<%- state || "" %>">',
    '</div>'
  ].join("\n"))
});
