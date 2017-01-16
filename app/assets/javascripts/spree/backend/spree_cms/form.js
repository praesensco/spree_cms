var SpreeCms = SpreeCms || {};

SpreeCms.form = function() {
  var getInputTemplate = function(code, label = '') {
    return ['<div class="form-group">',
            '<label>' + label + '</label>',
            '<input class="form-control js-scms-value" type="text" name="' + code + '" value="<%- data.' + code + ' || "" %>"> ',
            '</div>'].join('');
  }

  var getElementInputTemplate = function(code, label = '') {
    return ['<div class="form-group">',
            '<label>' + label + '</label>',
            '<input class="form-control js-scms-value" type="text" name="' + code + '" value="<%- data.element ? (data.element.' + code + ' || "") : "" %>"> ',
            '</div>'].join('');
  }

  return {
    getElementInputTemplate: getElementInputTemplate,
    getInputTemplate: getInputTemplate
  }
}

var SpreeCmsForm = SpreeCms.form();
