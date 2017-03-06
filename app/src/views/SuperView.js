/**
 * @desc 基类View
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(function ($, Backbone) {
  function SuperView (options) {
    this.funcName = options.funcName;
  }

  SuperView.prototype.render = function () {
  	//向元素中添加子节点
    document.body.appendChild(this.el);
  };

  return SuperView;
});