/**
 * @desc 头部组件
 * @author 吴彦祖
 * @since V1.0.0 2017-2-27
*/

define([
 'backbone',
 'underscore', 
 'text!Footer.html',
 'text!Footer.css'], function(Backbone, _, FooterTpl, FooterCss){
    var Footer = Backbone.View.extend({

      events:{
        'click .foot-tab-link': 'handleClick'
      },

      initialize: function () {
        Backbone
          .$('<style type="text/css"></style>')
          .html(FooterCss)
          .prependTo(document.head);
      },

      handleClick: function (ev) {
        var badge = this.$('.badge').text();
        var url = ev.currentTarget.href;
        var anchor = url.substring(42);
        switch (anchor){
            case 'mainView':
            alert('首页');
            break;
            case 'subjectView':
            alert('动态');
            break;
            case 'caseView':
            alert('好友');
            break;
            case 'settingView':
            alert('我的'+badge);
            break;
        }
      },

      render: function () {
        return this.$el.html(_.template(FooterTpl)({ title1: '主页', title2: '动态', title3: '好友', title4: '我的', badge:4}));
      }

    });

    return Footer;
});