/**
 * @desc 详情View
 * @author 曾文彬
 * @since V1.0.0 2017-2-8
 */

define(['backbone', 'SuperView', 'Carousel'], function (Backbone, SuperView, Carousel) {
  var DetailView = Backbone.View.extend({
    initialize: function (options) {
      SuperView.call(this, options);

      this.slideScreenView = options.slideScreenView;

      // 添加页面所需要的组件
      this.setHeader('轮播图', true, this.hide.bind(this));
      this.setMain();
      this.setMainInner();
      this.setCarousel();
    },

    hide: function () {
      this.slideScreenView.setSlideScreenStyle('100%');
    },

    setMainInner: function () {
      this.$mainInnerEl = $('<div class="main-inner bg-shallow-gray" style="-webkit-box-flex: 1"></div>').appendTo(this.$mainEl);
    },

    setCarousel: function () {
      // var $carouselEl = this.$carouselEl = $('<div class="carousel"></div>');
      // $carouselEl
      this.$mainInnerEl.append((new Carousel).render());
    }
  });

  DetailView.options = {
    id: 'detail_view',
    className: 'view',
    funcName: 'detailView'
  };

  Object.assign(DetailView.prototype, SuperView.prototype);

  return DetailView;
});