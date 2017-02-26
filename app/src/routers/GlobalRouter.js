/**
 * @desc 全局控制器
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['backbone'], function (Backbone) {
  var GlobalRouter = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    initialize: function (views) {
      this.views = views;
    },

    index: function () {
      this.views['index'].render();
    }
  });

  return function (views) {
    new GlobalRouter(views);
    Backbone.history.start();
  };
});
