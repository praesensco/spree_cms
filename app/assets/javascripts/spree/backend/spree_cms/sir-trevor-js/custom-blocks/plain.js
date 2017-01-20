SirTrevor.Blocks.Textarea = SirTrevor.Block.extend({
  type: 'textarea',
  title: 'Plain Text/HTML',
  icon_name: 'text',
  blockHtml: _.template([
    '<h2 class="st-block__editor--title">Plain text/HTML</h2>',
    '<div class="js-grid">',
    '<textarea class="st-block__ui-modal-input" placeholder="Content" name="content" style="margin: 10px; width: 100%; height: 200px;"><%- data.global.content || "" %></textarea>',
    '<input type="hidden" name="state" value="<%- state || "" %>">',
    '<div class="js-grid sortable st-block__editor-grid">',
    '</div>'
  ].join("\n")),

  loadData: function(data) {
    this.$editor
      .html(this.blockHtml({
        data: data,
        state: 'edited'
      })).show();

    this.$editor.find('.sortable').sortable({
      placeholder: 'sortable-placeholder',
      forcePlaceholderSize: true
    });
  },

  onBlockRender: function() {
    var _thisInput = this.$inputs;
    var _thisEditor = this.$editor;
    var _this      = this;
    var state = _thisEditor.find("input[name='state']").val();

    console.log('onBlockRender');

    if (typeof state === 'undefined' || state != 'edited') {
      dataObj = {
          global: {
          }
      }
      _this.loadData(dataObj);
      // Hide the intial screen
      _thisInput.hide();
    } else {
      _thisInput.find('.st-block_inputs--error').addClass('error');
    }
  },
  _serializeData: function() {
    var dataObj = {};
    // Set the tiles globals
    dataObj.global = {
      content: this.$editor.find("textarea[name='content']").val() || ''
    };

    this.setData(dataObj);
  }
});
