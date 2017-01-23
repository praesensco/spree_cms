SirTrevor.Blocks.Newsletter = SirTrevor.Block.extend({
  type: 'newsletter',
  title: 'Newsletter',
  blockHtml: _.template([
    '<div class="row">',
      '<h2 class="sst__title">Newsletter</h2>',
      '<input class="js-state" type="hidden" name="state" value="<%- state || "" %>">',
      SpreeCmsForm.getInputTemplate('heading', 'Heading'),
    '</div><div class="row">',
      '<div class="sst__subtitle">Elements</div>',
      '<div class="sst__grid" data-grid-type="items">',
        '<% if (data.items) { %>',
          '<% _.each(data.items, function( element, index ){ %>',
            '<%= itemTemplate({ data: { element: element, index: index, images: data.images } }) %>',
          '<% }); %>',
        '<% } %>',
        '<div class="st-block__editor-grid-add sst--item"></div>',
      '</div>',
    '</div>'
  ].join("\n")),
  itemHtml: _.template([
    '<div class="row sst__grid__element" draggable="true" data-index="<%- data.index || 0 %>">',
      '<div class="col-md-6">',
      SpreeCmsUploader.getHtmlTemplate('image_item', '', 'items', ['icon']),
      '</div><div class="col-md-6">',
        '<div class="sst__subtitle">Parameters</div>',
        SpreeCmsForm.getElementInputTemplate('cta', 'CTA'),
        SpreeCmsForm.getElementInputTemplate('url', 'URL'),
      '<a title="Remove Element" href="#" class="st-devare-btn">Remove Element</a>',
      '</div>',
    '</div>'
  ].join("\n")),
  uploadable: true,
  multiItemBlockOptions: {
    onLoadedData: function onItemLoaded() {},
    onItemAdded: function onItemAdded() {}
  },
  loadData: function(data) {
    var renderedHtml = this.blockHtml({
      data: data,
      state: 'edited',
      itemTemplate: this.itemHtml,
    });

    this.$editor.html(renderedHtml);
    this.addSlide();
    this.$editor.show();
    this.bindDevareSlide(this.$editor);
    this.multiItemBlockOptions.onLoadedData.call(this, data);
    SpreeCmsUploader.bindUploaders(this);
  },

  onBlockRender: function() {
    var state = this.$editor.find("input[name='state']").val();
    if (typeof state === 'undefined' || state != 'edited') {
      this.loadData({});
    }
  },

  addSlide: function() {
    var _this = this;
    var $editor = this.$editor;

    $editor.find('.st-block__editor-grid-add').on('click', function(e) {
      var activeIndex = Utils.nextActiveIndex($editor.find('.sst__grid__element'));
      var addButton = e.currentTarget;
      var $item;
      e.preventDefault();

      $item = $(_this.itemHtml({ data: { index: activeIndex }, element: { index: activeIndex } }));
      _this.bindDevareSlide($item);

      $(addButton).before($item);
      SpreeCmsUploader.bindUploaders(_this);
      $editor.find('.sortable').sortable('refresh');
      _this.multiItemBlockOptions.onItemAdded.call(_this, $item);
    });
  },

  bindDevareSlide: function($el) {
    $el.find('.st-devare-btn').on('click', function(event) {
      event.preventDefault();
      var $button = $(event.currentTarget);
      $button.parents()
      $(this).parents('.sst__grid__element').remove();
    });
  },

  _serializeData: function() {
    var dataObj = {};
    var $element;
    var $grid;
    var $gridElementParent;

    this.$editor.find('.js-scms-value').each(function(_i, element) {
      $element = jQuery(element);
      $gridElementParent = $element.parents('.sst__grid__element[data-index]');
      if ($gridElementParent.length) {
        $grid = $gridElementParent.parents('.sst__grid');

        if (typeof dataObj[$grid.data('grid-type')] === 'undefined') {
          dataObj[$grid.data('grid-type')] = {};
          dataObj[$grid.data('grid-type')][$gridElementParent.data('index')] = {};
        } else if (typeof dataObj[$grid.data('grid-type')][$gridElementParent.data('index')] === 'undefined') {
          dataObj[$grid.data('grid-type')][$gridElementParent.data('index')] = {};
        }
        dataObj[$grid.data('grid-type')][$gridElementParent.data('index')][$element.attr('name')] = $element.val();
      } else {
        dataObj[element.getAttribute('name')] = SpreeCmsForm.readValue(element);
      }
    });

    dataObj.images = SpreeCmsUploader.gatherImages(this);

    this.setData(dataObj);
  }
});
