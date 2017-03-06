/**
 * @desc Card组件
 * @author 吴彦祖
 * @since V1.0.0 2017-2-28
*/
define([
 'backbone',
 'underscore',
 'text!Card.html',
 'text!Card.css'], function (Backbone, _, CardTpl, CardCss) {
    var Card = Backbone.View.extend({

      initialize: function () {
        Backbone
          .$('<style type="text/css"></style>')
          .html(CardCss)
          .prependTo(document.head);
      },

      render: function () {
        return this.$el.html(_.template(CardTpl));
      }
    });

    
    return new Card({
      className: 'card-content'
    });
});
