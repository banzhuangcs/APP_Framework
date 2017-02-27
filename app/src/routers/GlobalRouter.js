/**
 * @desc 全局控制器
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['backbone'], function (Backbone) {
  var GlobalRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'dynamic': 'dynamic'
    },

    initialize: function (views) {
      this.views = views;
    },

    index: function () {
      this.views['index'].render();
    },

    dynamic: function () {
      this.views['dynamic'].render();
    }
    
  });

  return function (views) {
    new GlobalRouter(views);
    Backbone.history.start();
  };
});
