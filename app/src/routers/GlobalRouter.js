/**
 * @desc 全局控制器
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['backbone'], function (Backbone) {
  var GlobalRouter = Backbone.Router.extend({
    routes: {
      '': 'indexView',
      'dynamic': 'dynamic'
    },

    initialize: function (views) {
      this.views = views;
    },

    indexView: function () {
      this.views['indexView'].render();
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
