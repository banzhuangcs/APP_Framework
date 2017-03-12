/**
 * @desc 我的列表容器组件
 * @author 张兴
 * @since V1.0.0 2017-3-2
 */

define(['backbone', 'MyCard'], function (Backbone, MyCard) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.callback = options.callback;
      this.setStyle();
      this.render();
      // this.scrollLoading = new ScrollLoading({
      //   global: this.el,
      //   visualHeight: options.visualHeight,
      //   dataUrl: 'mycard.php',
      //   component: mycard,
      //   itemClass: '.mycard',
      //   display: this.render.bind(this)
      // });
    },
    
    map: function (data) {
      Array.isArray(data) || (data = [ data ]);
      return data.map(function (item) {
        return new MyCard({ 
          className: 'mycard',
          model: item
        });
      });
    },
    
    setStyle: function () {
      this.el.style.cssText = 'position: relative; z-index: 1; height: 100%; overflow: auto';
    },

    render: function (data) {
      this.mycard = this.map(data);
      this.mycard.forEach(_.bind(function (mycard) {
        this.$el.append(mycard.render());  
      }, this));
      this.callback(this.$el);
    }
  });
});