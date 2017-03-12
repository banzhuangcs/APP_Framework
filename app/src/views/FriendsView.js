/**
 * @desc 好友View
 * @author 张兴
 * @since V1.0.0 2017-2-2
*/

define([
  'jquery',
  'underscore',
  'SuperView',
  'Header', 
  'MessageList', 
  'Footer'], function ($, _, SuperView, Header, MessageList, Footer) {
    var FriendsView = Backbone.View.extend({
      initialize: function (options) {
        SuperView.call(this, options);

        this.header = new Header({
          className: 'header bg-green'
        });                   
        this.footer = new Footer({
          className: 'foot-toolbar'
        }); 
        this.messageList = new MessageList({
          className: 'message-list',
          data: [{
            className: 'message pt2 pb2 pl2 pr2 bg-white'
          }, {
            className: 'message pt2 pb2 pl2 pr2 bg-white'
          }]
        });

        this.$el.append(this.header.render('好友'));
        this.$el.append(this.messageList.render());
        this.$el.append(this.footer.render());
      }    
    });
    
    _.extend(FriendsView.prototype, SuperView.prototype); 

    return new FriendsView({
      id: 'friends_view',
      className: 'friends',
      funcName: 'friendsView'
    });
});
