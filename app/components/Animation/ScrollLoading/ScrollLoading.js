/**
 * @desc 向上滚动下拉组件
 * @author 曾文彬
 * @since V1.0.0 2017-2-27
*/

define(['jquery'], function ($) {
  var defaults = {
    hasMoreData: true,
    hasLoading: false,
    dataUrl: '/',
    page: 1,
    threshold: 100,
    global: window,
    visualHeight: window.innerHeight,
    loadMore: function () {}
  };

  var throttle = function (fn, wait) {
    var timer, currTime;

    return function () {
      var args = [].slice.call(arguments);

      if (timer) {
        clearTimeout(timer);
      }

      if (!currTime) {
        currTime = Date.now();
      }

      if (Date.now() - currTime >= wait) {
        fn.apply(null, args);
        currTime = Date.now();
      }

      timer = setTimeout(function () {
        fn.apply(null, args);
      }, 30);
    };
  };

  function ScrollLoad (options) {
    options = Object.assign({}, defaults, options);
    Object.assign(this, options);

    this.actualGlobalHeight = this.visualHeight;
    this.hasFirstLoad = true;
    this.finalGlobal = this.getFinalGlobal();
    this.scrollListener = throttle(this.scrollListener.bind(this), 100);
    this.attachScrollListener();
  }

  ScrollLoad.prototype.attachScrollListener = function () {
    this.global.addEventListener('scroll', this.scrollListener, false); 
    this.scrollListener();   
  };

  ScrollLoad.prototype.scrollListener = function () {
    if (this.hasLoading || !this.hasMoreData) {
      return;
    }      

    if (this.isBottom() || this.hasFirstLoad) {
      this.hasFirstLoad = false;
      this.hasLoading = true;
      this.showLoadDom('正在加载中...');

      this.fetch().then((function (data) {
        this.loadMore(data.data);
        this.hideLoadDom();
        this.actualGlobalHeight = this.finalGlobal.scrollHeight;

        if (!data.data.length) {
          this.hasMoreData = false;
          this.showLoadDom('加载完成');
        }

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
    return this.global.self === this.global 
      ? this.global.document.body
      : this.global;
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
        timeout: 10000,
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