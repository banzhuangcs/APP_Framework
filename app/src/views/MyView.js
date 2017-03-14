/**
 * @desc 好友View
 * @author 张兴
 * @since V1.0.0 2017-2-2
*/

define(['SuperView','MyCardList'], function (SuperView, MyCardList) {
    var MyView = Backbone.View.extend({
      initialize: function (options) {
        SuperView.call(this, options);

        //添加页面组件
        this.setHeader('我的');
        this.setMain();
        this.setFooter(6,3);

        // 添加MyCardList
        this.getFriends();

      },

      getFriends: function () {
        var self = this;
        setTimeout(function () {
          new MyCardList({
            className: 'My-list',
            callback: self.setMyCardList.bind(self),
            visualHeight: self.$mainEl.height()
          });
        }, 0);
      },

      setMyCardList: function ($myCardListEl) {
        var myCardListEl = $myCardListEl[0];
        this.$mainEl.append(myCardListEl);

      },

    });


    MyView.options = {
      id: 'my',
      className: 'view',
      funcName: 'myView'
    };


    Object.assign(MyView.prototype, SuperView.prototype);

    return MyView;
});
