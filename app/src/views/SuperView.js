/**
 * @desc 基类View
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
 */

define([
  'Header',
  'Footer'], function (Header, Footer) {
    function SuperView (options) {
      this.funcName = options.funcName;
    }

    SuperView.prototype.setHeader = function (text) {
      this.header = new Header({ className: 'header bg-green' });  
      this.$el.append(this.header.render(text));
    };

    SuperView.prototype.setFooter = function (badge, activeIndex) {
      this.footer = new Footer({ 
        className: 'foot-toolbar', 
        badge: badge, 
        activeIndex: activeIndex 
      });
      this.$el.append(this.footer.render());
    };

    SuperView.prototype.setMain = function () {
      this.mainEl = document.createElement('div');
      this.mainEl.className = 'main';
      this.$el.append(this.mainEl);
    };

    // 渲染View
    SuperView.prototype.render = function () {
      document.body.appendChild(this.el);
    };

    // 删除View
    SuperView.prototype.destroy = function () {
      document.getElementById(this.el.id) && document.body.removeChild(this.el);
    };

    return SuperView;
});