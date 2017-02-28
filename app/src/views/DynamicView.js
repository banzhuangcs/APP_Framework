/**
 * @desc 动态View
 * @author 吴彦祖
 * @since V1.0.0 2017-2-28
*/

define(['backbone', 'Header', 'Footer', 'Card'], function (Backbone, Header, Footer, Card) {
  var DynamicView = Backbone.View.extend({
    initialize: function () {
      this.$el.append(Header.render('动态'));
      this.$el.append(Card.render());
      this.$el.append(Footer.render());
    },

    render: function () {
      Backbone.$(document.body).append(this.$el);
    }
  });

  var DynamicView = new DynamicView({
    id: 'dynamic',
    className: 'dynamic'
  });
  DynamicView.funcName = 'dynamic';

  return DynamicView;
});
