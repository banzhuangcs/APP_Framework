/**
 * @desc 下拉刷新
 * @author 曾文彬
 * @since V1.0.0 2017-2-3
*/

define(['jquery'], function ($) {
  var STATS = {
    init: 'init',
    pulling: 'pulling',
    enough: 'enough',
    refreshing: 'refreshing'
  };

  var defaults = {
    global: null, // 绑定move事件容器
    wrapper: null, // 添加标记元素容器
    slide: 5,  // 向下滑动多少距离才确定是滑动而不是点击
    slideEnough: parseInt(window.innerHeight / 3), // 垂直方向向下滑动的最大距离
    onRefresh: function () {}, // 开始刷新时的所调用的外部函数
    state: STATS.init
  };

  function bind (fnNames, obj, context) {
    if (context == undefined) {
      context = obj;
    }

    if (!Array.isArray(fnNames)) {
      fnNames = [ fnNames ];
    }

    fnNames.forEach(function (fnName) {
      var fn = obj[fnName];
      
      if (typeof fn === 'function') {
        obj[fnName] = fn.bind(context);
      }   
    });
  }

  function addEvent (node, type, handler) {
    node.addEventListener(type, handler, false);
  }

  function getClientPos (fn) {
    return function (event) {
      var touch = event.changedTouches[0];
      fn.call(this, touch.clientX, touch.clientY, event);    
    }
  }

  function PullLoading (options) {
    Object.assign(this, defaults, options);
    bind(['touchstart', 'touchmove', 'touchend'], this);
    addEvent(this.global, 'touchstart', this.touchstart);
    addEvent(this.global, 'touchmove', this.touchmove);
    addEvent(this.global, 'touchend', this.touchend);

    this.startX = 0;
    this.startY = 0;
  }

  PullLoading.prototype.touchstart = getClientPos(function (clientX, clientY) {
    this.startX = clientX;
    this.startY = clientY;  
  });

  PullLoading.prototype.touchmove = getClientPos(function (clientX, clientY, event) {
    var diffX = clientX - this.startX;
    var diffY = clientY - this.startY;

    // 如果是滑动，并且是垂直方向向下滑动
    if (this.checkVericalDown(diffX, diffY) && this.state !== STATS.enough) {
      event.preventDefault();
      this.swipeDown(clientY, diffY);
    }
  });

  PullLoading.prototype.touchend = getClientPos(function (clientX, clientY, event) {
    var diffX = clientX - this.startX;
    var diffY = clientY - this.startY;

    if (this.checkVericalDown(diffX, diffY)) {
      event.preventDefault();
      this.refresh();
    }      
  });

  PullLoading.prototype.checkVericalDown = function (diffX, diffY) {
    return Math.abs(diffY) > this.slide
      && Math.abs(diffY) > Math.abs(diffX)
      && diffY > 0
      && this.global.scrollTop < 2;
  };

  PullLoading.prototype.refresh = function () {
    if (this.state === STATS.pulling) {
      this.state = STATS.init;
      this.swipe(0);   
      this.updateSymbolText('下拉刷新');
    } else {
      this.state = STATS.refreshing;
      this.swipe(40);
      this.updateSymbolText('刷新中');
      this.onRefresh(
        (function () {
          this.state = STATS.init;
          this.updateSymbolText('刷新完成');

          setTimeout((function () {
            this.swipe(0);
          }).bind(this), 1000);  
        }).bind(this),
        (function () {
          this.state = STATS.init;
          this.updateSymbolText('刷新完成');
          
          setTimeout((function () {
            this.swipe(0);  
          }).bind(this), 1000);  
        }).bind(this)
      )
    }     
  };

  PullLoading.prototype.swipeDown = function (clientY, diffY) {
    // 如果当前正在进行
    if (this.state === STATS.refreshing) {
      return;
    }  

    // 创建下拉刷新标记
    this.showSymbol('下拉刷新');

    // 判断是否滑动到最大滑动位置，并且设置在向下滑动时候，组件的状态
    if (diffY >= this.slideEnough) {
      this.updateSymbolText('松开刷新');
      this.state = STATS.enough;
    } else {
      this.state = STATS.pulling;
    }

    this.swipe(diffY);
  };

  PullLoading.prototype.swipe = function (diffY) {
    var globalSwipe = diffY !== 0 ? 'translate3d(0, '+ diffY +'px, 0)' : '';
    var symbolSwipe = diffY - 40 > 0 ? 'translate3d(0, '+ (diffY - 40) +'px, 0)' : '';

    this.global.style.WebkitTransform = globalSwipe;
    this.symbol.style.WebkitTransform = symbolSwipe;
  };

  PullLoading.prototype.showSymbol = function (text) {
    if (this.symbol) {
      return;
    }

    var symbol = this.symbol = document.createElement('div');
    symbol.innerText = text;
    symbol.style.cssText = 'position: absolute; left: 0; top: 0; z-index: 0; width: 100%; line-height: 40px; text-align: center; color: #666;';
    this.wrapper.appendChild(symbol);  
  };

  PullLoading.prototype.updateSymbolText = function (text) {
    this.symbol && (this.symbol.innerText = text);
  };

  PullLoading.prototype.hideSymbol = function () {
    if (this.symbol) {
      this.wrapper.removeChild(this.symbol);
    }
  };

  return PullLoading;
});

/*
  功能：下拉刷新
  参数：容器、滑动多少距离开始显示刷新（区分是否是点击）、满足下拉刷新的距离、下拉刷新时的回调函数
  
  构造器：
    参数赋予默认值
    事件处理程序绑定上下文
    定义touchstart时的横纵坐标

    touches: 当前屏幕上所有触摸点的信息
    targetTouches: 停留在当前对象的触摸点信息
    changedTouches：涉及当前事件的触摸点信息，当手指离开屏幕或者元素后能保留触摸信息
    
    clientX、clientY和pageX(ie不支持)、pageY意思都是一样的，都是相对于可视区域的位置      
    offsetX、offsetY相对于事件源元素的坐标，只有ie有
    screenX相对于屏幕

  /* bindAll 批量绑定
   * @param fns 待绑定的函数名称
   * @param obj 待绑定的实例对象
   * @param context 用于绑定的上下文对象
   * @describe 如果 context 为 undefined 则context = obj
  */