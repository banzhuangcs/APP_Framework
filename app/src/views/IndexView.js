/**
 * @desc 首页View
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define([
  'SuperView', 
  'SlideScreenView',
  'DetailView',
  'MessageList', 
  'PullLoading'], function (SuperView, SlideScreenView, DetailView, MessageList, PullLoading) {
    var IndexView = Backbone.View.extend({
      initialize: function (options) {
        SuperView.call(this, options);

        // 添加页面所需要的组件
        this.setHeader('首页', false, function () { alert('s') });
        this.setMain();
        this.setFooter(3, 0);

        // 添加消息列表组件
        this.getMessages();

        // 添加滑屏页面
        this.setSlideScreenView();

        // 添加详情页面
        this.setDetailView();    
      },

      getMessages: function () {
        var self = this;

        setTimeout(function () {
          new MessageList({
            className: 'message-list',
            callback: self.setMessageList.bind(self),
            onSlide: self.slide.bind(self),
            visualHeight: self.$mainEl.height()
          });
        }, 0);
      },

      setMessageList: function ($messageListEl) {
        this.$mainEl.append($messageListEl);
        this.pullRefresh($messageListEl);
      },

      setSlideScreenView: function () {
        this.slideScreenView = new SlideScreenView(SlideScreenView.options);
        this.$el.append(this.slideScreenView.$el);
      },

      setDetailView: function () {
        DetailView.options.slideScreenView = this.slideScreenView;
        this.slideScreenView.$el.append((new DetailView(DetailView.options)).$el);  
      },

      slide: function (e) {
        this.slideScreenView.setSlideScreenStyle(0);     
      },

      pullRefresh: function ($messageListEl) {
        if (this.pull) {
          return;
        }

        this.pull = new PullLoading({
          global: $messageListEl[0],
          wrapper: this.$mainEl[0],
          slideEnough: $messageListEl.height() / 3,
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
      id: 'index_view',
      className: 'view',
      funcName: 'indexView'
    };

    Object.assign(IndexView.prototype, SuperView.prototype);

    return IndexView;
});
