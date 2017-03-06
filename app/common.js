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
    'SuperView': sourcePath + 'views/SuperView',
    'IndexView': sourcePath + 'views/IndexView',
    'DynamicView': sourcePath + 'views/DynamicView',
    'FriendsView': sourcePath + 'views/FriendsView',

    /* 组件集  */
    'Header': componentPath + 'Header/Header',
    'Footer': componentPath + 'Footer/Footer',
    'Card': componentPath + 'Card/Card',
    'CardList': componentPath + 'CardList/CardList',
    'Message': componentPath + 'Message/Message',
    'MessageList': componentPath + 'MessageList/MessageList'
  }
});
