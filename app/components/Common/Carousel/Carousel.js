/**
 * @desc 图片轮播组件
 * @author 曾文彬
 * @since V1.0.0 2017-2-5
 */

define([
  'require',
  'jquery', 
  'underscore', 
  'text!Carousel.html', 
  'text!Carousel.css'], function (require, $, _, carouselTpl, carouselCss) {
  var defaults = {
    dragValue: 5,
    dragEnough: 50
  };

  var STATS = {
    init: 'init',
    drag: 'drag',
    swipe: 'swipe'
  };

  var bind = function (fns, obj, context) {
    Array.isArray(fns) || (fns = [ fns ]);
    context || (context = obj);

    fns.forEach(function (fn) {
      obj[fn] = obj[fn].bind(context);
    });
  };

  var addEvent = function ($el, type, handler) {
    $el.bind(type, handler);
  };

  var getClientPos = function (fn) {
    return function (event) {
      var touch = event.changedTouches[0];
      
      fn.call(this, touch.clientX, touch.clientY, event);  
    };
  };


  function Carousel (options) {
    Object.assign(this, defaults, options);

    // 绑定事件处理程序this指向为Carousel实例
    bind(['touchstartListener', 'touchmoveListener', 'touchendListener', 'animatedListener'], this);

    // 初始化元素和样式
    this.setWrapper();
    this.initStyle();

    // 绑定事件
    addEvent(this.$wrapperInnerEl, 'touchstart', this.touchstartListener);
    addEvent(this.$wrapperInnerEl, 'touchmove', this.touchmoveListener);
    addEvent(this.$wrapperInnerEl, 'touchend', this.touchendListener);
    addEvent(this.$wrapperInnerEl, 'webkitTransitionEnd', this.animatedListener)

    this.startX = 0;
    this.startY = 0;
    this.index = 0;
    this.distance = 0;
    this.state = STATS.init;
  }

  Carousel.prototype.animatedListener = function () {
    this.state = STATS.init;
  };

  Carousel.prototype.setWrapper = function () {
    this.$wrapper = $(_.template(carouselTpl)({ imgPath: require.toUrl('components/Common/Carousel/slide.jpg') }));
    this.$wrapperInnerEl = this.$wrapper.find('.carousel-inner');
    this.$childrens = this.$wrapperInnerEl.find('.carousel-item');
    this.$wrapperInnerEl.css('width', window.innerWidth * this.$childrens.length);
  };

  Carousel.prototype.initStyle = function () {
    var id = 'carousel_css';

    if (!$('#' + id).length) {
      $('<style type="text/css" id="'+ id +'"></style>')
        .html(carouselCss)
        .prependTo($(document.body));
    }
  };

  Carousel.prototype.touchstartListener = getClientPos(function (clientX, clientY) {
    if (this.state === STATS.swipe) {
      return;
    }

    this.startX = clientX;
    this.startY = clientY;
    this.$wrapperInnerEl.removeClass('swipe');
  });

  Carousel.prototype.touchmoveListener = getClientPos(function (clientX, clientY, event) {
    if (this.state === STATS.swipe) {
      return;
    }

    var diffX = clientX - this.startX;
    var diffY = clientY - this.startY;

    if (Math.abs(diffX) > this.dragValue && Math.abs(diffX) > Math.abs(diffY)) {
      event.preventDefault();
      this.dragHorizontal(diffX);
    }
  });

  Carousel.prototype.touchendListener = getClientPos(function (clientX, clientY, event) {
    if (this.state === STATS.swipe) {
      return;
    }

    var diffX = clientX - this.startX;
    var diffY = clientY - this.startY;

    event.preventDefault();
    this.$wrapperInnerEl.addClass('swipe');
    this.swipeHorizontal(diffX);   
  });

  Carousel.prototype.dragHorizontal = function (diffX) {
    this.state = STATS.drag;
    this.drag(this.distance + diffX);           
  };

  Carousel.prototype.swipeHorizontal = function (diffX) {
    var singleItemWidth = this.$childrens[this.index].offsetWidth;
    this.state = STATS.swipe;

    // 如果拖拽距离小于拖拽最大距离
    if (Math.abs(diffX) < this.dragEnough) {
      this.swipe(this.distance);    
    } else {
      if (diffX < 0) {
        if (this.index === this.$childrens.length - 1) {
          this.swipe(this.distance);
        } else {
          this.distance -= singleItemWidth;
          this.index++;
          this.swipe(this.distance);
        }
      } else {
        if (this.index === 0) {
          this.swipe(this.distance);
        } else {
          this.distance += singleItemWidth;
          this.index--;
          this.swipe(this.distance);
        }
      }
    }

    this.updateIndexListStyle(); 
  };

  Carousel.prototype.drag = function (distance) {
    this.$wrapperInnerEl.css('transform', 'translate3d('+ distance +'px, 0, 0)');
  };

  Carousel.prototype.swipe = function (distance) {
    this.$wrapperInnerEl.css('transform', 'translate3d('+ distance +'px, 0, 0)');
  };
  
  Carousel.prototype.updateIndexListStyle = function () {
    this
      .$wrapper
      .find('.carousel-pagination-item')
      .removeClass('active')
      .eq(this.index)
      .addClass('active');
  };

  Carousel.prototype.render = function () {
    return this.$wrapper;
  };

  return Carousel; 
});