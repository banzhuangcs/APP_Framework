/**
 * @desc 应用启动文件
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['GlobalRouter', 'IndexView', 'DynamicView'], function (GlobalRouter) {
  // 获取所有View
  var args = Array.prototype.slice.call(arguments, 1);
  var views = {};

  args.forEach(function (View) {
  	var options = View.options;
    views[options.funcName] = new View(options);
  });
  
  // 开启全局控制器
  GlobalRouter(views);
});
