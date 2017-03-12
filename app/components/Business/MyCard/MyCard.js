/**
 * @desc MyCard组件
 * @author 张兴
 * @since V1.0.0 2017-2-28
*/
define([
  'require',
  'backbone',
  'underscore',
  'text!MyCard.html',
  'text!MyCard.css'], function (require, Backbone, _, mycardTpl, mycardCss) {
    var MyCard = Backbone.View.extend({
      initialize: function (options) {
        var $ = Backbone.$;
        var styleId = 'mycard_css';

        if (!$('#' + styleId).length) {
          Backbone
          .$('<style type="text/css" id="'+ styleId +'"></style>')
          .html(mycardCss)
          .prependTo(document.head);  
        }      

        this.model = options.model;
      },

      render: function () {
        return this.$el.html(_.template(mycardTpl)());
      }
    });

    return MyCard;
});