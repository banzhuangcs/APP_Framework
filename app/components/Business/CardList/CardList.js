/**
 * @desc 动态列表组件
 * @author 张兴
 * @since V1.0.0 2017-3/1
*/

define(['backbone', 'Card'], function (Backbone, Card) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.messages = this.map(options.data);  
    },
    
    map: function (data) {
      Array.isArray(data) || (data = [ data ]);

      return data.map(function (item) {
        return new Card(item);
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