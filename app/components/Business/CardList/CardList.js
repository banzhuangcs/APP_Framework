/**
 * @desc 动态列表组件
 * @author 张兴
 * @since V1.0.0 2017-3/1
*/

define(['backbone', 'Card', 'ScrollLoading'], function (Backbone, Card, ScrollLoading) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.callback = options.callback;
      this.setStyle();
      this.scrollLoading = new ScrollLoading({
        global: this.el,
        visualHeight: options.visualHeight,
        dataUrl: 'card.php',
        component: Card,
        itemClass: '.card',
        display: this.render.bind(this)
      });
    },
    
    map: function (data) {
      Array.isArray(data) || (data = [ data ]);

      return data.map(function (item) {
        return new Card({ 
          className: 'card mt2 mb2 ml2 mr2 bg-white',
          model: item
        });
      });
    },
    
    setStyle: function () {
      this.el.style.cssText = 'position: relative; z-index: 1; height: 100%; overflow: auto';
    },

    render: function (data) {
      this.cards = this.map(data);
      this.cards.forEach(_.bind(function (card) {
        this.$el.append(card.render());  
      }, this));
      this.callback(this.$el);
    }
  });
});