/**
 * @desc 切屏动画展示View
 * @author 曾文彬
 * @since V1.0.0 2017-2-8
 */

define(['backbone'], function (Backbone) {
  var SlideScreenView = Backbone.View.extend({
    initialize: function () {
      this.initStyle();
      this.setSlideScreenStyle('100%');
    }
  });

  SlideScreenView.prototype.initStyle = function () {
    this.$el.css({
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      transition: 'transform .5s',
      zIndex: 1000
    });
  };

  SlideScreenView.prototype.setSlideScreenStyle = function (offsetLeft) {
    this.$el.css('transform', 'translate3d('+ offsetLeft +', 0, 0)');
  };

  SlideScreenView.options = {
    id: 'slidescreen_view'
  };

  return SlideScreenView;
});