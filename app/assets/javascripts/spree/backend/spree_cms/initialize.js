$(document).ready(function() {
  var $sirTrevorEditor = $('.js-st-instance');
  if (!$sirTrevorEditor.length) {
    return;
  }

  var sirTrevorDefaults = { el: $sirTrevorEditor };
  var layout = $('#page_layout').val() || 'default';

  SirTrevor.assetHost = $sirTrevorEditor.parents('form:first').data('asset-host');
  SirTrevor.setDefaults({
    uploadUrl: '/admin/upload'
  });

  if (layout === 'home-page') {
    sirTrevorDefaults = $.extend(sirTrevorDefaults, {
      blockTypes: [
        'BannerRow',
        'DoubleBanners',
        'Hero',
        'Newsletter',
        'ShopByCategory',
        'TaxonProducts'
      ]
    });
  } else {
    sirTrevorDefaults = $.extend(sirTrevorDefaults, {
      blockTypes: [
        'BannerRow',
        'DoubleBanners',
        'Hero',
        'Newsletter',
        'Textarea',
        'ShopByCategory',
        'TaxonProducts'
      ]
    });
  }

  new SirTrevor.Editor(sirTrevorDefaults);
});
