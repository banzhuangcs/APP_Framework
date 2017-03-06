/**
 * @desc 懒加载图片组件
 * @author 曾文彬
 * @since V1.0.0 2017-2-3
 */

define(['jquery'], function ($) {
  function LazyLoading (nodePos) {
    this.className = 'J-loaded';
    this.nodePos = [];
    this.append(nodePos);
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
 
  LazyLoading.prototype.isVisual = function (node, scrollTop, visualHeight) {
    return $(node).offset().top + node.offsetHeight - scrollTop <= visualHeight;                       
  };

  LazyLoading.prototype.updateImgSrc = function (scrollTop, visualHeight) {
    this.nodePos.forEach((function (obj) {
      var node = obj.node;
      var img = obj.img;

      if (!this.isUpdated(img) && this.isVisual(node, scrollTop, visualHeight)) {
        img.classList.add(this.className);
        img.classList.add('fade-in');
        img.setAttribute('src', img.getAttribute('data-src'));
      }
    }).bind(this));                 
  };

  LazyLoading.prototype.isUpdated = function (imgNode) {
    return imgNode.classList.contains(this.className);  
  };

  return LazyLoading;
});