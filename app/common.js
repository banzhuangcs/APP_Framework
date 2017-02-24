/**
 * @desc require.js配置文件
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

var expandPath = './expands';
var componentPath = './components';

require.config({
  shim: {
    '_': {
      exports: '_'
    }
  },

  paths: {
    'main': 'src/main'
  }
});
