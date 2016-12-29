SirTrevor.Blocks.Slideshow = SirTrevor.Block.extend({
  type: 'slideshow',
  title: 'Slideshow',
  // icon_name: 'image',
  blockHtml: _.template([
    '<h2 class="st-block__editor--title"><%= data.global.slideshow_type %> Slideshow</h2>',
    '<div class="js-grid sortable st-block__editor-grid">',
    '<% _.each(data.slides, function( slide, index ){ %>',
    '<%= itemTemplate({ slide: slide }) %>',
    '<% }); %>',
    '<div class="st-block__editor-grid-add"></div>',
    '<input type="hidden" name="slideshow_state" value="<%- slideshow_state || "" %>">',
    '<input class="st-block__input-slideshow" type="hidden" name="slideshow_type" value="<%= data.global.slideshow_type %>">',
    '</div>'
  ].join("\n")),
  itemHtml: _.template([
    '<div class="st-block__editor-grid-item" draggable="true">',
    '<% if( slide.img_filename ) { %>',
    '<img src="<%= SirTrevor.assetHost %>/spree/cmsimage/<%= slide.img %>/mini/<%= slide.img_filename %>" />',
    '<% } %>',
    '<div class="st-block__upload-container">',
    '<input title="Upload Image" type="file">',
    '<button title="Upload Image" class="st-upload-btn btn btn-success">Upload An Image</button>',
    '</div>',
    '<a title="Devare Slide" href="#" class="st-devare-btn">Devare Slide</a>',
    '<button title="Edit Content" class="st-edit-btn<%= slide.img ? " display" : "" %>" class="btn btn-success">Edit Content</button>',
    '<div class="st-block__editor-input-fields">',
    '<input type="hidden" name="title" value="<%- slide.title || "" %>">',
    '<input type="hidden" name="description" value="<%- slide.description || "" %>">',
    '<input type="hidden" name="caption" value="<%- slide.caption || "" %>">',
    '<input type="hidden" name="img_link" value="<%- slide.img_link || "" %>">',
    '<input type="hidden" name="align" value="<%- slide.align || "" %>">',
    '</div>',
    '<input class="st-block__input-img" type="hidden" name="img" value="<%= slide.img || "" %>">',
    '<input class="st-block__input-img-filename" type="hidden" name="img_filename" value="<%= slide.img_filename || "" %>">',
    '</div>'
  ].join("\n")),
  modalHtml: _.template([
    '<div class="st-block__ui-modal">',
    '<div class="st-block__ui-modal-inner">',
    '<input type="text" class="st-block__ui-modal-input" placeholder="Title">',
    '<input type="text" class="st-block__ui-modal-input" placeholder="Description">',
    '<input type="text" class="st-block__ui-modal-input" placeholder="CTA">',
    '<input type="text" class="st-block__ui-modal-input" placeholder="link">',
    '<select class="st-block__ui-modal-input" name="align"><option value=""></option><option value="left">Left</option><option value="center">Center</option></select>',
    '<button class="submit-edits btn btn-success">Save</button>',
    '<a href="#" class="st-block__ui-modal-close">X</a>',
    '</div>',
    '</div>'
  ].join("\n")),
  uploadable: true,
  upload_options: {
    html: [
      '<div class="st-block_editor--row st-block_inputs--row"><input type="text" placeholder="Number of Slides" class="st-block__slidecount-input"><span class="st-block_inputs--error">Please Enter a Number into the field Above</span>',
      '<table class="slideshow__options__table"><tr>',
      '<td><label> Slideshow Type</label></td>',
      '<td><select class="slideshow_type select2" name="slideshow_type">',
      '<option value="desktop">Desktop</option>',
      '<option value="mobile">Mobile</option>',
      '</select></td>',
      '<td class="slideshow-begin"><button class="slideshow-begin-js btn btn-success">Build Slideshow</button></td>',
      '</tr>',
      '</table>'
    ].join("\n"),
  },
  multiItemBlockOptions: {
    onLoadedData: function onItemLoaded() {},
    onItemAdded: function onItemAdded() {}
  },
  loadData: function(data) {

    this.$editor
      .html(this.blockHtml({
        data: data,
        slideshow_state: 'edited',
        itemTemplate: this.itemHtml
      })).show();

    this.$editor.find('.sortable').sortable({
      placeholder: 'sortable-placeholder',
      forcePlaceholderSize: true
    });

    this.eventsProcess(this.$editor);

    // Add the modal to this block
    this.$inner.append(this.modalHtml({}));

    // Attach the modal events
    this.modalClose();

    // Attach the edit content btn
    this.editContent(this.$editor);

    // Attach the devare slide btn
    this.devareSlide(this.$editor);

    // Attach the add slide btn
    this.addSlide();

    // setup the callback events for the block
    this.multiItemBlockOptions.onLoadedData.call(this, data);
  },
  eventsProcess: function($el) {
    var _this = this;

    // setup the event on the upload of images
    $el.find('.st-block__upload-container input').on('change', function(e) {
      // Upload the image
      _this.onUpload(e.currentTarget, this);

      // set up event on the edit btn
      $(this).parent().parent().find('.st-edit-btn').addClass('display');
    });
  },
  editContent: function($el) {
    var _this = this;

    // set up event on the edit btn
    $el.find('.st-edit-btn').on('click', function(e) {
      // stop the submit
      e.preventDefault();

      // bring up the edit options with the correct values
      _this.editOptions(_this, this);

      // attach the event for saving the data
      _this.modalSave(this);
    });
  },
  devareSlide: function($el) {
    var _this = this;

    // set up event on the edit btn
    $el.find('.st-devare-btn').on('click', function(e) {
      // stop the submit
      e.preventDefault();

      // Remove the item
      $(this).parents('.st-block__editor-grid-item').remove();

      // Reset the sortable grid
      _this.$editor.find('.sortable').sortable('reload');
    });
  },
  addSlide: function() {
    var _this = this;

    // set up event on the edit btn
    this.$editor.find('.st-block__editor-grid-add').on('click', function(e) {
      // stop the submit
      e.preventDefault();

      // Add the item
      var $item = $(_this.itemHtml({ slide: {} }));

      // reset the Upload
      _this.eventsProcess($item);

      // reset the edit content btns
      _this.editContent($item);

      // Reset the devare event
      _this.devareSlide($item);

      $(this).parent().prepend($item);

      // Reset the sortable grid
      _this.$editor.find('.sortable').sortable('refresh');

      _this.multiItemBlockOptions.onItemAdded.call(_this, $item);
    });
  },
  modalClose: function() {
    var _this = this;

    this.$inner.find('.st-block__ui-modal-close').on('click', function(e) {
      e.preventDefault();

      _this.$inner.find('.st-block__ui-modal').removeClass('open');
    });
  },
  modalSave: function(btn) {
    var _this = this;

    this.$inner.find('.submit-edits').off().on('click', function(e) {
      e.preventDefault();

      var modalInput = _this.$inner.find('.st-block__ui-modal').find('input, select');
      var itemInputs = $(btn).parent().find('.st-block__editor-input-fields').find('input, select');

      for (var i = 0; i < itemInputs.length; i++) {
        $(itemInputs[i]).val($(modalInput[i]).val());
      }
      // Close the modal
      _this.$inner.find('.st-block__ui-modal').removeClass('open');
    });
  },
  onUpload: function(transferData, context) {
    // Get the file name and set up the urlAPI based on browser API availablity
    var file = transferData.files[0];
    var urlAPI = null;
    if (typeof URL !== 'undefined') {
      urlAPI = URL;
    } else if (typeof window.webkitURL !== 'undefined') {
      urlAPI = window.webkitURL;
    }

    // Handle one upload at a time
    if (/image/.test(file.type)) {
      Utils.disableUpdate(true);
      $(context)
        .parent()
        .parent()
        .prepend($('<img>', { src: urlAPI.createObjectURL(file) }))
        .find('.st-block__input-img')
        .val(urlAPI.createObjectURL(file));

      // Upload the image
      this.uploader(
        file,
        function(data) {
          $(context).parent().parent().find('.st-block__input-img').val(data.file.id)
            .next('input').val(Utils.filenameWithExtensionFromUrl(data.file.filename));
          Utils.disableUpdate(false);
          this.ready();
        },
        function() {
          this.addMessage(i18n.t('blocks:image:upload_error'));
          Utils.disableUpdate(false);
          this.ready();
        }
      );
    }
  },
  editOptions: function(context, btn) {
    var inputArray  = $(btn).parent().find('.st-block__editor-input-fields').find('input, select');
    var modal       = context.$inner.find('.st-block__ui-modal');
    var modalInputs = $(modal).find('input, select');

    // update the inouts from the stored hidden fields
    for (var i = 0; i < inputArray.length; i++) {
      $(modalInputs[i]).val($(inputArray[i]).val());
    }
    // Open the modal
    context.$inner.find('.st-block__ui-modal').addClass('open');
  },
  onBlockRender: function() {
    var _thisInput = this.$inputs;
    var _thisEditor = this.$editor;
    var _this      = this;
    var slideshow_state = _thisEditor.find("input[name='slideshow_state']").val()
    _thisInput.find('.slideshow-begin-js').on('click', function(e) {
      e.preventDefault();

      // Get the data from the initial input screen
      var numberInput   = _thisInput.find('.st-block__slidecount-input');
      var slideshowType = _thisInput.find('.slideshow_type option:selected').val();

      // Check if the input is a valid number
      if ( Utils.validNumber(numberInput.val())) {
        // Set up the data Object
        var dataObj = {
            global: {
              slideshow_type: slideshowType
            },
            slides: {}
        };
        // Create the slides objects based on the count
        for (var i = 0; i < parseInt(numberInput.val(), 10); i++) {
          dataObj.slides[i] = {};
        }
        _this.loadData(dataObj);

        // Hide the intial screen
        _thisInput.hide();
      } else {
        _thisInput.find('.st-block_inputs--error').addClass('error');
      }
    });
  },
  _serializeData: function() {
    var dataObj = {};
    // Set the slideshow globals
    dataObj.global = {
      slideshow_type: this.$editor.find('.st-block__input-slideshow').val() || '',
      slideshow_title: this.$editor.find('.st-block__input-slideshow-title').val() || ''
    };

    // Set up the slides to be saved
    dataObj.slides = {};

    var slides = this.$editor.find('.st-block__editor-grid .st-block__editor-grid-item');

    slides.each(function(i, slide) {
      dataObj.slides[i] = {};

      $(slide).find('input').each(function(j, input) {
        if (input.getAttribute('name')) {
          dataObj.slides[i][input.getAttribute('name')] = input.value;

        }
      });
    });
    this.setData(dataObj);
  }
});
