/**
 * @desc require.js配置文件
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

var corePath = 'cores/';
var expandPath = 'expands/';
var componentPath = 'components/';
var sourcePath = 'src/';

require.config({
  shim: {
    'underscore': {
      exports: '_'
    }
  },

  paths: {
    'text': corePath + 'require.text',
    'jquery': corePath + 'zepto',
    'underscore': corePath + 'underscore',
    'backbone': corePath + 'backbone',
    'viewportAdapter': expandPath + 'viewportAdapter',
    'main': sourcePath + 'main',

    /* 全局控制器 */
    'GlobalRouter': sourcePath + 'routers/GlobalRouter',

    /* 页面类(View) */
    'IndexView': sourcePath + 'views/IndexView',
    'DynamicView': sourcePath + 'views/DynamicView',

    /* 组件集  */
    'Header': componentPath + 'Header/Header',
    'Footer': componentPath + 'Footer/Footer',
    'Card': componentPath + 'Card/Card'
  }
});
