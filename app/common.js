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
    /* 启动文件 */
    'main': sourcePath + 'main',

    /* 核心底层 */
    'text': corePath + 'require.text',
    'jquery': corePath + 'zepto',
    'underscore': corePath + 'underscore',
    'backbone': corePath + 'backbone',

    /* 基础扩展 */
    'viewportAdapter': expandPath + 'viewportAdapter',

    /* 全局控制器 */
    'GlobalRouter': sourcePath + 'routers/GlobalRouter',

    /* 页面类(View) */
    'SuperView': sourcePath + 'views/SuperView',
    'IndexView': sourcePath + 'views/IndexView',
    'DynamicView': sourcePath + 'views/DynamicView',
    'FriendsView': sourcePath + 'views/FriendsView',
    'MyView': sourcePath + 'views/MyView',
    
    /* 公共组件 */
    'Header': commonComponentPath + 'Header/Header',
    'Footer': commonComponentPath + 'Footer/Footer',

    /* 业务组件 */
    'Card': businessComponentPath + 'Card/Card',
    'CardList': businessComponentPath + 'CardList/CardList',
    'Message': businessComponentPath + 'Message/Message',
    'MessageList': businessComponentPath + 'MessageList/MessageList',
    'Friends': businessComponentPath + 'Friends/Friends',
    'FriendsList': businessComponentPath + 'FriendsList/FriendsList',
    'MyCard': businessComponentPath + 'MyCard/MyCard',
    'MyCardList': businessComponentPath + 'MyCardList/MyCardList',

    /* 动画组件 */
    'ScrollLoading': animationComponentPath + 'ScrollLoading',
    'LazyLoading': animationComponentPath + 'LazyLoading',
    'PullLoading': animationComponentPath + 'PullLoading'
  }
});
