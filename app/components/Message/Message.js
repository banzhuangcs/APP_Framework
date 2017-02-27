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

    initialize: function () {
      Backbone
        .$('<style type="text/css"></style>')
        .html(messageCss)
        .prependTo(document.head);
    },

    handleInterlude: function () {
      alert('handleInterlude');
    },

    render: function () {
      return this.$el.html(_.template(messageTpl)({ imgPath: require.toUrl('./components/Message/img.jpg'), title: 'Modal and Button', readCount: 123, commentCount: 123 }));
    }
  });

  return Message;
});
