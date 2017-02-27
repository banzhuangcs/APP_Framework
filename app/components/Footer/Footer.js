/**
 * @desc 头部组件
 * @author 吴彦祖
 * @since V1.0.0 2017-2-27
*/

define(['jquery', 'text!Footer.html'], function($, FooterTpl){
	return {
		render:function() {
			var css = '<link rel="stylesheet" type="text/css" href="./app/components/Footer/Footer.css">';
			var strHTML = '<div class="foot-toolbar">';
			strHTML += '<div class="foot-toolbar-inner">';
			strHTML += '<a href="#mainView" class="foot-tab-link active"><i class="ion ion-ios-home"></i><label>主页</label></a>';
			strHTML += '<a href="#subjectView" class="foot-tab-link"><i class="ion ion-star"></i><label>动态</label></a>';
			strHTML += '<a href="#caseView" class="foot-tab-link"><i class="ion ion-android-contacts"></i><label>好友</label></a>';
			strHTML += '<a href="#settingView" class="foot-tab-link"><i class="ion ion-android-person"><span class="badge">1</span></i><label>我的</label></a>';
			strHTML += '</div></div>';
			return css+strHTML;
		}
	}
});