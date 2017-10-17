$(function(){
	if(!!$('#aqi_type_id').val()){
		var aqi_id=$('#aqi_type_id').val();
		$('#aqi_'+aqi_id).css('border','1px solid #0379b5').css('background','#0379b5').css('color','#fff');
	}
	/* 品种更换 */
	var method_num=0;
	$('.qihuo_method').click(function(){
		if(method_num++ %2 == 0){ 
			$('.qihuo_method .li_type img').attr('src',rootUrl+'/Public/img/drop_down.png');
			var num=$('.qihuo_method li').size();
			var height=num*32;
			$('.qihuo_method').stop().animate({height:height});
		}else{
			$('.qihuo_method').stop().animate({height:30},function(){
				$('.qihuo_method .li_type img').attr('src',rootUrl+'/Public/img/drop_up.png');
			});
		}
	})
	
	$('#deposit_btn').click(function(){
		$('#account_amount').val('');
		$('#put_amount_box').show();
		showOverlay();
	})
	$('#amount_btn').click(function(){
		var confirm_money=$('#deposit_amount').val();
		if(changeMoney(confirm_money)){
			var confirm_total_money=confirm_money*7;
			var balance=parseFloat($('#confirm_balance').html());
			var d_val=balance-confirm_money;
			$('#confirm_money').html(confirm_money);
			$('#confirm_total_money').html(confirm_total_money);
			$('#dealconfirm').show();
			showOverlay();
			if(d_val>=0){
				$('.d_html').html('本次支付后,剩余<span class="red">'+toDecimal(d_val)+'</span>元');
				$('#confirm_btn').show();
				$('#confirm_recharge').hide();
			}else{
				$('.d_html').html('本次支付还差<span class="red">'+toDecimal(-d_val)+'</span>元');
				$('#confirm_btn').hide();
				$('#confirm_recharge').show();
			}
			
		}
	})
	$('#confirm_btn').click(function(){
		var method='deposit';
		var userid=$('#userid').val();
		var expenses=$('#deposit_amount').val();
		var name=$('#deposit_userid').val();
		var account=$('#account').val();
		var account_pwd=$('#account_pwd').val();
		var out_orderid=$('#out_orderid').val();
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
				url:conUrl+"/capital_pay",
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
					"type":'账户入金',
					},
				success:function(data){
					if(data.flag==1){
						$.ajax({
							type:'POST',
							url: rootUrl+'/master/demo/deposit_success.php',
							data:{
								"phone":'18206068975',
								"money":expenses,
								"account":account,
								"name":name,
								},
							success: function (data) {
								if(data.indexOf('success')>0){
									setTimeout(function(){location.href=conUrl+'/dealRecord';},1000);
								}else{
									$('#dealconfirm').hide();
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
	$('#account_amount').keydown(function(e){
		if(e.keyCode==13){
			$('#account_amount_btn').click();
		}
	})
	$('.confirm_close').click(function(){
		$('#dealconfirm').hide();
		hideOverlay();
	})
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
			if (money < '0') {
				$('#error_system').show();
				$('#error_system_text').text("金额不能小于"+0+"元");
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
})