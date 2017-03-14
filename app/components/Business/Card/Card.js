/**
 * @desc Card组件
 * @author 吴彦祖
 * @since V1.0.0 2017-2-28
*/
define([
  'require',
  'backbone',
  'underscore',
  'text!Card.html',
  'text!Card.css'], function (require, Backbone, _, cardTpl, cardCss) {
    var Card = Backbone.View.extend({
      initialize: function (options) {
        var $ = Backbone.$;
        var styleId = 'card_css';

        if (!$('#' + styleId).length) {
          Backbone
          .$('<style type="text/css" id="'+ styleId +'"></style>')
          .html(cardCss)
          .prependTo(document.head);  
        }      

        this.model = options.model;
      },

      render: function () {
        return this.$el.html(_.template(cardTpl)({
          imgPath: this.model.imgPath,
          imgPath: this.model.imgPath ? require.toUrl(this.model.imgPath) : '',
          username: this.model.username,
          comment: this.model.comment,
          commentCount: this.model.commentCount,
          likeCount: this.model.likeCount
        }));
      }
    });

    return Card;
});