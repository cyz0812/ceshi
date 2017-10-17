$(function(){

	
	// $(window).scroll(function(){
	// 	if($(document).scrollTop()>=100){
	// 		$('#header_nav').css('position','fixed').css('top',0);
    //
	// 	}else{
	// 		$('#header_nav').css('position','relative');
	// 	}
	// })
	
	$('#header_nav ul li').hover(function(){
		var height=$(this).find('.drop dd').size()*50;
		$(this).find('.drop').stop().animate({height:height});
	},function(){
		$(this).find('.drop').stop().animate({height:0});
	})
	
	/*if($('#username').html()){
		refreshOnTime();
		setInterval(refreshOnTime,10000);
		function refreshOnTime(){
			$.ajax({
				type:'POST',
				url:conUrl+'/refresh_message',
				data:{'time':10},
				success:function(data){
					if(data.count==0){
						$('#message_li').hide();
						$('.header_message').hide();
					}else{
						$('#message_li').show();
						$('.header_message').html(data.count);
						$('.header_message').show();
					}

				}
			});
		}
	}*/
	
	
	//友情链接
	$('.par_active').click(function(){
		$('.partner_right').hide();
		$('.partner_left').show();
		$('.par_link').css('border-bottom','none');
		$(this).css('border-bottom','5px solid rgb(255,92,90)');
	})
	$('.par_link').click(function(){
		$('.partner_left').hide();
		$('.partner_right').show();
		$('.par_active').css('border-bottom','none');
		$(this).css('border-bottom','5px solid rgb(255,92,90)');
	})
	
	/*//用户下拉菜单
	$('.user_nav_hover').hover(function(){
		$('.my_more_link').show();
		$('.user_nav_top').css('box-shadow','0px 0px 5px #bbb');
		$('.user_updown').css('background','url(img/up.png) no-repeat');
	},function(){
		$('.my_more_link').hide();
		$('.user_nav_top').css('box-shadow','none');
		$('.user_updown').css('background','url(img/down.png) no-repeat');
	})
	
	$('.my_more_link dd a').hover(function(){
		$(this).css('background','rgb(234,188,27)').css('color','#fff');
	},function(){
		$(this).css('background','#fff').css('color','#888');
	})*/
	
	
	//移动端点击显示菜单
	if($('#header').css('display')=='block'){
		$('#header .list').click(function(){
			if($('#list').css('display')=='none'){
				$('#list').show().stop().animate({
					'right': 0
				});
				/* $('.mt_content').animate({
					'right': '1rem'
				});
				$('#header').animate({
					'right': '1rem'
				}); */
			}else{
				$('#list').stop().animate({
					'right': '-1rem'
					},null,null,function(){
						$('#list').hide();
				});
				/* $('.mt_content').animate({
					'right': 0
				});
				$('#header').animate({
					'right': 0
				}); */
			}
		})
		$('.mt_content').click(function(){
			if($('#list').css('display')!='none'){
				$('#list').stop().animate({
					'right': '-1rem'
					},null,null,function(){
						$('#list').hide();
				});
				/* $('.mt_content').stop().animate({
					'right': 0
				}); */
			}
		})
		if($('.phone').css('display')!='none'){
			$('body').swipe({
				swipeRight:function(){
					if($('#list').css('display')!='none'){
						$('#list').stop().animate({
							'right': '-1rem'
							},null,null,function(){
								$('#list').hide();
						});
						/* $('.mt_content').stop().animate({
							'right': 0
						}); */
					}
				},threshold:30
			})
		}
	}

	/* 关于公司左侧 */
	
	
})
/* 显示遮罩层 */
function showOverlay() {
	$("#overlay").height(pageHeight());
	$("#overlay").width(pageWidth());

	// fadeTo第一个参数为速度，第二个为透明度
	// 多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
	$("#overlay").fadeTo(200, 0.8);
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
/* 遮罩层上移 */
function upOverlay(num){
	var index=!!num ? num : 10001;
	$('#overlay').css('z-index',index);
}
/* 遮罩层下移 */
function downOverlay(num){
	var index=!!num ? num : 10000;
	$('#overlay').css('z-index',index);
}
//错误信息函数
function error_info(info,id){
	$('#error_system').show();
	$('#error_system_text').text(info);
	setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
	if(id.length != 0){
		$(id).css('border','1px solid #f99');
	}
}
var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
        	21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
        	33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
        	42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
        	51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
        	63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
           };

