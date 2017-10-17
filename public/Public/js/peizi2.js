$(function(){
	//载入页面
	if(!!$('#aqi_type_id').val()){
		var aqi_id=$('#aqi_type_id').val();
		$('#aqi_'+aqi_id).css('border','1px solid #0379b5').css('background','#0379b5').css('color','#fff');
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
	$('#huodejin').html(each_peizi);
	if($('#capitalType').val()=='dqihuo'){
		$('#qiangpingxian').html(toLocale(each_peizi*2/100));
	}else if($('#capitalType').val()=='shares'){
		$('#qiangpingxian').html(toLocale(each_peizi/72000*1476));
	}else if($('#capitalType').val()=='aqihuo'){
		$('#qiangpingxian').html(toLocale(each_peizi/10000*205));
	}
	
	/* 品种更换 */
	var method_num=0;
	$('.qihuo_method ul').click(function(){
		if(method_num++ %2 == 0){ 
			$('.qihuo_method ul .li_type img').attr('src',rootUrl+'/Public/img/drop_down.png');
			var num=$('.qihuo_method ul li').size();
			var height=num*32;
			$('.qihuo_method ul').stop().animate({height:height});
		}else{
			$('.qihuo_method ul').stop().animate({height:30},function(){
				$('.qihuo_method ul .li_type img').attr('src',rootUrl+'/Public/img/drop_up.png');
			});
		}
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
		qihuo_fn('#zongzijin');
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
			qihuo_fn('#zongzijin');
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
		var zongjin=benjin+huodejin;
		var qiangping=Math.round(benjin*0.6);
		if($('#capitalType').val()=='dqihuo'){
			if(huodejin<=100000){
				var qiangping=Math.round(huodejin*2/100);
			}else if(huodejin>=100000&&huodejin<=500000){
				var qiangping=Math.round(huodejin*3/100);
			}else{
				var qiangping=Math.round(huodejin*4/100);
			}
			
		}else if($('#capitalType').val()=='shares'){
			var qiangping=Math.round(huodejin/10000*205);
		}else if($('#capitalType').val()=='aqihuo'){
			var qiangping=Math.round(huodejin/10000*205);
		}
		var zong_num = zongjin.toString();
		var timer = setInterval(function(){move_num(show_id,zong_num,timer)},10);
		$('#rujin').html(benjin);
		$('#benjin').html(benjin);
		$('#huodejin').html(huodejin);
		$('#qiangpingxian').html(toLocale(qiangping));
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
			$('#error_system').hide();
			var confirm_money=each_rujin*num;
			var confirm_total_money=(each_peizi*num+each_rujin*num);
			var confirm_peizi_money=each_peizi*num;
			var balance=parseFloat($('#confirm_balance').html());
			var d_val=balance-confirm_money;
			$('#confirm_money').html(confirm_money);
			$('#aqihuoexpenses').val(confirm_money);
			$('#aqihuopayamount').val(confirm_money);
			$('.confirm_money').html(confirm_money);
			$('#confirm_total_money').html(confirm_total_money);
			$('#confirm_peizi_money').html(confirm_peizi_money);
			$('#confirm_hands').html(num);
			$('#dealconfirm').show();
			if(d_val>=0){
				$('.d_html').html('本次支付后,剩余<span class="red">'+toDecimal(d_val)+'</span>元');
				$('#confirm_btn').show();
				$('#confirm_recharge').hide();
			}else{
				$('.d_html').html('本次支付还差<span class="red">'+toDecimal(-d_val)+'</span>元');
				$('#confirm_btn').hide();
				$('#confirm_recharge').show();
			}
			showOverlay();
		}else{
			$('#error_system').show();
			if($('#capitalType').val()=='dqihuo'){
				$('#error_system_text').text('请先阅读并同意《国内期货合同》');
			}else if($('#capitalType').val()=='shares'){
				$('#error_system_text').text('请先阅读并同意《国际期货合同》');
			}else if($('#capitalType').val()=='aqihuo'){
				$('#error_system_text').text('请先阅读并同意《合作投资协议书》');
			}
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
		}
	})
	$('.confirm_close').click(function(){
		$('#dealconfirm').hide();
		hideOverlay();
	})
	$('.tanchu_close').click(function(){
		$('.tanchu_system').hide();
		hideOverlay();
	})
	$('#confirm_btn').click(function(){
		var method='capital';
		var type_kind=$('#capitalType').val();
		var userid=$('#aqihuouserid').val();
		var typename=$('#aqihuotypename').val();
		var expenses=$('#aqihuoexpenses').val();
		if(parseInt($('#confirm_hands').html())){
			var hands=parseInt($('#confirm_hands').html());
			var allocation=parseInt($('#each_peizi').val())*hands;
		}else{
			var hands=null;
			var allocation=parseInt($('#each_peizi').val());
		}
		var transactionfees=$('#aqihuotransactionfees').val();
		var name=$('#peizi_username').val();
		var account=$('#peizi_account').html();
		var account_pwd=$('#account_pwd').val();
		var out_orderid=$('#aqihuoout_orderid').val();
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
					"transaction_fees":transactionfees,
					},
				success:function(data){
					if(data.flag==1){
						$.ajax({
							type:'POST',
							url: rootUrl+'/master/demo/message_1send_demo.php',
							data:{
								"money":expenses,
								"account":account,
								"type":typename,
								"name":name,
								},
							success: function (data) {
								if(data.indexOf('success')>0){
									setTimeout(function(){location.href=conUrl+'/dealRecord';},1000);
								}else{
									alert('系统错误，请联系客服');
								}
							}
						});
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
	//点击协议
	$('#showDomesticContract').click(function(){
		windowOpen(conUrl+'/DomesticContract','国内期货合同',900,800);
	});
	$('#showInternationalContract').click(function(){
		windowOpen(conUrl+'/InternationalContract','国际期货合同',900,800);
	});
	$('#showSharesContract').click(function(){
		windowOpen(conUrl+'/SharesContract','股票配资合同',900,800);
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
	
	
	//居中窗口弹出方法
	function windowOpen(url,name,iWidth,iHeight) { 
		//获得窗口的垂直位置 
		var iTop = (window.screen.availHeight - 30 - iHeight) / 2; 
		//获得窗口的水平位置 
		var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; 
		window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=1,titlebar=no'); 
	}
	
	
})