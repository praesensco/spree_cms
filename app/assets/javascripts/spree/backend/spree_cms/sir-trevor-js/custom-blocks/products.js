SirTrevor.Blocks.Products = SirTrevor.Blocks.Abstract.extend({
  type: 'products',
  title: 'Products',
  blockHtml: _.template(
    `<div class="row">
      <div class="col-md-12"><h2>Products</h2></div>
      <div class="col-md-12">
        ${SpreeCmsForm.getInputTemplate('new_sku', 'New SKU')}
        <button class="js-blockProductsAddSku">Add</button>
      </div><div class="col-md-6">
        <% if (data.products && data.products.length) { %>
          <table class="table js-blockProductsTable">
            <thead>
              <tr>
                <th class="no-border"></th>
                  <th>SKU</th>
                  <th>Remove</th>
                <th class="actions"></th>
              </tr>
            </thead>
            <tbody>
              <% _.each(data.products, function(product, index) { %>
                <tr>
                  <td class="move-handle">
                    <span class="icon icon-sort handle"></span>
                  </td>
                  <td class="js-blockProductsSku"><%= product %></td>
                  <td><a class="js-blockProductsRemoveSku btn btn-danger btn-sm delete-resource icon-link with-tip action-delete no-text" href="#"><span class="icon icon-delete"></span></a>
                </tr>
              <% }); %>
            </tbody>
          </table>
        <% } %>
      </div>
      <input class="js-blockProductsInputProducts js-scms-value" type="hidden" name="products" value="<%- data.products ? data.products.join(',') : '' %>">
      <input class="js-state" type="hidden" name="state" value="<%- state || "" %>">
    </div>`
  ),

  getProductList: function() {
    var list = this.getProductListInput().val().split(',');
    return list.filter(function(item) {
      return item !== '' && item !== null;
    });
  },

  getProductListInput: function() {
    return this.$editor.find('.js-blockProductsInputProducts');
  },

  loadData: function(data) {
    data.products = data.products ? data.products.split(',') : [];
    var renderedHtml = this.blockHtml({
      data: data,
      state: 'edited',
      header: this.header
    });

    this.$editor.html(renderedHtml).show();
    this.$editor.find('.js-blockProductsAddSku').click(this.onSkuAdd.bind(this));
    this.$editor.find('.js-blockProductsRemoveSku').click(this.onSkuRemove.bind(this));
    this.tableSortable();
  },

  onSkuAdd: function(ev) {
    ev.preventDefault();
    var sku = this.getData().data.new_sku;
    if (!sku) {
      return false;
    }

    var productList = this.getProductList();
    if (productList.indexOf(sku) == -1) {
      productList.push(sku);
      this.$editor.find('[name="new_sku"]').val('');
      this.getProductListInput().val(productList.join(','));
      this.reRenderProductList();
    }
  },

  onSkuRemove: function(ev) {
    ev.preventDefault();
    var sku = ev.currentTarget.parentNode.parentNode.querySelector('.js-blockProductsSku').innerHTML;
    var productList = this.getProductList().filter(function(item) {
      return item !== sku;
    });

    this.getProductListInput().val(productList.join(','));
    this.reRenderProductList();
  },

  reRenderProductList() {
    var data = this.getData().data;
    data.products = $('.js-blockProductsInputProducts').val();
    this.loadData(data);
  },

  tableSortable() {
    // Based on spree_backend-3.3.2/app/assets/javascripts/spree/backend/admin.js:325
    var fixHelper = function(e, ui) {
      ui.children().each(function() {
          $(this).width($(this).width());
      });
      return ui;
    };

    var table = this.$editor.find('.js-blockProductsTable');
    var td_count = table.find('tbody tr:first-child td').length;
    var productListInput = this.getProductListInput();
    table.find('tbody').sortable(
      {
        handle: '.handle',
        helper: fixHelper,
        placeholder: 'ui-sortable-placeholder',
        update: function(event, ui) {
          var tbody = this;
          positions = {};
          $.each($('tr', tbody), function(position, obj){
            reg = /spree_(\w+_?)+_(\d+)/;
            parts = reg.exec($(obj).prop('id'));
            if (parts) {
              positions['positions['+parts[2]+']'] = position+1;
            }
          });
          var newProductList = $.map(table.find('.js-blockProductsSku'), function(el) {
            return el.innerHTML;
          });

          productListInput.val(newProductList.join(','));
        },
        start: function (event, ui) {
          // Set correct height for placehoder (from dragged tr)
          ui.placeholder.height(ui.item.height())
          // Fix placeholder content to make it correct width
          ui.placeholder.html("<td colspan='"+(td_count-1)+"'></td><td class='actions'></td>")
        },
        stop: function (event, ui) {
          // Fix odd/even classes after reorder
          table.find("tr:even").removeClass("odd even").addClass("even");
          table.find("tr:odd").removeClass("odd even").addClass("odd");
        }

      });
  }
});
