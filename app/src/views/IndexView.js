/**
 * @desc 首页View
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['backbone', 'Header', 'Message', 'Footer'], function (Backbone, Header, Message, Footer) {
  var IndexView = Backbone.View.extend({
    initialize: function () {
      /* 测试数据 */
      var message1 = new Message({
        className: 'message bg-white pt2 pb2 pl2 pr2'
      });
      var message2 = new Message({
        className: 'message bg-white pt2 pb2 pl2 pr2'
      });
      var message3 = new Message({
        className: 'message bg-white pt2 pb2 pl2 pr2'
      });
      var message4 = new Message({
        className: 'message bg-white pt2 pb2 pl2 pr2'
      });

      this.$el.append(Header.render('首页'));
      this.$el.append(message1.render());
      this.$el.append(message2.render());
      this.$el.append(message3.render());
      this.$el.append(message4.render());
      this.$el.append(Footer.render());
    },

    render: function () {
      Backbone.$(document.body).append(this.$el);
    }
  });

  var indexView = new IndexView({
    id: 'index',
    className: 'index'
  });
  indexView.funcName = 'index';

  return indexView;
});
