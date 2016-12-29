SirTrevor.Blocks.Hero = SirTrevor.Block.extend({
  type: 'hero',
  title: 'Hero',
  blockHtml: _.template([
    '<h2 class="st-block__editor--title">Hero</h2>',
    SpreeCmsUploader.getHtmlTemplate('background', "Background image"),
    '<input class="st-block__ui-modal-input js-sst-value" type="text" placeholder="Heading" name="heading" value="<%- data.heading || "" %>" />',
    '<input class="st-block__ui-modal-input js-sst-value" type="text" placeholder="CTA" name="cta" value="<%- data.cta || "" %>" />',
    '<input class="st-block__ui-modal-input js-sst-value" type="text" placeholder="URL" name="url" value="<%- data.url || "" %>" />',
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

  _serializeData: function() {
    var dataObj = {};
    this.$editor.find('.js-sst-value').each(function(_i, element) {
      dataObj[element.getAttribute('name')] = element.value;
    });
    dataObj.images = SpreeCmsUploader.gatherImages(this);
    this.setData(dataObj);
  }
});
