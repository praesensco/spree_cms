var SpreeCms = SpreeCms || {};

SpreeCms.uploader = function() {
  var imageTypes = ['image', 'desktop', 'mobile', 'icon'];

  var jsClass = 'js-uploader';
  var jsSelector = '.js-uploader';

  var getHtmlTemplate = function(name, title, gridType, useImagesRestrictedTo) {
    var html;
    var useImages;
    title = title || '';
    gridType = gridType || false;
    useImagesRestrictedTo = useImagesRestrictedTo || false;

    if (useImagesRestrictedTo === false) {
      useImages = ['desktop', 'mobile'];
    } else {
      useImages = useImagesRestrictedTo;
    }

    html = '<div class="sst__uploader ' + jsClass + '" data-name="' + name + '">';
    if (title.length) {
      html += '<div class="sst__subtitle">' + title + '</div>';
    }

    html += '<table class="sst__uploader__images">';
    jQuery(imageTypes).each(function(_i, imageType) {
      if (useImages.indexOf(imageType) > -1) {
        html += '<tr>';
        html += '<input type="hidden" class="js-uploader-hidden-image-id" data-type="' + imageType + '" ';
        if (gridType == false) {
            html += ' value="<% if (data && data.images && data.images && data.images.' + name + ' && data.images.' + name + '.' + imageType + ') { %><%= data.images.' + name + '.' + imageType + '.id %><% } %>" />';
        } else {
            html += ' value="<% if (data && data.images && data.images.' + gridType + ' && data.images.' + gridType + '[data.index] && data.images.' + gridType + '[data.index].' + imageType + ') { %><%= data.images.' + gridType + '[data.index].' + imageType + '.id %><% } %>" />';
        }

        html += '<input type="hidden" class="js-uploader-hidden-image-url" data-type="' + imageType + '" ';
        if (gridType == false) {
            html += ' value="<% if (data && data.images && data.images.' + name + ' && data.images.' + name + '.' + imageType + ') { %><%= decodeURIComponent(data.images.' + name + '.' + imageType + '.url) %><% } %>" />';
        } else {
            html += ' value="<% if (data && data.images && data.images.' + gridType + ' && data.images.' + gridType + '[data.index] && data.images.' + gridType + '[data.index].' + imageType + ') { %><%= decodeURIComponent(data.images.' + gridType + '[data.index].' + imageType + '.url) %><% } %>" />';
        }

        html += '<td class="sst__uploader__images__image-type" valign="top">';
        html += imageType;
        html += '<br><br><input type="file" accept="image/*" />';
        html += '</td>';
        html += '<td class="sst__uploader__images__image" valign="top">';
        if (gridType == false) {
            html += '<img style="width: 100%;" src="<% if (data && data.images && data.images.' + name + ' && data.images.' + name + '.' + imageType + ') { %><%= decodeURIComponent(data.images.' + name + '.' + imageType + '.url) %><% } %>" class="" />';
        } else {
            html += '<img style="width: 100%;" src="<% if (data && data.images && data.images.' + gridType + ' && data.images.' + gridType + '[data.index] && data.images.' + gridType + '[data.index].' + imageType + ') { %><%= decodeURIComponent(data.images.' + gridType + '[data.index].' + imageType + '.url) %><% } %>" />';
        }
        html += '</td>';
        html += '</tr>';
      }
    });
    html += '</table>';
    html += '</div>';

    return html;
  }

  var preUpload = function($fileInput) {
    var file = $fileInput[0].files[0];

    if (/image/.test(file.type)) {
      var urlAPI = null;
      if (typeof URL !== 'undefined') {
        urlAPI = URL;
      } else if (typeof window.webkitURL !== 'undefined') {
        urlAPI = window.webkitURL;
      }
      $fileInput.parents('tr').find('img').attr('src', urlAPI.createObjectURL(file))
      return file;
    } else {
      return false;
    }
  }

  var onUpload = function($fileInput, data) {
    var $row = $fileInput.parents('tr');
    $row.find('.js-uploader-hidden-image-id').val(data.file.id);
    $row.find('.js-uploader-hidden-image-url').val(data.file.url);
  }

  var doUpload = function(sirTrevorBlock, $fileInput) {
    var file = preUpload($fileInput);
    if (file !== false) {
      Utils.disableUpdate(true);

      sirTrevorBlock.uploader(
        file,
        function(data) {
          onUpload($fileInput, data);
          Utils.disableUpdate(false);
          sirTrevorBlock.ready();
        },
        function() {
          sirTrevorBlock.addMessage(i18n.t('blocks:image:upload_error'));
          Utils.disableUpdate(false);
          sirTrevorBlock.ready();
        }
      );
    }
  }

  var bindUploaders = function(sirTrevorBlock) {
    sirTrevorBlock.$editor.find(jsSelector).find('input[type="file"]').on('change', function(e) {
      doUpload(sirTrevorBlock, jQuery(e.currentTarget));
    });
  }

  var gatherImages = function(sirTrevorBlock) {
    var images = {};

    sirTrevorBlock.$editor.find(jsSelector).each(function(uploaderIndex, uploader) {
      var uploaderImages = {};
      var $uploader = jQuery(uploader);
      var $gridElementParent = $uploader.parents('.sst__grid__element[data-index]');
      var $grid;

      $uploader.find('.js-uploader-hidden-image-id').each(function(_i, hiddenImageIdElement) {
        var $hiddenElement = jQuery(hiddenImageIdElement);
        if (typeof uploaderImages[$hiddenElement.data('type')] === 'undefined') {
          uploaderImages[$hiddenElement.data('type')] = {};
        }
        uploaderImages[$hiddenElement.data('type')].id = $hiddenElement.val();
      });

      $uploader.find('.js-uploader-hidden-image-url').each(function(_i, hiddenImageIdElement) {
        var $hiddenElement = jQuery(hiddenImageIdElement);
        if (typeof uploaderImages[$hiddenElement.data('type')] === 'undefined') {
          uploaderImages[$hiddenElement.data('type')] = {};
        }
        uploaderImages[$hiddenElement.data('type')].url = encodeURIComponent($hiddenElement.val());
      });

      if ($gridElementParent.length) {
        $grid = $gridElementParent.parents('.sst__grid');

        if (typeof images === 'undefined') {
          images = {};
        }

        if (typeof images[$grid.data('grid-type')] === 'undefined') {
          images[$grid.data('grid-type')] = {};
          images[$grid.data('grid-type')][$gridElementParent.data('index')] = {};
        } else if (typeof images[$grid.data('grid-type')][$gridElementParent.data('index')] === 'undefined') {
          images[$grid.data('grid-type')][$gridElementParent.data('index')] = {};
        }
        images[$grid.data('grid-type')][$gridElementParent.data('index')] = uploaderImages;

      } else {
        images[$uploader.data('name')] = uploaderImages;
      }
    });

    return images;
  }

  return {
    bindUploaders: bindUploaders,
    gatherImages: gatherImages,
    getHtmlTemplate: getHtmlTemplate
  }
}


var SpreeCmsUploader = SpreeCms.uploader();
