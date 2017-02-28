/**
 * @desc 首页View
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define([
  'jquery',
  'underscore',
  'SuperView',
  'Header', 
  'MessageList', 
  'Footer'], function ($, _, SuperView, Header, MessageList, Footer) {
    var IndexView = Backbone.View.extend({
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

        this.$el.append(this.header.render('首页'));
        this.$el.append(this.messageList.render());
        this.$el.append(this.footer.render());
      }    
    });
    
    _.extend(IndexView.prototype, SuperView.prototype); 

    return new IndexView({
      id: 'index',
      className: 'index',
      funcName: 'indexView'
    });
});
