$(document).ready(function() {
  var $sirTrevorEditor = $('.js-st-instance');
  var sirTrevorDefaults = { el: $sirTrevorEditor };
  var layout = $('#page_layout').val() || 'default';
  var assetHost =  $sirTrevorEditor.parents('form:first').data('asset-host');

  SirTrevor.setDefaults({
    uploadUrl: '/admin/upload'
  });

  SirTrevor.assetHost = assetHost;

  if ($sirTrevorEditor.length <= 0) {
    return;
  }
  if (layout === 'home-page') {
    sirTrevorDefaults = $.extend(sirTrevorDefaults, {
      blockTypes: [
        'Hero', 'Banners', 'ShopByCategory'
      ]
    });
  }

  new SirTrevor.Editor(sirTrevorDefaults);
});
