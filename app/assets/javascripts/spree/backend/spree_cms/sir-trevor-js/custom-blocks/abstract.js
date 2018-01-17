SirTrevor.Blocks.Abstract = SirTrevor.Block.extend({
  type: 'abstract_block',
  title: 'Abstract Block',
  header: 'Abstract',

  blockHtml: _.template([
    '<div class="row">',
      '<% if (header) { %><div class="col-md-12"><h2><%- header %></h2></div><% } %>',
      '<div class="col-md-12">',
      SpreeCmsForm.getInputTemplate('heading', 'Heading'),
      SpreeCmsForm.getTextareaTemplate('content', 'Content'),
      '</div>',
      '<input class="js-state" type="hidden" name="state" value="<%- state || "" %>">',
    '</div>'
  ].join("\n")),
  uploadable: true,
  loadData: function(data) {
    var renderedHtml = this.blockHtml({
      data: data,
      state: 'edited',
      header: this.header
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
