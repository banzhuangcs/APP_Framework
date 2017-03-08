/**
 * @desc 首页View
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['SuperView', 'MessageList', 'PullLoading'], function (SuperView, MessageList, PullLoading) {
  var IndexView = Backbone.View.extend({
    initialize: function (options) {
      SuperView.call(this, options);

      // 添加页面所需要的组件
      this.setHeader('首页');
      this.setMain();
      this.setFooter();

      // 添加消息列表组件
      this.getMessages();
    },

    getMessages: function () {
      var self = this;

      setTimeout(function () {
        new MessageList({
          className: 'message-list',
          callback: self.setMessageList.bind(self),
          visualHeight: self.mainEl.offsetHeight
        });
      }, 0);
    },

    setMessageList: function ($messageListEl) {
      var messageListEl = $messageListEl[0];
      this.mainEl.appendChild(messageListEl);

      // 下拉刷新
      this.pullRefresh(messageListEl);
    },

    pullRefresh: function (messageListEl) {
      if (this.pull) {
        return;
      }

      this.pull = new PullLoading({
        global: messageListEl,
        wrapper: this.mainEl,
        slideEnough: messageListEl.offsetHeight / 3,
        onRefresh: function (success, error) {
          setTimeout(function () {
            console.log('刷新完成');
            success();
          }, 1000);
        }
      });
    }
  });

  IndexView.options = {
    id: 'index',
    className: 'view',
    funcName: 'indexView'
  };

  Object.assign(IndexView.prototype, SuperView.prototype);

  return IndexView;
});
