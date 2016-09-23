'use strict';

var vm = new Vue({
	el : '#whole',
	data : {
		phoneNum : '', // 用户输入的手机号
		phoneNumNew : '', // 生产的比对手机号
		classNum : "软件工程01", // 选择的班级
		password : '', // 输入的密码
		passwordRepeat : '', // 输入的重复密码
		hardPecent : 0, // 密码强度
		hidding : 'none', // 手机号重复区块的可见性
		bgc : "#939393", // 密码重复区的背景色
	},
	methods : {
		inputPhoneNum: function () { // 编辑手机号时由oninput事件触发的方法，检查输入的长度，并生成新的重复手机号字符串
			if (this.phoneNum.length > 11) {
				this.phoneNumNew = '格式错误！';
			} else {
				var first = this.phoneNum.slice(0,3);// 0-2位 后面要空一格
				var sencend = this.phoneNum.slice(3,7);// 3-6位 后面要空一格
				var thrid = this.phoneNum.slice(7,11);// 剩下的部分
				this.phoneNumNew = first + ' '+ sencend + ' ' + thrid; // 生成重复手机号字符串
			}
		},
		check : function () { // 编辑手机号时onkeydown事件触发，检查输入，只允许数字;
			if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39)) {
				if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105))) {
					event.returnValue=false;
				}
			}
		},
		/*下面两个分别由聚焦事件和失焦事件触发，改变手机号重复字符串的可见性*/
		hideNum : function () {
			this.hidding = 'none';
		},
		showNum : function () {
			this.hidding = 'inline-block';
		},
		inputPass : function () { //编辑密码时由oninput事件触发，计算强度并移动强度指针
			var hard = 0,add = 0;
			for (var i = this.password.length - 1; i >= 1; i--) {
				add = Math.abs(this.password[i].charCodeAt()-this.password[i-1].charCodeAt());// 计算距离
				hard += add/2;
			}
			if (hard > 100) {
				hard = 100; //最右到达100%;
			}
			this.hardPecent = hard;
		},
		checkPass : function () { // 编辑重复密码时由oninput事件触发，校验重复密码
			for (var i = this.passwordRepeat.length - 1; i >= 0; i--) {
				if(this.passwordRepeat[i] !== this.password[i]) { //当重复密码不是密码的最前面一部分时
					this.bgc = '#E11AC7';// 改变背景色
					return;
				}
			}
			this.bgc = '#939393'; // 顺利通过检查 改回正常背景色
		}
	}
})