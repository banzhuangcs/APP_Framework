/**
 * @desc 好友View
 * @author 张兴
 * @since V1.0.0 2017-2-2
*/

define(['SuperView','FriendsList'], function (SuperView, FriendsList) {
    var FriendsView = Backbone.View.extend({
      initialize: function (options) {
        SuperView.call(this, options);

        //添加页面组件
        this.setHeader('好友');
        this.setMain();
        this.setFooter(5,2);

        // 添加FriendsList
        this.getFriends();

      },

      getFriends: function () {
        var self = this;
        setTimeout(function () {
          new FriendsList({
            className: 'Friends-list',
            callback: self.setFriendsList.bind(self),
            visualHeight: self.$mainEl.height()
          });
        }, 0);
      },

      setFriendsList: function ($friendsListEl) {
        var friendsListEl = $friendsListEl[0];
        this.$mainEl.append(friendsListEl);
      },

    });

    FriendsView.options = {
      id: 'friends',
      className: 'view',
      funcName: 'friendsView'
    };


    Object.assign(FriendsView.prototype, SuperView.prototype);

    return FriendsView;
});
