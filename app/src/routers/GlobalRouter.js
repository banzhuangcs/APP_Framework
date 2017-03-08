/**
 * @desc 全局控制器
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['backbone'], function (Backbone) {
  var GlobalRouter = Backbone.Router.extend({
    routes: {
      '': 'indexView',
      'dynamic': 'dynamicView',
      'friends': 'friendsView'
    },

    initialize: function (views) {
      this.views = views;
    },

    indexView: function () {
      this.destroyView();
      this.views['indexView'].render();
    },

    dynamicView: function () {
      this.destroyView();
      this.views['dynamicView'].render();
    },

    friendsView: function () {
      this.destroyView();
      this.views['friendsView'].render();
    },

    destroyView: function () {
      Object.keys(this.views).forEach((function (name) {
        this.views[name].destroy();
      }).bind(this));
    }
  });

  return function (views) {
    new GlobalRouter(views);
    Backbone.history.start();
  };
});
