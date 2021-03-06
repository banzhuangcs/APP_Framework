/**
 * @desc 向上滚动下拉组件
 * @author 曾文彬
 * @since V1.0.0 2017-2-27
*/

define(['jquery', 'LazyLoading'], function ($, LazyLoading) {
  var defaults = {
    hasMoreData: true,
    hasLoading: false,
    dataUrl: '/',
    page: 1,
    threshold: 100,
    global: window,
    visualHeight: window.innerHeight,
    itemClass: '',

    // 接收拉取的数据，然后渲染成DOM
    display: function () {}
  };

  //定时器
  var throttle = function (fn, wait) {
    var timer, currTime;

    return function () {
      //每一个元素
      var args = [].slice.call(arguments);
      //如果存在就结束倒计时
      if (timer) {
        clearTimeout(timer);
      }
      //如果不存在就赋值当前时间
      if (!currTime) {
        currTime = Date.now();
      }
      //当前时间减去创建时间大于等于等待时间
      if (Date.now() - currTime >= wait) {
        //
        fn.apply(null, args);
        //赋值当前时间
        currTime = Date.now();
      }

      timer = setTimeout(function () {
        fn.apply(null, args);
      }, 30);
    };

  };

  function ScrollLoad (options) {
    //Object.assign ES6语法将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    //返回新的options对象
    options = Object.assign({}, defaults, options);
    //把新对象和this进行枚举赋值
    Object.assign(this, options);
    //外层容器实际高度
    this.actualGlobalHeight = this.visualHeight;

    this.hasFirstLoad = true;
    //外层容器
    this.finalGlobal = this.getFinalGlobal();


    this.scrollListener = throttle(this.scrollListener.bind(this), 100);

    this.cacheNodePos = [];
    this.lazyLoading = new LazyLoading();

    this.attachScrollListener();
  }

  ScrollLoad.prototype.updateNodePos = function () {
    this.cacheNodePos = [];
    var list = Array.prototype.slice.call($(this.itemClass));

    list.forEach((function (node) {
      var imgEl = node.querySelector('img');

      this.cacheNodePos.push({
        imgEl: imgEl,
        top: imgEl ? this.getOffsetTop(imgEl) : null,
        height: imgEl ? imgEl.offsetHeight : null
      });  
    }).bind(this));
  };

  ScrollLoad.prototype.attachScrollListener = function () {
    this.global.addEventListener('scroll', this.scrollListener, false); 
    this.scrollListener();   
  };

  ScrollLoad.prototype.deatchScrollListener = function () {
    this.global.removeEventListener('scroll', this.scrollListener, false);
  };

  ScrollLoad.prototype.scrollListener = function () {
    var scrollTop = this.finalGlobal.scrollTop;
    if (this.hasLoading || !this.hasMoreData) {
      this.deatchScrollListener();
      return;
    }

    // 懒加载图片  
    this.lazyLoading.updateImgSrc(this.finalGlobal.scrollTop, this.visualHeight);

    if (this.isBottom() || this.hasFirstLoad) {
      this.hasFirstLoad = false;
      this.hasLoading = true;
      this.showLoadDom('正在加载中...');

      this.fetch().then((function (data) {
        this.display(data.data);
        this.hideLoadDom();
        this.actualGlobalHeight = this.finalGlobal.scrollHeight;

        // 缓存子元素的位置
        this.updateNodePos();

        // 添加子元素用到懒加载处理  
        this.lazyLoading.append(this.cacheNodePos);

        if (!data.data.length) {
          this.hasMoreData = false;
          this.showLoadDom('加载完成');
        }

        this.lazyLoading.updateImgSrc(
          !this.hasMoreData ? scrollTop + this.loadingDom.offsetHeight : scrollTop,
          this.visualHeight
        );

        this.hasLoading = false;
        this.page++;
      }).bind(this), function () {
        this.hasMoreData = false;
        this.hasLoading = false;
        this.showLoadDom('加载失败...');

        return;
      });  
    }
  };

  ScrollLoad.prototype.getFinalGlobal = function () {
    //判断局部滚动还是全局滚动，如果是全局,globla.self会等于global
    return this.global.self === this.global 
      ? this.global.document.body
      : this.global;
  };

  ScrollLoad.prototype.getOffsetTop = function (el) {
    var offsetTop = el.offsetTop;
    var parent = el.offsetParent;

    while (parent !== this.finalGlobal) {
      offsetTop += parent.offsetTop;
      parent = parent.offsetParent;  
    }

    return offsetTop;
  };

  ScrollLoad.prototype.isBottom = function () {
    var scrollY = this.finalGlobal.scrollTop;

    return scrollY + this.visualHeight + this.threshold >= this.actualGlobalHeight;
  };

  ScrollLoad.prototype.fetch = function () {
    return new Promise((function (resolve, reject) {
      $.ajax({
        url: this.dataUrl,
        dataType: 'json',
        type: 'GET',
        timeout: 20000,
        data: { page: this.page },
        success: resolve,
        reject: reject
      });  
    }).bind(this));                 
  };

  ScrollLoad.prototype.showLoadDom = function (text) {
    var loadingDom = this.loadingDom = document.createElement('div');
    loadingDom.className = 'bg-white c666 tc show';
    loadingDom.style.cssText = 'line-height: 1rem';
    loadingDom.innerText = text;
    this.finalGlobal.appendChild(loadingDom);
  };

  ScrollLoad.prototype.hideLoadDom = function () {
    if (!this.loadingDom) {
      return;
    }

    this.finalGlobal.removeChild(this.loadingDom);
  };

  return ScrollLoad;
});

/*
  1、加载时机：避免在滚动到底部开始加载和渲染，以免用户等待时间过长，应该在距离底部有个间距的时候开始加载和渲染
  2、如果加载内容中有图片，应该使用懒加载，减小服务端的压力
  3、因为监听scroll事件，会造成过多的事件处理程序调用，所以利用Throttle原理延时函数调用时间，达到控制函数执行次数
  总体的思路就是：图片懒加载+DOM缓存+Throttle处理函数+图片FadeIn

  图片懒加载：当图片容器出现在屏幕的可视区域中，开始下载图片
  更新DOM缓存
  Throttle绑定事件程序
  图片FadeIn

  Throttle：绑定思路，如果距离上一次100秒
  图片懒加载、throttle、 

  图片懒加载:

  向上滚动加载的解决办法：
    1、确定加载时机，不要在滚动到底部的时候开始加载，避免用户等待时间过长，应该在滚动到距离底部一段距离就开始加载 
    2、加载数据、懒加载图片
    3、DOM缓存：请求完数据后，构造一个dom缓存对象构建结构为：{ node, img, src, id }
    4、懒加载图片：开始判断图片容器是否在可视区域之内
      算出当前元素相对于页面的绝对y坐标
      window.innerHeight + window.scrollY >= xx.getBoundingClientRect().top + .height()


    具体做法：绑定window的scroll事件，将对应的事件处理程序throttle化，
    事件处理程序中可以加上判断如果没有开始取数据，或者数据已经取完了

    滚动下载包括：加载数据 + 懒加载图片 + 滚动事件torottle + 加载中提示 + 加载完成提示

    加载数据
      定义一个表示是否加载完全部数据的属性
      定义一个表示是否还在加载数据的属性
      定义一个距离底部还有多少像素的阙值属性
    
 */