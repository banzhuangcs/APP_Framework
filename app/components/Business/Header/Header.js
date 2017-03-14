/**
 * @desc 头部组件
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
 */
define([
 'backbone',
 'underscore',
 'text!Header.html',
 'text!Header.css'], function (Backbone, _, headerTpl, headerCss) {
    var Header = Backbone.View.extend({
      events: {
        'click .header-icon': 'handleLeftClick',
        'click .header-more-icon': 'onRightClick'
      },

      resp: function () {},

      handleLeftClick: function (event) { this.onLeftClick(event) },

      handleRightClick: function (event) { this.onRightClick(event) },

      initialize: function (options) {
        var $ = Backbone.$;
        var styleId = 'header_css';

        if (!$('#' + styleId).length) {
          Backbone
          .$('<style type="text/css" id="'+ styleId +'"></style>')
          .html(headerCss)
          .prependTo(document.head);  
        }        

        this.text = options.text;
        this.back = options.back || false;
        this.onLeftClick = options.onLeftClick || this.resp;
        this.onRightClick = options.onRightClick || this.resp;
      },

      render: function () {
        return this.$el.html(_.template(headerTpl)({ title: this.text, back: this.back }));
      }
    });

    return Header;
});
