SirTrevor.Blocks.Banners = SirTrevor.Block.extend({
  type: 'banners',
  title: 'Banners',
  blockHtml: _.template([
    '<div class="row">',
      '<h2 class="sst__title">Banners</h2>',
      '<input class="js-state" type="hidden" name="state" value="<%- state || "" %>">',
    '</div><div class="row">',
      '<div class="sst__subtitle">Circle elements</div>',
      '<div class="sst__grid" data-grid-type="circles">',
        '<% if (data.circles) { %>',
          '<% _.each(data.circles, function( element, index ){ %>',
            '<%= itemCircleTemplate({ data: { element: element, index: index, images: data.images } }) %>',
          '<% }); %>',
        '<% } %>',
        '<div class="st-block__editor-grid-add sst--circle"></div>',
      '</div>',
    '</div><div class="row">',
      '<div class="sst__subtitle">Box elements</div>',
      '<div class="sst__grid" data-grid-type="boxes">',
        '<% if (data.boxes) { %>',
          '<% _.each(data.boxes, function( element, index ){ %>',
            '<%= itemBoxTemplate({ data: { element: element, index: index, images: data.images } }) %>',
          '<% }); %>',
        '<% } %>',
        '<div class="st-block__editor-grid-add sst--box"></div>',
        '</div>',
    '</div>'
  ].join("\n")),
  itemCircleHtml: _.template([
    '<div class="row sst__grid__element sst__grid__element--circle" draggable="true" data-index="<%- data.index || 0 %>">',
      '<div class="col-md-6">',
      SpreeCmsUploader.getHtmlTemplate('image_circle', '', 'circles'),
      '</div><div class="col-md-6">',
        '<div class="sst__subtitle">Parameters</div>',
        SpreeCmsForm.getElementInputTemplate('cta', 'CTA'),
        SpreeCmsForm.getElementInputTemplate('url', 'URL'),
      '<a title="Remove Slide" href="#" class="st-devare-btn">Remove Slide</a>',
      '</div>',
    '</div>'
  ].join("\n")),
  itemBoxHtml: _.template([
    '<div class="row sst__grid__element sst__grid__element--box" draggable="true" data-index="<%- data.index || 0 %>">',
      '<div class="col-md-6">',
      SpreeCmsUploader.getHtmlTemplate('image_box', '', 'boxes'),
      '</div><div class="col-md-6">',
        SpreeCmsForm.getElementInputTemplate('cta', 'CTA'),
        SpreeCmsForm.getElementInputTemplate('url', 'URL'),
        SpreeCmsForm.getElementInputTemplate('description', 'Description'),
      '<a title="Remove Slide" href="#" class="st-devare-btn">Remove Slide</a>',
      '</div>',
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

  onBlockRender: function() {
    var state = this.$editor.find("input[name='state']").val();
    if (typeof state === 'undefined' || state != 'edited') {
      this.loadData({});
    }
  },

  addCircleSlide: function() {
    var _this = this;
    var $editor = this.$editor;

    $editor.find('.st-block__editor-grid-add.sst--circle').on('click', function(e) {
      var activeIndex = Utils.nextActiveIndex($editor.find('.sst__grid__element.sst__grid__element--circle'));
      var addButton = e.currentTarget;
      var $item;
      e.preventDefault();

      $item = $(_this.itemCircleHtml({ data: { index: activeIndex }, element: { index: activeIndex } }));
      _this.bindDevareSlide($item);

      $(addButton).before($item);
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

      $item = $(_this.itemBoxHtml({ data: { index: activeIndex }, element: { index: activeIndex } }));
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
        dataObj[element.getAttribute('name')] = element.value;
      }
    });

    dataObj.images = SpreeCmsUploader.gatherImages(this);

    this.setData(dataObj);
  }
});
