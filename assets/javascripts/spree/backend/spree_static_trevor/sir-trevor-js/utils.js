Utils = {
  validNumber: function(number) {
    return number !== '' && !isNaN(parseInt(number, 10)) ? true : false;
  },
  filenameFromUrl: function(url) {
    return url.substr(url.lastIndexOf('/') + 1).split('.')[0];
  },
  filenameWithExtensionFromUrl: function(url) {
    return url.substr(url.lastIndexOf('/') + 1);
  },
  disableUpdate: function(boolean) {
    var updateBtn = $('button[type="submit"].fa-refresh');
    updateBtn.prop('disabled', boolean);
  },

  nextActiveIndex: function($elements) {
    var elementIndex;
    var activeIndex = 0;
    $elements.each(function (_i, element) {
      elementIndex = parseInt(element.getAttribute('data-index'), 10);
      if (activeIndex < elementIndex) {
        activeIndex = elementIndex;
      }
    });
    return activeIndex + 1;
  }
};
