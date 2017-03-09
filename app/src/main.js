/**
 * @desc 应用启动文件
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['GlobalRouter', 'IndexView', 'DynamicView'], function (GlobalRouter) {
  // 获取所有View
  var Views = Array.prototype.slice.call(arguments, 1);
  var view = {};

  Views.forEach(function (View) {
    view[View.options.funcName] = View;
  });
  
  // 开启全局控制器
  GlobalRouter(view);
});
