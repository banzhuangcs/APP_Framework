/**
 * @desc 消息列表容器组件
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
 */

define([
  'backbone', 
  'Message', 
  'ScrollLoading'], function (Backbone, Message, ScrollLoading) {
    return Backbone.View.extend({
      initialize: function (options) {
        this.callback = options.callback;
        this.setStyle();
        this.scrollLoading = new ScrollLoading({
          global: this.el,
          visualHeight: options.visualHeight,
          dataUrl: 'data.php',
          component: Message,
          itemClass: '.message',
          display: this.render.bind(this)
        });
      },
      
      map: function (data) {
        Array.isArray(data) || (data = [ data ]);

        return data.map(function (item) {
          return new Message({ 
            className: 'message pt2 pb2 pl2 pr2 bg-white',
            model: item
          });
        });
      },
      
      setStyle: function () {
        this.el.style.cssText = 'position: relative; z-index: 1; height: 100%; overflow: auto';
      },

      render: function (data) {
        this.messages = this.map(data);
        this.messages.forEach(_.bind(function (msg) {
          this.$el.append(msg.render());  
        }, this));
        this.callback(this.$el);
      }
    });
});