SirTrevor.Blocks.Hero = SirTrevor.Blocks.Abstract.extend({
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
    '</div>',
  ].join("\n"))
});
