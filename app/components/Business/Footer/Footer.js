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
      initialize: function (options) {
        var $ = Backbone.$;
        var styleId = 'footer_css';
        
        if (!$('#' + styleId).length) {
          Backbone
          .$('<style type="text/css" id="'+ styleId +'"></style>')
          .html(footerCss)
          .prependTo(document.head);  
        }

        this.badge = options.badge;
        this.activeIndex = options.activeIndex;
      },

      render: function () {
        return this.$el.html(_.template(footerTpl)({
          badge: this.badge, 
          activeIndex: this.activeIndex 
        }));
      }
    });

    return Footer;
});