IdentityCodeValid = function(card)
{
	//是否为空
	if(card === '')
	{
		return false;
	}
	//校验长度，类型
	if(isCardNo(card) === false)
	{
		return false;
	}
	//检查省份
	if(checkProvince(card) === false)
	{
		return false;
	}
	//校验生日
	if(checkBirthday(card) === false)
	{
		return false;
	}
	//检验位的检测
	if(checkParity(card) === false)
	{
		return false;
	}
	return true;
};


//检查号码是否符合规范，包括长度，类型
isCardNo = function(card)
{
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
	var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
	if(reg.test(card) === false)
	{
		return false;
	}

	return true;
};

//取身份证前两位,校验省份
checkProvince = function(card)
{
	var province = card.substr(0,2);
	if(vcity[province] == undefined)
	{
		return false;
	}
	return true;
};

//检查生日是否正确
checkBirthday = function(card)
{
	var len = card.length;
	//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
	if(len == '15')
	{
		var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/; 
		var arr_data = card.match(re_fifteen);
		var year = arr_data[2];
		var month = arr_data[3];
		var day = arr_data[4];
		var birthday = new Date('19'+year+'/'+month+'/'+day);
		return verifyBirthday('19'+year,month,day,birthday);
	}
	//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
	if(len == '18')
	{
		var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
		var arr_data = card.match(re_eighteen);
		var year = arr_data[2];
		var month = arr_data[3];
		var day = arr_data[4];
		var birthday = new Date(year+'/'+month+'/'+day);
		return verifyBirthday(year,month,day,birthday);
	}
	return false;
};

//校验日期
verifyBirthday = function(year,month,day,birthday)
{
	var now = new Date();
	var now_year = now.getFullYear();
	//年月日是否合理
	if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)
	{
		//判断年份的范围（3岁到100岁之间)
		var time = now_year - year;
		if(time >= 3 && time <= 100)
		{
			return true;
		}
		return false;
	}
	return false;
};

//校验位的检测
checkParity = function(card)
{
	//15位转18位
	card = changeFivteenToEighteen(card);
	var len = card.length;
	if(len == '18')
	{
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
		var cardTemp = 0, i, valnum; 
		for(i = 0; i < 17; i ++) 
		{ 
			cardTemp += card.substr(i, 1) * arrInt[i]; 
		} 
		valnum = arrCh[cardTemp % 11]; 
		if (valnum == card.substr(17, 1)) 
		{
			return true;
		}
		return false;
	}
	return false;
};

//15位转18位身份证号
changeFivteenToEighteen = function(card)
{
	if(card.length == '15')
	{
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
		var cardTemp = 0, i;   
		card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
		for(i = 0; i < 17; i ++) 
		{ 
			cardTemp += card.substr(i, 1) * arrInt[i]; 
		} 
		card += arrCh[cardTemp % 11]; 
		return card;
	}
	return card;
};

