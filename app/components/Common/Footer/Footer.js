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
      // events:{
      //   'click .foot-tab-link': 'handleClick'
      // },

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

      // handleClick: function (ev) {
      //   var badge = this.$('.badge').text();
      //   var url = ev.currentTarget.href;
      //   var str = url.lastIndexOf('#');
      //   var anchor = url.substring(str+1,url.length);
      //   switch (anchor){
      //       case '':
      //         var ss = document.getElementsByClassName('.foot-tab-link')[0];
      //         console.log(ss);
      //       break;
      //       case 'dynamic':
      //         $(ev) .addClass('active');
      //       break;
      //       case 'caseView':
      //         document.getElementsByClassName('.foot-tab-link')[2];
      //       break;
      //       case 'settingView':
      //         document.getElementsByClassName('.foot-tab-link')[3];
      //       break;
      //   }
      // },

      render: function () {
        return this.$el.html(_.template(footerTpl)({ badge: 4 }));
      }
    });

    return Footer;
});