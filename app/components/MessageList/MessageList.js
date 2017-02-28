/**
 * @desc 消息列表组件
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['backbone', 'Message'], function (Backbone, Message) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.messages = this.map(options.data);  
    },
    
    map: function (data) {
      Array.isArray(data) || (data = [ data ]);

      return data.map(function (item) {
        return new Message(item);
      });
    },

    render: function () {
      this.messages.forEach(_.bind(function (msg) {
        this.$el.append(msg.render());  
      }, this));
      
      return this.$el; 
    }
  });
});