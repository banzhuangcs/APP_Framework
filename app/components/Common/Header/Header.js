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
        'click .header-nav-icon': 'handleClick',
        'click .header-more-icon': 'handleToggle'
      },

      initialize: function () {
        var $ = Backbone.$;
        var styleId = 'header_css';

        if (!$('#' + styleId).length) {
          Backbone
          .$('<style type="text/css" id="'+ styleId +'"></style>')
          .html(headerCss)
          .prependTo(document.head);  
        }        
      },

      handleClick: function () {
        alert('click');
      },

      handleToggle: function () {
        alert('toggle');
      },

      render: function (text) {
        return this.$el.html(_.template(headerTpl)({ title: text }));
      }
    });

    return Header;
});
