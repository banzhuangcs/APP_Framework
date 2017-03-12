/**
 * @desc 全局控制器
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['backbone'], function (Backbone) {
  var GlobalRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'dynamic': 'dynamic',
      'friends': 'friends',
      'carousel': 'carousel'
    },

    initialize: function (view) {
      this.view = view;
    },

    index: function () {
      this.destroy();
      
      var IndexView = this.view['indexView'];
      this.indexView = new IndexView(IndexView.options);
      this.indexView.render();
    },

    dynamic: function () {
      this.destroy();
      
      var DynamicView = this.view['dynamicView'];
      this.dynamicView = new DynamicView(DynamicView.options);
      this.dynamicView.render();
    },

    carousel: function () {
      this.destroy();

      var CarouselView = this.view['carouselView'];
      this.carouselView = new CarouselView(CarouselView.options);
      this.carouselView.render();
    },

    friends: function () {
    },

    destroy: function () {
      Object.keys(this.view).forEach((function (name) {
        if (this[name]) {
          this[name].destroy();
          delete this[name];
        }  
      }).bind(this));
    }
  });

  return function (views) {
    new GlobalRouter(views);
    Backbone.history.start();
  };
});
