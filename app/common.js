/**
 * @desc require.js配置文件
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

var corePath = 'cores/';
var expandPath = 'expands/';
var animationComponentPath = 'components/Animation/';
var businessComponentPath = 'components/Business/';
var commonComponentPath = 'components/Common/';
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
    /* 公共组件 */
    'Header': commonComponentPath + 'Header/Header',
    'Footer': commonComponentPath + 'Footer/Footer',

    /* 业务组件 */
    'Card': businessComponentPath + 'Card/Card',
    'CardList': businessComponentPath + 'CardList/CardList',
    'Message': businessComponentPath + 'Message/Message',
    'MessageList': businessComponentPath + 'MessageList/MessageList',

    /* 动画组件 */
    'ScrollLoading': animationComponentPath + 'ScrollLoading/ScrollLoading'
  }
});
