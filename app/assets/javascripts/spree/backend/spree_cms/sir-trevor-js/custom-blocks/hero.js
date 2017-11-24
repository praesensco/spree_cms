SirTrevor.Blocks.Hero = SirTrevor.Block.extend({
  type: 'hero',
  title: 'Hero',
  blockHtml: _.template([
    '<div class="row">',
      '<div class="col-md-12"><h2>Hero</h2></div>',
      '<div class="col-md-6">',
        SpreeCmsUploader.getHtmlTemplate('background', "Background image"),
      '</div><div class="col-md-6">',
        '<div class="sst__subtitle">Parameters</div>',
        SpreeCmsForm.getInputTemplate('heading', 'Heading'),
        SpreeCmsForm.getTextareaTemplate('paragraph', 'Paragraph'),
        SpreeCmsForm.getInputTemplate('cta', 'CTA'),
        SpreeCmsForm.getInputTemplate('url', 'URL'),
      '</div>',
      '<input class="js-state" type="hidden" name="state" value="<%- state || "" %>">',
      '<input class="js-title" type="hidden" name="title" value="<%= data.title %>">',
    '</div>',
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
