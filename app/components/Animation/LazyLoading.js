/**
 * @desc 懒加载图片组件
 * @author 曾文彬
 * @since V1.0.0 2017-2-3
 */

define(['jquery'], function ($) {
  function LazyLoading () {
    this.className = 'J-loaded';
    this.nodePos = [];
  }

  LazyLoading.prototype.get = function (index) {
    return index == undefined 
      ? this.nodePos.slice(0)
      : this.nodePos[
        index >= this.nodePos.length
          ? this.nodePos.length - 1
          : index < 0
            ? this.nodePos.length + index
            : index    
      ];
  };

  LazyLoading.prototype.append = function (pos) {
    this.nodePos = [].concat.apply(this.nodePos, pos ? Array.isArray(pos) ? pos : [ pos ] : []);

    return this;
  };
 
  LazyLoading.prototype.isVisual = function (top, height, scrollTop, visualHeight) {
    return top + height - scrollTop <= visualHeight;                       
  };

  LazyLoading.prototype.updateImgSrc = function (scrollTop, visualHeight) {
    this.nodePos.forEach((function (obj) {
      var top = obj.top;
      var height = obj.height;
      var imgEl = obj.imgEl;
      
      if (imgEl && !this.isUpdated(imgEl) && this.isVisual(top, height, scrollTop, visualHeight)) {
        imgEl.classList.add(this.className);
        imgEl.classList.add('fade-in');
        imgEl.setAttribute('src', imgEl.getAttribute('data-src'));
      }
    }).bind(this));                 
  };

  LazyLoading.prototype.isUpdated = function (imgEl) {
    return imgEl.classList.contains(this.className) 
  };

  return LazyLoading;
});