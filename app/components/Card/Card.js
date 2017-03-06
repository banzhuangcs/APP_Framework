/**
 * @desc Card组件
 * @author 吴彦祖
 * @since V1.0.0 2017-2-28
*/
define([
 'backbone',
 'underscore',
 'text!Card.html',
 'text!Card.css'], function (Backbone, _, CardTpl, CardCss) {
    var Card = Backbone.View.extend({

      initialize: function () {
        var $ = Backbone.$;
        var styleId = 'card_css';

        if (!$('#' + styleId).length) {
          Backbone
          .$('<style type="text/css" id="'+ styleId +'"></style>')
          .html(CardCss)
          .prependTo(document.head);  
        }      
      },

      render: function () {
        return this.$el.html(_.template(CardTpl)({ 
          userImg: require.toUrl('./components/Card/img.jpg'),
          username: '吴彦祖',
          createtime: '2017-3-1',
          contentImg:require.toUrl('./components/Card/sample.jpg'),
          commentcontent:'八路军就拉大栓啊！瞄了一个准！打死个翻译官,火车道就开到济南啊~',
          commentnum:32,
          likes:23,
          commentUrl:require.toUrl('./components/Card/img.jpg')
        }));
      }
    });

    return Card;
});
-3