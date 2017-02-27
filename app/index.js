/**
 * @desc 框架入口文件
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

require(['common'], function () {
  require(['viewportAdapter'], function (viewport) {
    viewport(750);

    require(['main']);
  });
});
