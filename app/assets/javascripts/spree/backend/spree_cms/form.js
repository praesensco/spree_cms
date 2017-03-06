var SpreeCms = SpreeCms || {};

SpreeCms.form = function() {
  var getInputTemplate = function(code, label) {
    label = label || '';
    return ['<div class="form-group">',
            '<label>' + label + '</label>',
            '<input class="form-control js-scms-value" type="text" name="' + code + '" value="<%- data.' + code + ' || "" %>"> ',
            '</div>'].join('');
  }

  var getCheckboxTemplate = function(code, label, value) {
    label = label || '';
    value = value || 1;
    var inputHtml = '<input class="js-scms-value" type="checkbox" name="' + code + '"  value="' + value + '" <% if (data.' + code + ') { %>checked="checked"<% } %>> ';
    return ['<div class="form-group"><div class="checkbox">',
            '<label>',
            inputHtml,
            label,
            '</label>',
            '</div></div>'].join('');
  }

  var getElementInputTemplate = function(code, label) {
    label = label || '';
    return ['<div class="form-group">',
            '<label>' + label + '</label>',
            '<input class="form-control js-scms-value" type="text" name="' + code + '" value="<%- data.element ? (data.element.' + code + ' || "") : "" %>"> ',
            '</div>'].join('');
  }

  var readValue = function(inputElement) {
    if (!inputElement) {
      return '';
    }

    if (inputElement.getAttribute('type') == 'checkbox') {
      if (inputElement.checked) {
        return inputElement.value;
      }
    } else {
      return inputElement.value;
    }

    return '';
  }

  return {
    getElementInputTemplate: getElementInputTemplate,
    getCheckboxTemplate: getCheckboxTemplate,
    getInputTemplate: getInputTemplate,
    readValue: readValue
  }
}

var SpreeCmsForm = SpreeCms.form();
