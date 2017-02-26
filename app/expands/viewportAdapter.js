/**
 * @desc 移动页面自适应
 * @author 曾文彬
 * @since V1.0.0 2017-2-2
*/

define(['jquery'], function ($) {
  return function (referWidth) {
    var metaEle = null;

    if (!((metaEle = $('meta[name=viewport]')).size())) {
      metaEle = $('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />');
      $('head').prepend(metaEle);
    }

    var relative = referWidth / 100;
    $('html').css('fontSize', $(window).width() / relative);
  };
});
