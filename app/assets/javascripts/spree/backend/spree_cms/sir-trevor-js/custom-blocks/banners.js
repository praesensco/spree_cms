SirTrevor.Blocks.Banners = SirTrevor.Block.extend({
  type: 'banners',
  title: 'Banners',
  blockHtml: _.template([
    '<h2 class="st-block__editor--title">Banners</h2>',
    '<h3>Circle elements</h3>',
    '<div class="sst__grid" data-grid-type="circles">',
    '<% if (data.circles) { %>',
      '<% _.each(data.circles, function( element, index ){ %>',
        '<%= itemCircleTemplate({ data: { element: element, index: index, images: data.images } }) %>',
      '<% }); %>',
    '<% } %>',
    '<div class="st-block__editor-grid-add sst--circle"></div>',
    '</div>',

    '<h3>Box elements</h3>',
    '<div class="sst__grid" data-grid-type="boxes">',
    '<% if (data.circles) { %>',
      '<% _.each(data.boxes, function( element, index ){ %>',
        '<%= itemBoxTemplate({ data: { element: element, index: index, images: data.images } }) %>',
      '<% }); %>',
    '<% } %>',
    '<div class="st-block__editor-grid-add sst--box"></div>',
    '</div>',

    '<input class="js-state" type="hidden" name="state" value="<%- state || "" %>">',
    '</div>'
  ].join("\n")),
  itemCircleHtml: _.template([
    '<div class="sst__grid__element sst__grid__element--circle" draggable="true" data-index="<%- data.index || 0 %>">',
    SpreeCmsUploader.getHtmlTemplate('image_circle', '', 'circles'),
    '<input class="st-block__ui-modal-input js-sst-value" type="text" placeholder="CTA" name="cta" value="<%- data.element ? (data.element.cta || "") : "" %>" />',
    '<input class="st-block__ui-modal-input js-sst-value" type="text" placeholder="URL" name="url" value="<%- data.element ? (data.element.url || "") : "" %>" />',
    '<a title="Remove Slide" href="#" class="st-devare-btn">Remove Slide</a>',

    '</div>'
  ].join("\n")),
  itemBoxHtml: _.template([
    '<div class="sst__grid__element sst__grid__element--box" draggable="true" data-index="<%- data.index || 0 %>">',
    SpreeCmsUploader.getHtmlTemplate('image_box', '', 'boxes'),
    '<input class="st-block__ui-modal-input js-sst-value" type="text" placeholder="CTA" name="cta" value="<%- data.element ? (data.element.cta || "") : "" %>" />',
    '<input class="st-block__ui-modal-input js-sst-value" type="text" placeholder="URL" name="url" value="<%- data.element ? (data.element.url || "") : "" %>" />',
    '<input class="st-block__ui-modal-input js-sst-value" type="text" placeholder="Description" name="description" value="<%- data.element ? (data.element.description || "") : "" %>" />',
    '<a title="Remove Slide" href="#" class="st-devare-btn">Remove Slide</a>',
    '</div>'
  ].join("\n")),
  multiItemBlockOptions: {
    onLoadedData: function onItemLoaded() {},
    onItemAdded: function onItemAdded() {}
  },

  uploadable: true,
  loadData: function(data) {
    var renderedHtml = this.blockHtml({
      data: data,
      state: 'edited',
      itemCircleTemplate: this.itemCircleHtml,
      itemBoxTemplate: this.itemBoxHtml,
    });

    this.$editor.html(renderedHtml);
    this.addCircleSlide();
    this.addBoxSlide();
    this.$editor.show();
    this.bindDevareSlide(this.$editor);
    this.multiItemBlockOptions.onLoadedData.call(this, data);
    SpreeCmsUploader.bindUploaders(this);
  },

  addCircleSlide: function() {
    var _this = this;
    var $editor = this.$editor;

    $editor.find('.st-block__editor-grid-add.sst--circle').on('click', function(e) {
      var activeIndex = Utils.nextActiveIndex($editor.find('.sst__grid__element.sst__grid__element--circle'));
      var addButton = e.currentTarget;
      var $item;
      e.preventDefault();

      $item = $(_this.itemCircleHtml({ data: {}, element: { index: activeIndex } }));
      _this.bindDevareSlide($item);

      $(addButton).parent().prepend($item);
      SpreeCmsUploader.bindUploaders(_this);
      $editor.find('.sortable').sortable('refresh');
      _this.multiItemBlockOptions.onItemAdded.call(_this, $item);
    });
  },

  addBoxSlide: function() {
    var _this = this;

    var $editor = this.$editor;

    $editor.find('.st-block__editor-grid-add.sst--box').on('click', function(e) {
      var activeIndex = Utils.nextActiveIndex($editor.find('.sst__grid__element.sst__grid__element--box'));
      var addButton = e.currentTarget;
      var $item;
      e.preventDefault();

      $item = $(_this.itemBoxHtml({ data: {}, element: { index: activeIndex } }));
      _this.bindDevareSlide($item);

      $(addButton).parent().prepend($item);
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

    this.$editor.find('.js-sst-value').each(function(_i, element) {
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
        dataObj[element.getAttribute('name')] = element.value;
      }
    });

    dataObj.images = SpreeCmsUploader.gatherImages(this);

    console.log('_serializeData', dataObj);
    this.setData(dataObj);
  }
});
