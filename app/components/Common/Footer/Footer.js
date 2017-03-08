/**
 * @desc 头部组件
 * @author 吴彦祖
 * @since V1.0.0 2017-2-27
 */

define([
 'jquery',
 'backbone',
 'underscore', 
 'text!Footer.html',
 'text!Footer.css'], function($, Backbone, _, footerTpl, footerCss){
    var Footer = Backbone.View.extend({
      initialize: function () {
        var $ = Backbone.$;
        var styleId = 'footer_css';
        
        if (!$('#' + styleId).length) {
          Backbone
          .$('<style type="text/css" id="'+ styleId +'"></style>')
          .html(footerCss)
          .prependTo(document.head);  
        }
      },

      render: function () {
        return this.$el.html(_.template(footerTpl)({ badge: 4 }));
      }
    });

    return Footer;
});