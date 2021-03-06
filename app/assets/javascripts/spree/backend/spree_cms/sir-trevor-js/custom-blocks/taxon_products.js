SirTrevor.Blocks.TaxonProducts = SirTrevor.Block.extend({
  type: 'taxon_products',
  title: 'Products by Taxon',
  blockHtml: _.template(
    `<div class="row">
      <div class="col-md-12"><h2>Products by Taxon</h2></div>
      <div class="col-md-6">
        ${SpreeCmsForm.getInputTemplate('heading', 'Heading')}
        ${SpreeCmsForm.getInputTemplate('taxon_permalink', 'Taxon Path ie. "category/dresses"')}
      </div>
      <input class="js-state" type="hidden" name="state" value="<%- state || "" %>">
    </div>`
  ),
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
