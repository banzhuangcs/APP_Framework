/**
 * @desc 好友列表容器组件
 * @author 张兴
 * @since V1.0.0 2017-3-2
 */

define(['backbone', 'Friends', 'ScrollLoading'], function (Backbone, Friends, ScrollLoading) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.callback = options.callback;
      this.setStyle();
      this.scrollLoading = new ScrollLoading({
        global: this.el,
        visualHeight: options.visualHeight,
        dataUrl: 'friends.php',
        component: Friends,
        itemClass: '.Friends',
        display: this.render.bind(this)
      });
    },
    
    map: function (data) {
      Array.isArray(data) || (data = [ data ]);
      return data.map(function (item) {
        return new Friends({ 
          className: 'friends',
          model: item
        });
      });
    },
    
    setStyle: function () {
      this.el.style.cssText = 'position: relative; z-index: 1; height: 100%; overflow: auto';
    },

    render: function (data) {
      this.friends = this.map(data);
      this.friends.forEach(_.bind(function (friend) {
        this.$el.append(friend.render());  
      }, this));
      this.callback(this.$el);
    }
  });
});