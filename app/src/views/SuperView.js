/**
 * @desc 基类View
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
 */

define([
  'jquery',
  'Header',
  'Footer'], function ($, Header, Footer) {
    function SuperView (options) {
      this.funcName = options.funcName;
    }

    SuperView.prototype.setHeader = function (text, back, onLeftClick, onRightClick) {
      var options = {
        className: 'header bg-green',
        text: text,
        back: back,
        onLeftClick: onLeftClick,
        onRightClick: onRightClick
      };

      this
        .$el
        .append((new Header(options)).render());
    };

    SuperView.prototype.setFooter = function (badge, activeIndex) {
      this
        .$el
        .append((new Footer({ className: 'foot-toolbar', badge: badge, activeIndex: activeIndex })).render());
    };

    SuperView.prototype.setMain = function () {
      this.$mainEl = $('<div class="main"></div>').appendTo(this.$el);
    };

    // 渲染View
    SuperView.prototype.render = function () {
      $(document.body).append(this.$el);
    };

    // 删除View
    SuperView.prototype.destroy = function () {
      var $el = $('#' + this.el.id);
      $el.length && $el[0].nodeType === 1 && this.$el.remove();
    };

    return SuperView;
});