/* 银行卡效验函数 */
function luhmCheck(bankno){
	if (bankno.length < 16 || bankno.length > 19) {
		//$("#banknoInfo").html("银行卡号长度必须在16到19之间");
		return false;
	}
	var num = /^\d*$/;  //全数字
	if (!num.exec(bankno)) {
		//$("#banknoInfo").html("银行卡号必须全为数字");
		return false;
	}
	//开头6位
	var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";    
	if (strBin.indexOf(bankno.substring(0, 2))== -1) {
		//$("#banknoInfo").html("银行卡号开头6位不符合规范");
		return false;
	}
	var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

	var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
	var newArr=new Array();
	for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
		newArr.push(first15Num.substr(i,1));
	}
	var arrJiShu=new Array();  //奇数位*2的积 <9
	var arrJiShu2=new Array(); //奇数位*2的积 >9
	
	var arrOuShu=new Array();  //偶数位数组
	for(var j=0;j<newArr.length;j++){
		if((j+1)%2==1){//奇数位
			if(parseInt(newArr[j])*2<9)
			arrJiShu.push(parseInt(newArr[j])*2);
			else
			arrJiShu2.push(parseInt(newArr[j])*2);
		}
		else //偶数位
		arrOuShu.push(newArr[j]);
	}
	
	var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
	var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
	for(var h=0;h<arrJiShu2.length;h++){
		jishu_child1.push(parseInt(arrJiShu2[h])%10);
		jishu_child2.push(parseInt(arrJiShu2[h])/10);
	}        
	
	var sumJiShu=0; //奇数位*2 < 9 的数组之和
	var sumOuShu=0; //偶数位数组之和
	var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
	var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
	var sumTotal=0;
	for(var m=0;m<arrJiShu.length;m++){
		sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
	}
	
	for(var n=0;n<arrOuShu.length;n++){
		sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
	}
	
	for(var p=0;p<jishu_child1.length;p++){
		sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
		sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
	}      
	//计算总和
	sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
	
	//计算Luhm值
	var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
	var luhm= 10-k;
	
	if(lastNum==luhm){
	//$("#banknoInfo").html("Luhm验证通过");
	return true;
	}
	else{
	//$("#banknoInfo").html("银行卡号必须符合Luhm校验");
	return false;
	}        
}
//金额检测
function changeMoney(money){
	var pattern = '^-?[1-9]\\d*$|^-?0\\.\\d*$|^-?[1-9]\\d*\\.\\d*$';
	var regDot = /^(\d+\.\d{1,1}|\d+)$/;
	var reg = new RegExp(pattern, 'g');
	if(money == '全部出金' || money == '全部提现' || money == '全部'){
		return true;
	}else{
		if (!money || !reg.test(money)) {
			$('#error_system').show();
			$('#error_system_text').text('请输入正确的金额');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if (money < 500) {
			$('#error_system').show();
			$('#error_system_text').text("金额不能小于"+500+"元");
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if (!regDot.test(money)) {
			$('#error_system').show();
			$('#error_system_text').text('金额只能输入一位小数');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
	}
	return true;
}

function checkWithdraw(money){
	var pattern = '^-?[1-9]\\d*$|^-?0\\.\\d*$|^-?[1-9]\\d*\\.\\d*$';
	var regDot = /^(\d+\.\d{1,1}|\d+)$/;
	var reg = new RegExp(pattern, 'g');
	if(money == '全部出金' || money == '全部提现' || money == '全部'){
		return true;
	}else{
		if (!money || !reg.test(money)) {
			$('#error_system').show();
			$('#error_system_text').text('请输入正确的金额');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if (money < 500) {
			$('#error_system').show();
			$('#error_system_text').text("金额不能小于"+500+"元");
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if (!regDot.test(money)) {
			$('#error_system').show();
			$('#error_system_text').text('金额只能输入一位小数');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
	}
	return true;
}
/* 中、英文长度检测 */
length = function(str)   {  
	return str.replace(/[^\x00-\xff]/g,"aa").length; 
};
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
//居中窗口弹出方法
function windowOpen(url,name,iWidth,iHeight) { 
	//获得窗口的垂直位置 
	var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
	//获得窗口的水平位置 
	var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; 
	window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=1,titlebar=no'); 
}
//回车确定方法
function enter_fn(input,id){
	$(input).keydown(function(e){
		if(e.keyCode==13){
			$(id).click();
		}
	})
}