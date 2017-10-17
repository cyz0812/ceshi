$(function(){
	
	$('#to_allscore').click(function(){
		$('.jump_block').hide();
		$('.remind').hide();
		$('.deposit').show();
		$('#deposit_form').show();
		$('.method_a').removeClass('method_active');
		$('.method_a').removeClass('mt_active');
		$(this).addClass('method_active');
	})
	$('#to_webllpay').click(function(){
		$('.jump_block').hide();
		$('.remind').hide();
		$('.webllpay').show();
		$('#webllpay_form').show();
		$('.method_a').removeClass('method_active');
		$('.method_a').removeClass('mt_active');
		$(this).addClass('method_active');
	})
	$('#to_zhifubao').click(function(){
		$('.jump_block').hide();
		$('.remind').hide();
		$('.zfb_deposit').show();
		$('#zfb_deposit').show();
		$('.method_a').removeClass('method_active');
		$('.method_a').removeClass('mt_active');
		$(this).addClass('method_active');
	})
	$('#to_weixin').click(function(){
		$('.jump_block').hide();
		$('.remind').hide();
		$('.weixin_deposit').show();
		$('#weixin_deposit').show();
		$('.method_a').removeClass('method_active');
		$('.method_a').removeClass('mt_active');
		$(this).addClass('method_active');
	})
	$('#to_withdraw').click(function(){
		var myDate = new Date();
		var time=myDate.getHours()*60+myDate.getMinutes();
		if(time>1110||time<510){
			alert('提款时间为：周一至周五，8:30-18:30');
			window.location.reload();
			return false;
		}
		$('.jump_block').hide();
		$('.remind').hide();
		$('.withdraw').show();
		$('#withdraw_form').show();
		$('.method_a').removeClass('method_active');
		$('.method_a').removeClass('mt_active');
		$(this).addClass('method_active');
	})
	$('#to_capital').click(function(){
		$('.jump_block').hide();
		$('.remind').hide();
		$('.capital').show();
		$('#capital_form').show();
		$('.method_a').removeClass('method_active');
		$('.method_a').removeClass('mt_active');
		$(this).addClass('method_active');
	})
	$('#to_prior').click(function(){
		$('.jump_block').hide();
		$('.remind').hide();
		$('.prior').show();
		$('#prior_form').show();
		$('.method_a').removeClass('method_active');
		$('.method_a').removeClass('mt_active');
		$(this).addClass('method_active');
	})
	
	$('.method_a').eq(0).click();
	
	$('#deposit_btn').click(function(){
		var name=$.trim($('#deposit_name').val());
		var account=$('#account').val();
		var phone=$.trim($('#deposit_phone').val());
		var card=$.trim($('#deposit_card').val());
		var bankname=$('#deposit_bankname').find("option:selected").text();
		var bink_bankname=$('#bink_bankname').val();
		var out_orderid=$('#deposit_out_orderid').val();
		var amount=$.trim($('#deposit_amonut').val());
		if(!$("#deposit_check").is(':checked')){
			alert('请先阅读并同意风险提示')
			return false;
		}
		if(bankname=='请选择'){
			alert('请选择银行')
			return false;
		}
		if(bink_bankname=='请选择'){
			alert('请选择出金绑定银行')
			return false;
		}
		if(phone.length!=4){
			alert('请输入四位手机尾号');
			return false;
		}
		if(luhmCheck(card)){
			if(name.length!=0){

				if(changeMoney(amount)){
					showOverlay();
					$.ajax({
						type:'POST',
						url:conUrl+'/jumpregister',
						data:{"name":name,"account":account,"phone":phone,"bankname":bankname,"card":card,"bink_bankname":bink_bankname},
						success:function(arr){
							if(arr.flag==1){
								$('#deposit_body').val(arr.body);
								$('#deposit_form').submit();
							}else if(arr.flag==0){
								alert('服务器繁忙，请重试！');
								window.location.reload();
							}
						}
					});
				}
			}else{
				alert('内容不得为空！');
				return false;
			}
		}else{
			alert('银行卡号格式错误');
			return false;
		}
	});
	
	$('.recharge_yn .success').click(function(){
		window.location.reload();
	})
	
	$('#reselect').click(function(){
		window.location.reload();
	})
	
	$("#deposit_amonut").keydown(function(e){
		if(e.keyCode==13){
			$('#deposit_btn').click();
		}
	})
	
	$('#webllpay_btn').click(function () {
		var out_orderid=$.trim($('#webllpay_order').val());
		var name=$.trim($('#webllpay_name').val());
		var account=$.trim($('#webllpay_account').val());
		var phone=$.trim($('#webllpay_phone').val());
		var amount=$.trim($('#webllpay_amount').val());
		var bink_bankname=$('#webllpay_bankname').find("option:selected").text();
		var card=$.trim($('#webllpay_card').val());
		if(!$("#webllpay_check").is(':checked')){
			alert('请先阅读并同意风险提示')
			return false;
		}
		if(name.length!=0 && amount.length!=0){
			if(bink_bankname=='请选择'){
				alert('请选择出金绑定银行')
				return false;
			}
			if(phone.length!=4){
				alert('请输入四位手机尾号');
				return false;
			}
			if((card)){

				if(changeMoney(amount)){
					$.ajax({
						type:'POST',
						url:conUrl+'/webllpay_pay',
						data:{
							"out_orderid":out_orderid,
							"type":'连连网银入金',
							"method":'deposit',
							"name":name,
							"account":account,
							"phone":phone,
							"amount":amount,
							"card":card,
							"bankname":bink_bankname
						},
						success:function(arr){
							if(arr.flag==1){
								$('#webllpay_form').submit();

							}else{
								alert('服务器繁忙，请重试！');
								window.location.reload();
							}
						}
					});
				}
			}else{
				alert('银行卡号格式错误');
				return false;
			}
		}else{
			alert('各项内容都必需填写');
		}

	})
	
	$('#zfb_deposit_next').click(function(){
		var name=$.trim($('#zfb_name').val());
		var account=$.trim($('#account').val());
		var nickname=$.trim($('#zfb_nickname').val());
		var phone=$.trim($('#zfb_phone').val());
		var amount=$.trim($('#zfb_amount').val());
		var zfb_bink_bankname=$('#zfb_bink_bankname').find("option:selected").text();
		var card=$.trim($('#zfb_card').val());
		if(!$("#zfb_deposit_check").is(':checked')){
			alert('请先阅读并同意风险提示')
			return false;
		}
		if(name.length!=0 && nickname.length!=0 && amount.length!=0){
			if(zfb_bink_bankname=='请选择'){
				alert('请选择出金绑定银行')
				return false;
			}
			if(phone.length!=4){
				alert('请输入四位手机尾号');
				return false;
			}
			if(luhmCheck(card)){
				if((amount)){
					$('#zfb_deposit').submit();
				}
			}else{
				alert('银行卡号格式错误');
				return false;
			}
		}else{
			alert('各项内容都必需填写');
		}
		
	})
	
	$('#zfb_amount').keydown(function(e){
		if(e.keyCode==13){
			$('#zfb_deposit_next').click();
		}
	})

	$('#confirm_btn').click(function(){
		var out_orderid=$('#out_orderid').val();
		var order_num=$('#order_num').val();
		var type='支付宝入金';
		var name=$.trim($('#ewm_name').val());
		var account=$.trim($('#account').val());
		var nickname_val=$.trim($('#ewm_nickname').val());
		var phone=$.trim($('#ewm_phone').val());
		var amount=$.trim($('#ewm_amount').val());
		var bankname=$('#ewm_bankname').val();
		var card=$.trim($('#ewm_card').val());
		var encrypt = new JSEncrypt();
		var publickey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBiYEk6LHMqqUm6WJCcSNfjlPZXPj/zHjmuVuU/QLE/yKqv2YEiPiGxaajZdBL4WUNRQxO4Dt4MDrjN43CsAzQj6OT/fDgroPERccBnwAZQr5FTR4GFfhxcoWxT/2nfmIVI7nHoJSeV7nHHwBBwagb4Z5EDrQDKr3vsumk9DY98wIDAQAB-----END PUBLIC KEY-----';
		encrypt.setPublicKey(publickey);
		var nickname=encrypt.encrypt(nickname_val);
		if(order_num.length!=6){
			alert('请填写后六位支付宝充值订单号');
			return false;
		}
		showOverlay();
		$('#loading_img').show();
		$.ajax({
			type:'POST',
			url:conUrl+'/erweima_success',
			data:{
				"out_orderid":out_orderid,
				"type":type,
				"method":'deposit',
				"name":name,
				"account":account,
				"phone":phone,
				"amount":amount,
				"card":card,
				"bankname":bankname,
				"order_num":order_num,
				"nickname":nickname
			},
			success:function(arr){
				$('#loading_img').hide();
				if(arr.flag==1){
					$('#confirm_success').show();
				}else{
					$('#confirm_error').show();
				}
			}
		});
	})
	
	
	$('#confirm_not').click(function(){
		$('#confirm_pay').hide();
		hideOverlay();
	})
	
	$('#weixin_deposit_next').click(function(){
		var out_orderid=$.trim($('#weixin_no_order').val());
		var name=$.trim($('#weixin_name').val());
		var account=$.trim($('#account').val());
		var phone=$.trim($('#weixin_phone').val());
		var amount=$.trim($('#weixin_amount').val());
		var bink_bankname=$('#weixin_bink_bankname').find("option:selected").text();
		var card=$.trim($('#weixin_card').val());
		if(!$("#weixin_deposit_check").is(':checked')){
			alert('请先阅读并同意风险提示')
			return false;
		}
		if(name.length!=0 && amount.length!=0){
			if(bink_bankname=='请选择'){
				alert('请选择出金绑定银行')
				return false;
			}
			if(phone.length!=4){
				alert('请输入四位手机尾号');
				return false;
			}
			if(luhmCheck(card)){

				if(changeMoney(amount)){
					$.ajax({
						type:'POST',
						url:conUrl+'/weixin_pay',
						data:{
							"out_orderid":out_orderid,
							"type":'微信入金',
							"method":'deposit',
							"name":name,
							"account":account,
							"phone":phone,
							"amount":amount,
							"card":card,
							"bankname":bink_bankname
						},
						success:function(arr){
							if(arr.flag==1){
								$('#weixin_deposit').submit();
							}else{
								alert('服务器繁忙，请重试！');
								window.location.reload();
							}
						}
					});
					
				}
			}else{
				alert('银行卡号格式错误');
				return false;
			}
		}else{
			alert('各项内容都必需填写');
		}
		
	})
	
	$('#weixin_amount').keydown(function(e){
		if(e.keyCode==13){
			$('#weixin_deposit_next').click();
		}
	})
	
	$('#weixin_confirm').click(function(){
		var out_orderid=$('#out_orderid').val();
		var ewm_order=$('#ewm_order').val();
		var order_num=$('#order_num').val();
		var type='微信入金';
		var name=$.trim($('#ewm_name').val());
		var account=$.trim($('#account').val());
		var phone=$.trim($('#ewm_phone').val());
		var amount=$.trim($('#ewm_amount').val());
		var bankname=$('#ewm_bankname').val();
		var card=$.trim($('#ewm_card').val());
		if(order_num.length==0){
			alert('请填写微信留言');
			return false;
		}
		showOverlay();
		$('#loading_img').show();
		$.ajax({
			type:'POST',
			url:conUrl+'/weixin_success',
			data:{
				"out_orderid":out_orderid,
				"order_num":order_num,
				"type":type,
				"method":'deposit',
				"name":name,
				"account":account,
				"phone":phone,
				"amount":amount,
				"card":card,
				"bankname":bankname
			},
			success:function(arr){
				$('#loading_img').hide();
				if(arr.flag==1){
					$('#confirm_success').show();
				}else{
					$('#confirm_error').show();
				}
			}
		});
	})
	
	
	$('#withdraw_btn').click(function(){
		var name=$.trim($('#withdraw_name').val());
		var phone=$.trim($('#withdraw_phone').val());
		var bankname=$("#withdraw_bankname option:selected").text();
		var bankbranchname=$.trim($('#bankbranchname').val());
		var card=$.trim($('#withdraw_card').val());
		var account=$('#account').val();
		var out_orderid=$('#withdraw_out_orderid').val();
		var amount=$.trim($('#withdraw_amonut').val());
		var province=$('#province').val();
		if(!$("#withdraw_check").is(':checked')){
			alert('请先阅读并同意风险提示')
			return false;
		}
		if(bankname=='请选择'){
			alert('请选择出金绑定银行')
			return false;
		}
		if(province=='请选择'){
			alert('请选择开户省份')
			return false;
		}
		if(phone.length!=4){
			alert('请输入四位手机尾号');
			return false;
		}
		if(name.length!=0 && card.length!=0 && amount.length!=0){
			if(bankbranchname!=0){
				if(luhmCheck(card)){

					if(wchangeMoney(amount)){
						showOverlay();
						$('#loading_img').show();
						$.ajax({
							type:'POST',
							url:conUrl+'/jumpwithdrawSuccess',
							data: $("#withdraw_form").serialize(),
							success:function(arr){
								if(arr.flag==1){
									$('#loading_img').hide();
									$('#withdraw_yes').show();
								}else if(arr.flag==0){
									alert('服务器繁忙，请重试或联系客服！');
									window.location.reload();
								}
							}
						});							
					}
				}else{
					alert('银行卡号格式错误！');
				}
			}else{
				alert('分行名称必须填写');
			}
		}else{
			alert('内容不得为空！');
			return false;
		}
	})
	
	$("#withdraw_amonut").keydown(function(e){
		if(e.keyCode==13){
			$('#withdraw_btn').click();
		}
	})
	
	/* 全部提现 */
	var last_money=null;
	$('#all').change(function(){
		if($(this).is(':checked')){
			last_money=$('#withdraw_amonut').val();
			$('#withdraw_amonut').attr('readOnly',true);
			$('#withdraw_amonut').css('background','#ccc');
			$('#withdraw_amonut').css('color','#ccc');
			$('#withdraw_amonut').val('全部');
		}else{
			$('#withdraw_amonut').val(last_money);
			$('#withdraw_amonut').attr('readOnly',false);
			$('#withdraw_amonut').css('background','#fff');
			$('#withdraw_amonut').css('color','#000');
		}
	})
	
	/* 品种选择 */
	var each_rujin=$('#each_rujin').val();
	var each_peizi=$('#each_peizi').val();
	var num=1;
	/* qihuo_fn('#peizi'); */
	$('#aqi_hsi').css('border','1px solid #0379b5').css('background','#0379b5').css('color','#fff');
	$('.qihuo_method a').click(function(){
		var type=$(this).attr('data');
		$.ajax({
			type:'post',
			url:conUrl+'/type_select',
			data:{'type':type},
			success:function(good){
				$('#type_select').hide();
				$('#capitalType').val('aqihuo');
				$('#aqi_type_id').val(good.type);
				var aqi_id=$('#aqi_type_id').val();
				$('.qihuo_type .qihuo_method a').css('border','1px solid #fff').css('background','#fff').css('color','#333');
				$('#aqi_'+aqi_id).css('border','1px solid #0379b5').css('background','#0379b5').css('color','#fff');
				$('.type_name').val(good.type_name);
				$('.type_name').html(good.type_name);
				each_rujin=good.each_rujin;
				each_peizi=good.each_peizi;
				$('#rujin').html(good.each_rujin);
				/* qihuo_fn('#peizi'); */
				
				$('.qihuo_method').stop().animate({height:25},'fast');
				$('.qihuo_method .li_type img').attr('src',rootUrl+'/Public/img/drop_up.png');
			}
		})
	})
	$('#capital_form .qihuo_type .qihuo_method li a').hover(function(){
		$(this).css('border','1px solid #0379b5');
	},function(){
		var aqi_id=$('#aqi_type_id').val();
		if($(this).attr('id')!='aqi_'+aqi_id){
			$(this).css('border','1px solid #fff');
		}
	});
	/* 品种更换 */
	var method_num=0;
	$('.qihuo_type .qihuo_method').click(function(){
		if(method_num++%2==0){
			var num=$('.qihuo_method li').size();
			var height=num*27;
			$('.qihuo_method .li_type img').attr('src',rootUrl+'/Public/img/drop_down.png');
			$('.qihuo_method').stop().animate({height:height});
		}else{
			$('.qihuo_method').stop().animate({height:25},function(){
				$('.qihuo_method .li_type img').attr('src',rootUrl+'/Public/img/drop_up.png');
			});
		}	
	})
	/* 国际配资 */
	//手数点击



    $('#other_num').keyup(function () {
    	if($('#other_num').val()<1){
         alert('填写数字须在1-100之间');
		}
        $('#expenses').val($('#other_num').val()*5000);
        $('#other_cash').html($('#other_num').val()*5000+'美元');
    })

	$('.qihuo_num div label:not(#other_num)').click(function(){

		if($(this).attr('name')!='0'){
			$('.qihuo_num div label ').attr('name','1');
			$(this).attr('name','0');
			num=parseInt($(this).find('input').val());
			$('#shoushu').html(num);
            $('#other_cash').html(0+'美元');
            $('#other_num').val('');
		}
		/* qihuo_fn('#peizi'); */

		$('#expenses').val(num);
		$('#confirm_cash').html(num);

	})
	//其他手数
	// $('#other_num').click(function(){
     //    var other_num=parseInt($(lots_num).val());
     //    if(other_num>0 &&other_num<=100 ){
     //        num=other_num
     //        hideOverlay();
     //        $(input_num).hide();
     //        $('.qihuo_num ul li').attr('name','1');
     //        $('.other_num').attr('name','0');
    //
	// 		/* qihuo_fn('#peizi'); */
     //        $('#expenses').val(num*5000);
     //        $('#confirm_cash').html(num*5000);
     //    }else{
     //        $('#error_system').show();
     //        $('#error_system_text').text('填写数字须在1-100之间');
	// 		/* if($('#capitalType').val()=='shares'){
	// 		 $('#error_system_text').text('股数须在100-10000之间');
	// 		 }else{
	// 		 $('#error_system_text').text('手数须在1-100之间');
	// 		 } */
     //        setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
     //    }
	// 	// showOverlay();
	// 	// $('#input_num').show();
	// 	// $('#lots_num').select();
	// })
	// $('#input_num .input_num_close').click(function(){
	// 	$(input_num).hide();
	// 	hideOverlay();
	// })
	// $('#lots_num').keyup(function(){
	// 	var money=$(this).val();
	// 	$('#confirm_capital').html(money*5000);
	// })
	// $('#input_num_btn').click(function(){
	// 	var other_num=parseInt($(lots_num).val());
	// 	if(other_num>0 &&other_num<=100 ){
	// 		num=other_num
	// 		hideOverlay();
	// 		$(input_num).hide();
	// 		$('.qihuo_num ul li').attr('name','1');
	// 		$('.other_num').attr('name','0');
    //
	// 		/* qihuo_fn('#peizi'); */
	// 		$('#expenses').val(num*5000);
	// 		$('#confirm_cash').html(num*5000);
	// 	}else{
	// 		$('#error_system').show();
	// 		$('#error_system_text').text('填写数字须在1-100之间');
	// 		/* if($('#capitalType').val()=='shares'){
	// 			$('#error_system_text').text('股数须在100-10000之间');
	// 		}else{
	// 			$('#error_system_text').text('手数须在1-100之间');
	// 		} */
	// 		setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
	// 	}
	// })
	$('#lots_num').keydown(function(e){
		if(e.keyCode==13){
			$('#input_num_btn').click();
		}
	})
	$('#add_prior').click(function(){
		var account=$('#account').val();
		var name=$.trim($('#deposit_name').val());
		var phone=$.trim($('#prior_phone').val());
		var amount=$.trim($('#expenses').val());
		var out_orderid='XDP'+$.trim($('#out_orderid').val());
		var type='增加优先';

		if(name.length!=0){
			showOverlay();
			$('#loading_img').show();
			$.ajax({
				type:'POST',
				url:conUrl+'/jumpprior',
				data:{"out_orderid":out_orderid,"name":name,"account":account,"phone":phone,"amount":amount,"type":type},
				success:function(arr){
					if(arr.flag==1){
						$('#loading_img').hide();
						$('#prior_yes').show();
					}else if(arr.flag==0){
						alert('服务器繁忙，请重试！');
						window.location.reload();
					}
				}
			});
		}
	})
	$('#dec_prior').click(function(){
		var account=$('#account').val();
        var name=$.trim($('#deposit_name').val());
		var phone=$.trim($('#prior_phone').val());
		var amount=$.trim($('#expenses').val());
		var out_orderid='XJP'+$.trim($('#out_orderid').val());
		var type='减少优先';

		if(name.length!=0){
			showOverlay();
			$('#loading_img').show();
			$.ajax({
				type:'POST',
				url:conUrl+'/jumpprior',
				data:{"out_orderid":out_orderid,"name":name,"account":account,"phone":phone,"amount":amount,"type":type},
				success:function(arr){
					if(arr.flag==1){
						$('#loading_img').hide();
						$('#prior_yes').show();
					}else if(arr.flag==0){
						alert('服务器繁忙，请重试！');
						window.location.reload();
					}
				}
			});
		}
	})
	
	$('#hands li').click(function(){
		$('#hands li').removeClass('active');
		$(this).addClass('active');
	})
	
	$('#add_hand').click(function(){
		var out_orderid='XAH'+$.trim($('#out_orderid').val());
		var account=$('#account').val();
		var contract=$("#contract input:checked").val();
		if(contract=='undefined'){
			alert('服务器繁忙，请重试');
			window.location.reload();
			return false;
		}
		var type=$("#contract input:checked").val()+"手数增加";
		var hands=$('#hands li.active').text();
		$.ajax({
			type:'POST',
			url:conUrl+'/jumphands',
			data:{"out_orderid":out_orderid,"account":account,"hands":hands,"type":type},
			success:function(arr){
				if(arr.flag==1){
					showOverlay();
					$('#hands_yes').show();
				}else if(arr.flag==0){
					alert('服务器繁忙，请重试！');
					window.location.reload();
				}
			}
		});
	})
	$('#dec_hand').click(function(){
		var out_orderid='XDH'+$.trim($('#out_orderid').val());
		var account=$('#account').val();
		var contract=$("#contract input:checked").val();
		if(contract=='undefined'){
			alert('服务器繁忙，请重试');
			window.location.reload();
			return false;
		}
		var type=$("#contract input:checked").val()+"手数减少";
		var hands=$('#hands li.active').text();
		$.ajax({
			type:'POST',
			url:conUrl+'/jumphands',
			data:{"out_orderid":out_orderid,"account":account,"hands":hands,"type":type},
			success:function(arr){
				if(arr.flag==1){
					showOverlay();
					$('#hands_yes').show();
				}else if(arr.flag==0){
					alert('服务器繁忙，请重试！');
					window.location.reload();
				}
			}
		});
	})
	//期货函数
	function qihuo_fn(show_id){
		var rujin=num*each_rujin;
		var peizi=num*each_peizi;
		var peizi_num = peizi.toString();
		var timer = setInterval(function(){move_num(show_id,peizi_num,timer)},10);
		$('#rujin').html(rujin);
		$('#expenses').val(rujin);
	}
	//动态数字
	var move_index=100;
	function move_num(id,max_mun,timefn){
		if(move_index >= max_mun){
			$(id).html(toLocale(parseInt(max_mun)));
			move_index = 100;
			clearInterval(timefn);
			return;
		}else{
			$(id).html(move_index);
			move_index+=move_index<1000?133:move_index<10000?1357:move_index<100000?13579:move_index<1000000?135797:move_index;
		}
		
	}
	
	
	
	/* 移动端 */
	$('#mt_deposit_btn').click(function(){
		var name=$('#mt_deposit_name').val();
		var phone=$('#mt_deposit_phone').val();
		var account=$('#account').val();
		var out_orderid=$('#deposit_out_orderid').val();
		var amount=$.trim($('#mt_deposit_amonut').val());
		if(name.length!=0){
			if(phone.length ==4 ){
				if(changeMoney(amount)){
					$.ajax({
						type:'POST',
						url:conUrl+'/jumpregister',
						data:{"name":name,"account":account},
						success:function(arr){
							if(arr.flag==1){
								$('#deposit_body').val(arr.body);
								$('#deposit').submit();
							}else if(arr.flag==0){
								alert('服务器繁忙，请重试！');
								alert(arr.info);
								window.location.reload();
							}
						}
					});
				}
			}else{
				alert('请输入四位手机尾号');
			}
		}else{
			alert('内容不得为空！');
			return false;
		}
	});
	
	$('#mt_withdraw_btn').click(function(){
		var name=$('#mt_withdraw_name').val();
		var phone=$('#mt_withdraw_phone').val();
		var bankname=$("#mt_withdraw_bankname option:selected").val();
		var card=$.trim($('#mt_withdraw_card').val());
		var account=$('#account').val();
		var out_orderid=$('#withdraw_out_orderid').val();
		var amount=$.trim($('#mt_withdraw_amonut').val());
		
		if(name.length!=0 && bankname.length!=0 && card.length!=0 && phone.length!=0 && amount.length!=0){
			if(phone.length==4 ){
				if(luhmCheck(card)){
					if(wchangeMoney(amount)){
						showOverlay();
						$('#loading_img').show();
						$.ajax({
							type:'POST',
							url:conUrl+'/jumpwithdrawSuccess',
							data: $("#withdraw").serialize(),
							success:function(arr){
								$('#loading_img').hide();
								if(arr.flag==1){
									$("#withdraw_yes").show();
								}else if(arr.flag==0){
									alert('服务器繁忙，请重试或联系客服！');
									window.location.reload();
								}
							}
						});
					}
				}else{
					alert('银行卡号格式错误！');
				}
			}else{
				alert('请输入四位手机尾号');
			}
		}else{
			alert('内容不得为空！');
			return false;
		}
	})
	$("#withdraw_amonut").keydown(function(e){
		if(e.keyCode==13){
			$('#withdraw_btn').click();
		}
	})
	
	$('#mt_all').change(function(){
		if($(this).is(':checked')){
			last_money=$('#mt_withdraw_amonut').val();
			$('#mt_withdraw_amonut').attr('readOnly',true);
			$('#mt_withdraw_amonut').css('background','#ccc');
			$('#mt_withdraw_amonut').css('color','#ccc');
			$('#mt_withdraw_amonut').val('全部');
		}else{  
			$('#mt_withdraw_amonut').val(last_money);
			$('#mt_withdraw_amonut').attr('readOnly',false);
			$('#mt_withdraw_amonut').css('background','#fff');
			$('#mt_withdraw_amonut').css('color','#000');
		}
	})
	
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
			alert("请输入正确的金额", 1);
			return false;
		}
		if (money < 500) {
			alert("入金金额不能小于"+500+"元", 1);
			return false;
		}
		if (money > 200000) {
			alert("入金金额不能大于20万元", 1);
			return false;
		}
		if (!regDot.test(money)) {
			alert("金额只能输入一位小数", 1);
			return false;
		}
		return true;
	}
	function wchangeMoney(money){
		var pattern = '^-?[1-9]\\d*$|^-?0\\.\\d*$|^-?[1-9]\\d*\\.\\d*$';
		var regDot = /^(\d+\.\d{1,1}|\d+)$/;
		var reg = new RegExp(pattern, 'g');
		if(money=='全部提现'||money=='全部'){
			return true;
		}else{
			if (!money || !reg.test(money)) {
				alert("请输入正确的金额", 1);
				return false;
			}
			if (money < 500) {
				alert("金额不能小于"+500+"元", 1);
				return false;
			}
			if (!regDot.test(money)) {
				alert("金额只能输入一位小数", 1);
				return false;
			}
			return true;
		}
		
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
	/* 身份证效验函数 */
	function IdentityCodeValid(code) { 
		var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
		var tip = "";
		var pass= true;
		
		if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
			tip = "身份证号格式错误";
			pass = false;
		}
		
	   else if(!city[code.substr(0,2)]){
			tip = "地址编码错误";
			pass = false;
		}
		else{
			//18位身份证需要验证最后一位校验位
			if(code.length == 18){
				code = code.split('');
				//∑(ai×Wi)(mod 11)
				//加权因子
				var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
				//校验位
				var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
				var sum = 0;
				var ai = 0;
				var wi = 0;
				for (var i = 0; i < 17; i++)
				{
					ai = code[i];
					wi = factor[i];
					sum += ai * wi;
				}
				var last = parity[sum % 11];
				if(parity[sum % 11] != code[17]){
					tip = "校验位错误";
					pass =false;
				}
			}
		}
		
		return pass;
	}
	
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
	
	/* $.ajax({
		type:'POST',
		url:conUrl+'/jumpWithdraw',
		data:{"out_orderid":out_orderid,"subject":'出金',"body":arr.body,"withdraw":amount,"account":account,"account_password":password},
		success:function(data){
			if(data.flag==1){
				alert('出金成功');
			}else{
				alert('出金失败');
			}
		} 
	}) */
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
	
})