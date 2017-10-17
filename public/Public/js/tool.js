//本地化数字
function toLocale(n, m) {
	if (m == null || m == "") {
		m = 0;
	} 
	var str = n.toLocaleString();
	if(str.lastIndexOf(".")>0){
			if (m > 0) {
			str = str.substring(0, str.lastIndexOf(".") + 1 + m);
		} else {
			str = str.substring(0, str.lastIndexOf(".") + m);
		}
		return str; 
	}
	return str; 
}

/* 显示遮罩层 */
function showOverlay() {
	$("#overlay").height(pageHeight());
	$("#overlay").width(pageWidth());

	// fadeTo第一个参数为速度，第二个为透明度
	// 多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
	$("#overlay").fadeTo(200, 0.5);
}

/* 隐藏覆盖层 */
function hideOverlay() {
	$("#overlay").fadeOut(200);
}

/* 当前页面高度 */
function pageHeight() {
	return document.body.scrollHeight;
}

/* 当前页面宽度 */
function pageWidth() {
	return document.body.scrollWidth;
}
//检测输入金额
function changeMoney(money){
	var pattern = '^-?[1-9]\\d*$|^-?0\\.\\d*$|^-?[1-9]\\d*\\.\\d*$';
	var regDot = /^(\d+\.\d{1,1}|\d+)$/;
	var reg = new RegExp(pattern, 'g');
	if (!money || !reg.test(money)) {
		alert("请输入正确的充值金额", 1);
		return false;
	}
	if (money < '0') {
		alert("充值金额不能小于"+0+"元", 1);
		return false;
	}
	if (!regDot.test(money)) {
		alert("充值金额只能输入一位小数", 1);
		return false;
	}
	return true;
}

//强制保留2位小数
function toDecimal(x){
	var f = parseFloat(x);
	if (isNaN(f)) {
		return false;
	}
	var f = Math.round(x*100)/100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s;
}