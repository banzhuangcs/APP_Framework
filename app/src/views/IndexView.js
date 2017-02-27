/**
 * @desc 首页View
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['backbone', 'Header', 'Footer', 'Card'], function (Backbone, Header, Footer, Card) {
  var IndexView = Backbone.View.extend({
    initialize: function () {
      this.$el.append(Header.render('首页'));
      this.$el.append(Card.render());
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
