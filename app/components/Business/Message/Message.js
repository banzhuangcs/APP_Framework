/**
 * @desc 消息组件
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define([
  'require',
  'backbone',
  'underscore',
  'text!Message.html',
  'text!Message.css'
], function (require, Backbone, _, messageTpl, messageCss) {
  var Message = Backbone.View.extend({
    events: {
      'click .message-inner': 'handleInterlude'
    },

    initialize: function (options) {
      var $ = Backbone.$;
      var styleId = 'message_css';

      if (!$('#' + styleId).length) {
        Backbone
        .$('<style type="text/css" id="'+ styleId +'"></style>')
        .html(messageCss)
        .prependTo(document.head);  
      }  
      
      this.model = options.model;
    },

    handleInterlude: function () {
      alert('handleInterlude');
    },

    render: function () {
      return this.$el.html(_.template(messageTpl)({ 
        imgPath: require.toUrl('./components/Business/Message/img.jpg'), 
        title: this.model.title, 
        readCount: this.model.readCount, 
        commentCount: this.model.commentCount 
      }));
    }
  });

  return Message;
});
