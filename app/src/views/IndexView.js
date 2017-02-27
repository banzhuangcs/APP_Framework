/**
 * @desc 首页View
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['backbone', 'Header', 'Footer'], function (Backbone, Header, Footer) {
  var IndexView = Backbone.View.extend({
    initialize: function () {
      this.$el.append(Header.render());
      this.$el.append(Footer.render());
    },

    render: function () {
      Backbone.$(document.body).append(this.$el);
    }
  });

  var indexView = new IndexView({
    id: 'index',
    className: 'index'
  });
  indexView.funcName = 'index';

  return indexView;
});
