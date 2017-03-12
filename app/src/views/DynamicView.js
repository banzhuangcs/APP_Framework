/**
 * @desc 动态View
 * @author 张兴
 * @since V1.0.0 2017-2-28
*/

define(['SuperView', 'CardList', 'PullLoading'], function (SuperView, CardList, PullLoading) {
  var DynamicView = Backbone.View.extend({
    initialize: function (options) {
      SuperView.call(this, options);

      // 添加页面所需要的组件
      this.setHeader('动态');
      this.setMain();
      this.setFooter(4, 1);
      
      // 添加CardList
      this.getCards();
    },

    getCards: function () {
      var self = this;

      setTimeout(function () {
        new CardList({
          className: 'card-list',
          callback: self.setCardList.bind(self),
          visualHeight: self.$mainEl.height()
        });
      }, 0);
    },

    setCardList: function ($cardListEl) {
      this.$mainEl.append($cardListEl);
      
      // 下拉刷新
      //this.pullRefresh(cardListEl);
    },

    pullRefresh: function ($cardListEl) {
      if (this.pull) {
        return;
      }

      this.pull = new PullLoading({
        global: $cardListEl[0],
        wrapper: this.$mainEl[0],
        slideEnough: $cardListEl.height() / 3,
        onRefresh: function (success, error) {
          setTimeout(function () {
            console.log('刷新完成');
            success();
          }, 1000);
        }
      });
    }
  });

  DynamicView.options = {
    id: 'dynamic_view',
    className: 'view',
    funcName: 'dynamicView'
  };

  Object.assign(DynamicView.prototype, SuperView.prototype);

  return DynamicView;
});
