$(document).ready(function() {
  $('.js-cmsBlockWithPositions').on('change', function(ev) {
    var select = ev.currentTarget;
    var tableSelector = select.getAttribute('data-block-group-table-selector');
    var table = document.querySelector(`${tableSelector}`);
    var $tbody = $(table).find('tbody');

    Array.prototype.forEach.call(select.options, (option) => {
      tr = table.querySelector(`tr[data-block-id='${option.value}']`);
      if (!option.selected && tr) {
        tr.parentNode.removeChild(tr);
      } else if (option.selected && !tr) {
        tr = `<tr data-block-id="${option.value}">
                <td>${option.innerHTML}</td>
                <td><input type="text"
                           name="cms_block_positions[${option.value}]"
                           value="0" /></td>`;
        $tbody.append($(tr));
      }
    });
  })
});
