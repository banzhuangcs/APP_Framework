/**
 * @desc Friends组件
 * @author 吴彦祖
 * @since V1.0.0 2017-2-28
*/
define([
  'require',
  'backbone',
  'underscore',
  'text!Friends.html',
  'text!Friends.css'], function (require, Backbone, _, friendsTpl, friendsCss) {
    var Friends = Backbone.View.extend({
      initialize: function (options) {
        var $ = Backbone.$;
        var styleId = 'friends_css';

        if (!$('#' + styleId).length) {
          Backbone
          .$('<style type="text/css" id="'+ styleId +'"></style>')
          .html(friendsCss)
          .prependTo(document.head);  
        }      

        this.model = options.model;
      },

      render: function () {
        return this.$el.html(_.template(friendsTpl)({
          imgPath: this.model.imgPath,
          username: this.model.username,
          type: this.model.type || "",
          comment: this.model.comment
        }));
      }
    });

    return Friends;
});