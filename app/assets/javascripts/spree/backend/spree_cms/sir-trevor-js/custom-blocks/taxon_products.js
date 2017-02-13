SirTrevor.Blocks.TaxonProducts = SirTrevor.Block.extend({
  type: 'taxon_products',
  title: 'Products by Taxon',
  blockHtml: _.template([
    '<div class="row">',
      '<h2 class="sst__title">Products by Taxon</h2>',
      '<div class="col-md-6">',
        SpreeCmsUploader.getHtmlTemplate('heading_icon', "Icon", false, ['icon']),
        SpreeCmsForm.getInputTemplate('heading', 'Heading'),
        SpreeCmsForm.getInputTemplate('taxon_permalink', 'Taxon Path ie. "category/dresses"'),
      '</div>',
      '<input class="js-state" type="hidden" name="state" value="<%- state || "" %>">',
      '<input class="js-title" type="hidden" name="title" value="<%= data.title %>">',
    '</div>'
  ].join("\n")),
  uploadable: true,
  loadData: function(data) {
    var renderedHtml = this.blockHtml({
      data: data,
      state: 'edited'
    });

    this.$editor.html(renderedHtml).show();
    SpreeCmsUploader.bindUploaders(this);
  },

  onBlockRender: function() {
    var state = this.$editor.find("input[name='state']").val();
    if (typeof state === 'undefined' || state != 'edited') {
      this.loadData({});
    }
  },

  _serializeData: function() {
    var dataObj = {};
    this.$editor.find('.js-scms-value').each(function(_i, element) {
      dataObj[element.getAttribute('name')] = SpreeCmsForm.readValue(element);
    });

    dataObj.images = SpreeCmsUploader.gatherImages(this);
    this.setData(dataObj);
  }
});
