SirTrevor.Blocks.ShopByCategory = SirTrevor.Block.extend({
  type: 'shop_by_category',
  title: 'Shop By Category',
  blockHtml: _.template([
    '<div class="row">',
      '<h2 class="sst__title">Shop By Category</h2>',
      '<div class="col-md-6">',
        SpreeCmsForm.getInputTemplate('heading', 'Heading'),
      '</div>',
      '<input class="js-state" type="hidden" name="state" value="<%- state || "" %>">',
      '<input class="js-title" type="hidden" name="title" value="<%= data.title %>">',
    '</div>'
  ].join("\n")),

  loadData: function(data) {
    var renderedHtml = this.blockHtml({
      data: data,
      state: 'edited'
    });

    this.$editor.html(renderedHtml).show();
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
      dataObj[element.getAttribute('name')] = element.value;
    });
    this.setData(dataObj);
  }
});
