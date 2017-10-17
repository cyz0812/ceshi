$(function(){
	//载入页面
	if(!!$('#aqi_type_id').val()){
		var aqi_id=$('#aqi_type_id').val();
		$('#aqi_'+aqi_id).css('border','1px solid #fff').css('background','#0379b5').css('color','#fff');
	}
	var each_rujin=parseInt($('#each_rujin').val());
	if($('#capitalType').val()=='dqihuo'){
		var each_peizi=parseInt($('#each_peizi').val());
	}else if($('#capitalType').val()=='shares'){
		var each_peizi=parseInt($('#each_peizi').val());
	}else if($('#capitalType').val()=='aqihuo'){
		var each_peizi=parseInt($('#each_peizi').val());
	}
	var num=1;
	var each_zongzijin=each_peizi+each_rujin;
	$('#rujin').html(each_rujin);
	$('#zongzijin').html(toLocale(each_zongzijin));
	qihuo_fn('#huodejin');
	if($('#capitalType').val()=='dqihuo'){
		$('#qiangpingxian').html((each_peizi*2/100));
	}else if($('#capitalType').val()=='shares'){
		$('#qiangpingxian').html((each_peizi/72000*1476));
	}else if($('#capitalType').val()=='aqihuo'){
		$('#qiangpingxian').html((each_peizi/100*3));
	}
	$('#qpx_rmb').html(($('#qiangpingxian').html()*7.2));
	
	/* 品种更换 */
	$('.qihuo_method ul').hover(function(){
		var num=$('.qihuo_method ul li').size();
		var height=num*32;
		$('.qihuo_method ul').stop().animate({height:height});
	},function(){
		$('.qihuo_method ul').stop().animate({height:30},function(){
		});
	})
	
	/* 配资 */
	
	$('#to_capital').click(function(){
		$(this).hide();
		$('#to_deposit').stop().animate({top:20,left:480,width:120,height:30,'font-size':16},function(){$('.prompt').hide();$('.peizi_capital').show().stop().animate({'opacity':1});$(this).css('color','#0379b5').css('background','#fff').html('入金不配资').hover(function(){$(this).css('color','#fff').css('background','#0379b5')},function(){$(this).css('color','#0379b5').css('background','#fff')})});
	})
	
	
	//点解切换标头
	$('.qihuo_method li a').click(function(){
		$('.qihuo_method li a').removeClass();
		$(this).addClass('active');
	})
	$('.qihuo_type li a').click(function(){
		$('.qihuo_type li a').removeClass();
		$(this).addClass('active');
	})
	
	//手数点击
	$('.qihuo_num ul li:not(.other_num)').click(function(){
		if($(this).attr('name')!='0'){
			$('.qihuo_num ul li').attr('name','1');
			$(this).attr('name','0');
			$('.qihuo_num_active').removeClass('qihuo_num_active');
			$(this).addClass('qihuo_num_active');
			$('#algorithm').hide();
			num=parseInt($(this).find('strong').html());
		}
		qihuo_fn('#huodejin');
	})
	
	//其他手数
	$('#other_num').click(function(){
		showOverlay();
		$('#input_num').show();
		$('#lots_num').select();
	})
	$('#input_num .input_num_close').click(function(){
		hideOverlay();
		$(input_num).hide();
	})
	
	$('#input_num_btn').click(function(){
		var other_num=parseInt($(lots_num).val());
		if(other_num>0 &&other_num<=100 ){
			num=other_num
			hideOverlay();
			$(input_num).hide();
			$('.qihuo_num ul li').attr('name','1');
			$('.other_num').attr('name','0');
			$('.qihuo_num_active').removeClass('qihuo_num_active');
			$('.other_num').addClass('qihuo_num_active');
			qihuo_fn('#huodejin');
		}else{
			$('#error_system').show();
			if($('#capitalType').val()=='shares'){
				$('#error_system_text').text('股数须在100-10000之间');
			}else{
				$('#error_system_text').text('手数须在1-100之间');
			}
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
		}
	})
	$('#lots_num').keydown(function(e){
		if(e.keyCode==13){
			$('#input_num_btn').click();
		}
	})
	//期货函数
	function qihuo_fn(show_id){
		var benjin=num*each_rujin;
		var huodejin=num*each_peizi;
		var qiangping=null;
		 
		if($('#capitalType').val()=='dqihuo'){
			if(huodejin<=100000){
				qiangping=Math.round(huodejin*2/100);
			}else if(huodejin>=100000&&huodejin<=500000){
				qiangping=Math.round(huodejin*3/100);
			}else{
				qiangping=Math.round(huodejin*4/100);
			}
			
		}else if($('#capitalType').val()=='shares'){
			var qiangping=Math.round(huodejin/10000*205);
		}else if($('#capitalType').val()=='aqihuo'){
			if(huodejin <= 200000){
				qiangping=Math.round(huodejin*3/100);
			}else if(huodejin > 200000 && huodejin <= 400000){
				qiangping=Math.round(huodejin*4/100);
			}else if(huodejin > 400000 && huodejin <= 500000){
				qiangping=Math.round(huodejin*5/100);
			}else if(huodejin > 500000 && huodejin <= 600000){
				qiangping=Math.round(huodejin*6/100);
			}else if(huodejin > 600000 && huodejin <= 700000){
				qiangping=Math.round(huodejin*7/100);
			}else if(huodejin > 700000 && huodejin <= 800000){
				qiangping=Math.round(huodejin*8/100);
			}else{
				qiangping=Math.round(huodejin*9/100);
			}
		}
		var peizi_num = huodejin.toString();
		var timer = setInterval(function(){move_num(show_id,peizi_num,timer)},10);
		$('#rujin').html(benjin);
		$('#benjin').html(benjin);
		$('#algorithm').html('='+huodejin*7.2+'元')
		$('#qiangpingxian').html((qiangping));
		$('#qpx_rmb').html((qiangping*7.2));
	}
	//动态数字
	var move_index=100;
	function move_num(show_id,max_mun,timer){
		if(move_index >= max_mun){
			$(show_id).html(toLocale(parseInt(max_mun)));
			$('#algorithm').show();
			move_index = 100;
			clearInterval(timer);
			return;
		}else{
			$(show_id).html(move_index);
			move_index+=move_index<1000?133:move_index<10000?1357:move_index<100000?13579:move_index<1000000?135797:move_index;
		}
		
	}
	
	
	
	//马上申请
	$('#gopay').click(function(){
		stopTime();
		if(!$('#username').html()){
			showOverlay();
			$('#need_login').show();
		}else if($("#jbp_contract_cbx").is(':checked')){
			showOverlay();
			var usercard=$('#usercard').val();
			if(usercard.length<16){
				$('#addcard_system').show();
				return false;
			}
			$('#error_system').hide();
			var confirm_money=parseInt(each_rujin*num);
			var confirm_total_money=(each_peizi*num+each_rujin*num);
			var balance=parseFloat($('#confirm_balance').html());
			var d_val=(balance-confirm_money).toFixed(2);
			var account=$('#account').val();
			if(account.length==6){
				$('.notempty_account').show();
				$('.empty_account').hide();
			}else{
				$('.notempty_account').hide();
				$('.empty_account').show();
			}
			$('#confirm_money').html(confirm_money);
			$('#peizi_expenses').val(confirm_money);
			$('.confirm_money').html(confirm_money);
			$('#confirm_peizi_money').html(each_peizi*num);
			$('#goodPrice').val(-d_val);
			$('#confirm_total_money').html(confirm_total_money);
			$('#confirm_hands').html(num);
			$('#dealconfirm').show();
			if(d_val>=0){
				$('.d_html').html('本次支付后,剩余<span class="red">'+toDecimal(d_val)+'</span>元');
				$('#select_bank_p').hide();
				$('#balance_enough_p').show();
				$('#confirm_btn').show();
				$('#confirm_recharge').hide();
			}else{
				$('.d_html').html('本次支付还差<span class="red">'+toDecimal(-d_val)+'</span>元');
				$('#select_bank_p').show();
				$('#balance_enough_p').hide();
				$('#confirm_btn').hide();
				$('#confirm_recharge').show();
			}
			
		}else{
			$('#error_system').show();
			if($('#capitalType').val()=='dqihuo'){
				$('#error_system_text').text('请先阅读并同意《国内期货合同》');
			}else if($('#capitalType').val()=='aqihuo'){
				$('#error_system_text').text('请先阅读并同意《国际期货合同》');
			}else if($('#capitalType').val()=='shares'){
				$('#error_system_text').text('请先阅读并同意《合作投资协议书》');
			}
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
		}
	})
	/* 银行卡绑定 */
	$('#addcard_bankcode').change(function(){
		var bankname=$("#addcard_bankcode option:selected").text();
		$('#bankname').val(bankname);
	})
	$('#addcard_btn').click(function(){
		var bankname=$.trim($('#bankname').val());
		var bankcode=$("#addcard_bankcode option:selected").val();
		var card=$.trim($('#card').val());
		var name=$.trim($('#idname').val());
		var idcard=$.trim($('#idcard').val());
		var cardprovince=$.trim($('#province').val());
		var cardcity=$.trim($('#city').val());
		var bankbranchname=$.trim($('#bankbranchname').val());
		var cardphone=$.trim($('#cardphone').val());
		$('#addcardform p input').css('border','1px solid #a9a9a9');
		if(bankname.length==0||card.length==0||name.length==0||idcard.length==0||cardprovince.length==0||cardcity.length==0||cardphone.length==0){
			error_info('带 ＊ 号内容不得为空！');
			return false;
		}
		if(!luhmCheck(card)){
			error_info('卡号格式错误！');
			$('#card').css('border','1px solid #f55');
			return false;
		}
		if(!IdentityCodeValid(idcard)){
			error_info('身份证格式错误！');
			$('#idcard').css('border','1px solid #f55');
			return false;
		}
		if(!/^[1]\d{10}$/.test(cardphone)){
			error_info('请输入正确的手机号！');
			$('#cardphone').css('border','1px solid #f55');
			return false;
		}
		$('#loading_img').show();
		showOverlay();
		$.ajax({
			type:'post',
			url:conUrl+'/addcard_success',
			data:{'bankname':bankname,'bankcode':bankcode,'card':card,'name':name,'idcard':idcard,'cardprovince':cardprovince,'cardcity':cardcity,'bankbranchname':bankbranchname,'cardphone':cardphone},
			success:function(arr){
				$('#addcard_system').hide();
				if(arr.flag==1){
					$('#usercard').val(card);
					setTimeout(function(){
						$('#loading_img').hide();
						$('#gopay').click();
					},500);
				}else{
					$('#loading_img').hide();
					hideOverlay();
					error_info('银行卡绑定失败，请重试或联系客服！');
				}
			}
		})
	})
	$('#cardphone').keydown(function(e){
		if(e.keyCode==13){
			$('#addcard_btn').click();
		}
	})
	
	$('.confirm_close').click(function(){
		$('.dealconfirm').hide();
		hideOverlay();
	})
	$('.tanchu_close').click(function(){
		$('.tanchu_system').hide();
		hideOverlay();
	})
	$('#confirm_recharge').click(function(){
		if($('#select_bank').val()==0){
			error_info('请选择充值银行');
			return false;
		}else{
			$('#overlay').css('z-index',10001);
			$('#recharge_yn').show();
			$('#pay_form').submit();
		}
	})
	
	$('#recharge_success').click(function(){
		$('#recharge_yn').hide();
		var out_orderid=$('#out_orderid').val();
		var userid=$('#userid').val();
		$.ajax({
			type:'POST',
			url:conUrl+'/has_record',
			data:{'out_orderid':out_orderid,'userid':userid},
			success:function(arr){
				if(arr.flag==1){
					$('.user_balance').html(arr.balance);
					$('#balance').val(arr.balance);
					$('#gopay').click();
					$('#overlay').css('z-index',999);
					$('#recharge_yn').hide();
				}else{
					$('#recharge_error').show();
					showOverlay();
				}
			}
		});
	})
	
	$('#bind_account').click(function(){
		upOverlay();
		$('#add_account').show();
	})
	
	$('#account_close').click(function(){
		downOverlay();
		$('#add_account').hide();
	})
	
	$('#account_btn').click(function(){
		var type=$.trim($('#capitalType').val());
		var account=$.trim($('#account_input').val());
		var account_password=$.trim($('#account_password_input').val());
		if(account.length==6 && account_password.length!=0){
			upOverlay(10003);
			$('#loading_img').show();
			$.ajax({
				type:'post',
				url:conUrl+'/add_account',
				data:{'account':account,'account_password':account_password,'type':type},
				success:function(arr){
					$('#loading_img').hide();
					downOverlay();
					if(arr.flag==1){
						$('#account').val(account);
						$('.account').html(account);
						$('#add_account').hide();
						$('#dealconfirm').hide();
						$('#gopay').click();
					}else if(arr.flag==0){
						$('#add_account').hide();
						error_info('账户绑定失败，请重试或联系客服！');
					}
				}
			})
		}else{
			error_info('账号或密码格式不正确');
		}
		
	});
	
	$('#confirm_btn').click(function(){
		var method='capital';
		var type_kind=$('#capitalType').val();
		var userid=$('#userid').val();
		var typename=$('#peizi_typename').val();
		var expenses=$('#peizi_expenses').val();
		if(parseInt($('#confirm_hands').html())){
			var hands=parseInt($('#confirm_hands').html());
			var allocation=parseInt($('#each_peizi').val())*hands;
		}else{
			var hands=null;
			var allocation=parseInt($('#each_peizi').val());
		}
		var transactionfees=$('#peizi_transactionfees').val();
		var name=$('#peizi_username').val();
		var account=$('#account').val();
		var account_pwd=$('#account_pwd').val();
		var out_orderid=$('#peizi_out_orderid').val();
		var flag=false;
		
		$('#loading_img').show();
		$('#overlay').css('z-index','10001');
		showOverlay();
		$.ajax({
			type:'POST',
			url:conUrl+'/withRecord',
			data:{
				"method":method,
				"out_orderid":out_orderid,
				"amount":expenses,
				"body":userid,
				"subject":'配资支付',
				"state":"处理中"
				},
			async:false,
			success:function(arr){
				if(arr.flag==1){
					flag=true;
				}else if(arr.flag==0){
					$('#loading_img').hide();
					$('#overlay').css('z-index','9999');
					hideOverlay();
					alert('支付错误，请重试！');
					location.reload();
				}
			}
		});
		if(flag){
			$.ajax({
				url:conUrl+"/capital_pay",
				type:'POST',
				data:{
					"capital_type":0,
					"type_kind":type_kind,
					"method":method,
					"userid":userid,
					"name":name,
					"out_orderid":out_orderid,
					"amount":expenses,
					"hands":hands,
					"allocation":allocation,
					"account":account,
					"account_password":account_pwd,
					"type":typename,
					"transaction_fees":transactionfees
					},
				success:function(data){
					if(data.flag==1){
						setTimeout(function(){location.href=conUrl+'/dealRecord';},1000);
					}else{
						$('#loading_img').hide();
						$('#overlay').css('z-index','9999');
						hideOverlay();
						$('#dealconfirm').hide();
						alert('支付数据更新有误，请联系客服！');
					}
				}
			});
			
		}
		
	})
	
	/* 入金 */
	$('#to_deposit').click(function(){
		$('#account_amount').val('');
		$('#put_amount_box').show();
		showOverlay();
		$('#account_amount').focus();
	})
	$('#account_amount_btn').click(function(){
		var confirm_money=$('#account_amount').val();
		if(changeMoney(confirm_money)){
			var confirm_total_money=confirm_money*7;
			var balance=parseFloat($('#balance').val());
			var d_val=balance-confirm_money;
			$('#deposit_confirm_money').html(confirm_money);
			$('#deposit_confirm_total_money').html(confirm_total_money);
			$('#deposit_dealconfirm').show();
			if(d_val>=0){
				$('.deposit_d_html').html('本次支付后,剩余<span class="red">'+toDecimal(d_val)+'</span>元');
				$('#deposit_confirm_btn').show();
				$('#deposit_confirm_recharge').hide();
			}else{
				$('.deposit_d_html').html('本次支付还差<span class="red">'+toDecimal(-d_val)+'</span>元');
				$('#deposit_confirm_btn').hide();
				$('#deposit_confirm_recharge').show();
			}
			$('#put_amount_box').hide();
			
		}
	})
	$('#deposit_confirm_btn').click(function(){
		var method='deposit';
		var typename=$('#peizi_typename').val();
		var userid=$('#userid').val();
		var expenses=$('#account_amount').val();
		var name=$('#peizi_username').val();
		var account=$('#account').val();
		var account_pwd=$('#account_pwd').val();
		var out_orderid=$('#peizi_out_orderid').val();
		var flag=false;
		$('#loading_img').show();
		$('#overlay').css('z-index','10001');
		showOverlay();
		$.ajax({
			type:'POST',
			url:conUrl+'/withRecord',
			data:{
				"method":method,
				"out_orderid":out_orderid,
				"amount":expenses,
				"body":userid,
				"subject":'入金支付',
				"state":"处理中"
				},
			async:false,
			success:function(arr){
				if(arr.flag==1){
					flag=true;
				}else if(arr.flag==0){
					$('#loading_img').hide();
					$('#overlay').css('z-index','9999');
					hideOverlay();
					alert('支付错误，请重试！');
					location.reload();
				}
			}
		});
		if(flag){
			$.ajax({
				url:conUrl+"/deposit_pay",
				type:'POST',
				data:{
					"capital_type":0,
					"userid":userid,
					"out_orderid":out_orderid,
					"method":method,
					"name":name,
					"amount":expenses,
					"account":account,
					"account_password":account_pwd,
					"type":typename
					},
				success:function(data){
					if(data.flag==1){
						setTimeout(function(){location.href=conUrl+'/dealRecord';},1000);
					}else{
						$('#loading_img').hide();
						$('#overlay').css('z-index','9999');
						hideOverlay();
						$('#dealconfirm').hide();
						alert('支付错误，请联系客服！');
					}
				}
			});
		}
		
	})
	$('#account_amount').keydown(function(e){
		if(e.keyCode==13){
			$('#account_amount_btn').click();
		}
	})
	$('.deposit_confirm_close').click(function(){
		$('#deposit_dealconfirm').hide();
		hideOverlay();
	})
	
	//点击协议
	$('#showDomesticContract').click(function(){
		windowOpen(conUrl+'/DomesticContract','国内期货合同',900,700);
	});
	$('#showInternationalContract').click(function(){
		windowOpen(conUrl+'/InternationalContract','国际期货合同',900,700);
	});
	$('#showSharesContract').click(function(){
		windowOpen(conUrl+'/SharesContract','股票配资合同',900,700);
	});
	//点击了解更多
	$('#show_other_type').click(function(){
		showOverlay();
		$('#other_type').show();
	})
	$('#other_type .other_type_close').click(function(){
		hideOverlay();
		$('#other_type').hide();
	})
	$('#other_type button').click(function(){
		hideOverlay();
		$('#other_type').hide();
	})
	
	$('#show_more').click(function(){
		showOverlay();
		$('#know_more').show();
	})
	$('#know_more img').click(function(){
		hideOverlay();
		$('#know_more').hide();
	})
	$('#know_more button').click(function(){
		hideOverlay();
		$('#know_more').hide();
	})
	
	$('body').keydown(function(e){
		if(e.keyCode==27){
			$('#other_type').hide();
			$('#know_more').hide();
			hideOverlay();
		}
	})
	
	/* public */
	//自动向上移动列表函数
	var move_top=0;
	var max_top = $('.move_list').height()-400;
	function list_fn(max){
		if(move_top>=max){
			move_top=-50;
		}
		move_top+=50;
		$('.move_list').animate({top:-move_top},500,'linear');
	}
	
	$('.nav_tab ul li').mouseenter(function(){
		$('.nav_tab ul li').removeClass('tab_active');
		$(this).addClass('tab_active');
	})
	
	$('.nav_tab ul .nav_tab_left').mouseenter(function(){
		$('.list_tab_left').show();
		$('.list_tab_right').hide();
	})
	$('.nav_tab ul .nav_tab_right').mouseenter(function(){
		$('.list_tab_right').show();
		$('.list_tab_left').hide();
	})
	
	//延迟执行自动向上移动列表
	var row_info_top= $('.scroll_list').offset().top+150;
	var row_flag = false;
	var list_timer=null;
	$(window).scroll(function(){
		if($(window).scrollTop()+$(window).height()>=row_info_top && row_flag==false){
			row_flag =true;
			if(!list_timer){
				list_timer=setInterval(function(){list_fn(max_top)},2500);
			}
			
			$('.move_list').hover(function(){
				stop_move();
			},function(){
				start_move();
			})
			$('.stop').hover(function(){
				stop_move();
			},function(){
				start_move();
			})
			
		}else if($(window).scrollTop()+window.innerHeight<row_info_top && row_flag==true){
			row_flag =false;
			if(list_timer){
				clearInterval(list_timer);
				list_timer=null
			}
			
		}
	})
	
	
	//点击回顶部
	$('.to_top').click(function(){
		move_top=0;
		$('.move_list').animate({top:-move_top},500);
		stop_move();	
	})
	//点击上一个
	$('.to_up').click(function(){
		move_top=move_top==0?max_top:move_top-50;
		$('.move_list').animate({top:-move_top},200);
		stop_move();	
	})
	//点击下一个
	$('.to_down').click(function(){
		move_top=move_top==max_top?0:move_top+50;
		$('.move_list').animate({top:-move_top},200);
		stop_move();	
	})
	
	
	
	//停止、开始列表移动函数
	function stop_move(){
		if(list_timer){
			clearInterval(list_timer);
			list_timer=null
		}
	}
	function start_move(){
		if(list_timer == null && row_flag==true){
			list_timer=setInterval(function(){list_fn(max_top)},500);
			setTimeout(function(){
				clearInterval(list_timer);
				list_timer=setInterval(function(){list_fn(max_top)},2500);
			},500)
		}
	}
	
})