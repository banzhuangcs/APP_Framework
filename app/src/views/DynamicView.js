/**
 * @desc 动态View
 * @author 张兴
 * @since V1.0.0 2017-2-28
*/

define([
'jquery',
'underscore',
'SuperView',
'backbone',
'Header',
'Footer',
'CardList'], function ($, _, SuperView, Backbone, Header, Footer, CardList) {
  var DynamicView = Backbone.View.extend({
    initialize: function (options) {

      SuperView.call(this, options);

      this.funcName = options.className;
      this.header = new Header({
        className: 'header bg-green'
      });
      this.footer = new Footer({
        className: 'foot-toolbar' 
      });
      this.cardlist = new CardList({
        className: 'card-content',
        data: [{
          className: 'sg-scroll',
          className: 'sg-list-group'
        }, {
          className: 'sg-scroll',
          className: 'sg-list-group'
        }]
      });

      this.$el.append(this.header.render('动态'));
      this.$el.append(this.footer.render());
      this.$el.append(this.cardlist.render());
    },

    render: function () {
      Backbone.$(document.body).append(this.$el);
    }
  });

  return new DynamicView({
    id: 'dynamic',
    className: 'dynamic',
    funcName: 'dynamicView'
  });
});
