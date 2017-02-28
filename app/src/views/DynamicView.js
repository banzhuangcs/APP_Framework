/**
 * @desc 动态View
 * @author 吴彦祖
 * @since V1.0.0 2017-2-28
*/

define(['backbone', 'Header', 'Footer', 'Card'], function (Backbone, Header, Footer, Card) {
  var DynamicView = Backbone.View.extend({
    initialize: function (options) {
      this.funcName = options.className;
      this.header = new Header({
        className: 'header bg-green'
      });
      this.footer = new Footer({
        className: 'foot-toolbar' 
      });

      this.$el.append(this.header.render('动态'));
      this.$el.append(this.footer.render());
    },

    render: function () {
      Backbone.$(document.body).append(this.$el);
    }
  });

  return new DynamicView({
    id: 'dynamic',
    className: 'dynamic'
  });
});
