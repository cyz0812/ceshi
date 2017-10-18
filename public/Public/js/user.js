$(function(){
	//左侧选择
	if(!!user_active){
		$(user_active).addClass('active');
	}
	/* $('.user_left h3').click(function(){
		var sumWidth =0;
		$(this).parent().find("li").each(function(){
			sumWidth += $(this).height()+1;
		});
		if($(this).attr('name')=='1'){		
			$(this).attr('name','0');		
			$(this).parent().find('ul').animate({'height':0});			
		}else if($(this).attr('name')=='0'){
			$(this).attr('name','1');
			$(this).parent().find('ul').animate({'height':sumWidth});
		}
	}) */
	
	$('.user_left li').click(function(){
		$('.user_left li').removeClass('active');
		$(this).addClass('active');
	})
	//新充值
	
	var agent_type=$('#agent_type').val();
	$('#to_allscore').click(function(){
		$('.hide').hide();
		$('.allscore').show();
        $('.method_a').removeClass('method_active');
        $('.method_a').removeClass('mt_active');
        $(this).addClass('method_active');
        $('.jump_block').hide();
        $('.remind').hide();
        $('.deposit').show();
        $('#deposit_form').show();
		
	})
	$('#to_webllpay').click(function(){
		$('.jump_block').hide();
        $('.remind').hide();
		$('.hide').hide();
		$('.webllpay').show();
        $('.method_a').removeClass('method_active');
        $('.method_a').removeClass('mt_active');
        $(this).addClass('method_active');

	})
    $('#to_quick').click(function(){

        $('.allscore').hide();
        $('.jump_block').hide();
        $('.remind').hide();
        $('.webllpay').hide();
		$('.quick').show();
		$('.weixin').hide();
        $('.webllpay').eq(1).show();
		$('.method_a').removeClass('method_active');
        $('.method_a').removeClass('mt_active');
        $(this).addClass('method_active');

    })

	$('#to_zhifubao').click(function(){
        $('.jump_block').hide();
        $('.remind').hide();
        $('.zfb_deposit').show();
        $('#zfb_deposit').show();
		$('.hide').hide();
		$('.zhifubao').show();
        $('.method_a').removeClass('method_active');
        $('.method_a').removeClass('mt_active');
        $(this).addClass('method_active');
		
	})
	$('#to_weixin').click(function(){
        $('.jump_block').hide();
        $('.remind').hide();
        $('.weixin_deposit').show();
        $('#weixin_deposit').show();
		$('.hide').hide();
		$('.weixin').show();
        $('.method_a').removeClass('method_active');
        $('.method_a').removeClass('mt_active');
        $(this).addClass('method_active');
		
	})
	$('#to_refresh').click(function () {
        $('.method_a').removeClass('method_active');
        $('.method_a').removeClass('mt_active');
        $(this).addClass('method_active');
        window.location.reload();
    })
    $('#to_capital').addClass('method_active');
    $('.capital').show();
    $('.prior').hide();
	$('#to_capital').click(function () {
        $('.method_a').removeClass('method_active');
        $('.method_a').removeClass('mt_active');
        $(this).addClass('method_active');
        $('.qihuo_type').show();
        $('.qihuo_hands').show();
        $('.qihuo_num').hide();
        $('#add_hands').show();
        $('#dec_hands').show();
        $('#add_prior').hide();
        $('#dec_prior').hide();
        $('.capital').show();
        $('.prior').hide();
    })
    $('#add_prior').hide();
    $('#dec_prior').hide();
    $('.qihuo_num').hide();
    $('#to_prior').click(function () {
        $('.method_a').removeClass('method_active');
        $('.method_a').removeClass('mt_active');
        $(this).addClass('method_active');
        $('.qihuo_type').hide();
        $('.qihuo_hands').hide();
        $('.qihuo_num').show();
        $('#add_hands').hide();
        $('#dec_hands').hide();
        $('#add_prior').show();
        $('#dec_prior').show();
        $('.capital').hide();
        $('.prior').show();

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
    $('#add_prior').click(function(){
        var account=$('#account').val();
        var out_orderid='XDP'+$.trim($('#out_orderid').val());
        var type='增加优先';
        var type_kind=$('#agent_type').val();
		var amount=$.trim($('#expenses').val());
		showOverlay();
		$('#loading_img').show();
            $.ajax({
                type:'POST',
                url:conUrl+'/jumpprior',
                data:{'type_kind':type_kind,"out_orderid":out_orderid,"account":account,"amount":amount,"type":type},
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

    })
    $('#other_num').keyup(function () {
        if($('#other_num').val()<1){
            alert('填写数字须在1-100之间');
        }
        $('#expenses').val($('#other_num').val()*5000);
        $('#other_cash').html($('#other_num').val()*5000+'美元');
    })
    $('#dec_prior').click(function(){
        var account=$('#account').val();
        var out_orderid='XDP'+$.trim($('#out_orderid').val());
        var type='减少优先';
        var type_kind=$('#agent_type').val();
        var amount=$.trim($('#expenses').val());
        showOverlay();
        $('#loading_img').show();
		$.ajax({
                type:'POST',
                url:conUrl+'/jumpprior',
                data:{'type_kind':type_kind,"out_orderid":out_orderid,"account":account,"amount":amount,"type":type},
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

    })
	$('#hands li').click(function(){
		$('#hands li').removeClass('active');
		$(this).addClass('active');
	})
	$('#goodPrice').blur(function(){
		var capital_money=$(this).val();
		$('.amount').val(capital_money);
		if(agent_type=='aqihuo'){
			if(checkinvest(capital_money)){
				$('#contract label').css('color','#999');
				$('#contract label input').attr('disabled',true);
				if(capital_money<800){
					$('#hands li').css('display','none');
					$('#contract .low input').attr('disabled',false).attr('checked','selected').parent().css('color','#0379b5');
					$('.low').click();
				}else if(capital_money<2000){
					$('#contract .mhi input').attr('disabled',false).attr('checked','selected').parent().css('color','#0379b5');
					$('.mhi').click();
				}else if(capital_money<4000){
					$('#contract .mhi input').attr('disabled',false).parent().css('color','#0379b5');
					$('#contract .mdx input').attr('disabled',false).parent().css('color','#0379b5');
					$('.mdx').click();
				}else if(capital_money<8000){
					$('#contract .mhi input').attr('disabled',false).parent().css('color','#0379b5');
					$('#contract .mdx input').attr('disabled',false).parent().css('color','#0379b5');
					$('#contract .hsi input').attr('disabled',false).parent().css('color','#0379b5');
					$('.hsi').click();
				}else{
					$('#contract .mhi input').attr('disabled',false).parent().css('color','#0379b5');
					$('#contract .mdx input').attr('disabled',false).parent().css('color','#0379b5');
					$('#contract .hsi input').attr('disabled',false).parent().css('color','#0379b5');
					$('#contract .dax input').attr('disabled',false).parent().css('color','#0379b5');
					$('.dax').click();
				}
			}
		}
	})
	$('.mhi').click(function(){
		if($(this).find('input').attr('disabled')){
			return false;
		}
		var amount=$('#goodPrice').val();
		var index=Math.floor(amount/800);
		var size=$('#hands li').size();
		index=index>10?10:index;
		$('#hands li').eq(index-1).click();
		$('#hands li').css('display','inline-block');
		for(var i=0;i<=size;i++){
			if(i>index){
				$('#hands li').eq(i-1).css('display','none');
			}
		}
	})
	$('.mdx').click(function(){
		if($(this).find('input').attr('disabled')){
			return false;
		}
		var amount=$('#goodPrice').val();
		var index=Math.floor(amount/1600);
		var size=$('#hands li').size();
		index=index>10?10:index;
		$('#hands li').eq(index-1).click();
		$('#hands li').css('display','inline-block');
		for(var i=0;i<=size;i++){
			if(i>index){
				$('#hands li').eq(i-1).css('display','none');
			}
		}
	})
	$('.hsi').click(function(){
		if($(this).find('input').attr('disabled')){
			return false;
		}
		var amount=$('#goodPrice').val();
		var index=Math.floor(amount/4000);
		var size=$('#hands li').size();
		index=index>10?10:index;
		$('#hands li').eq(index-1).click();
		$('#hands li').css('display','inline-block');
		for(var i=0;i<=size;i++){
			if(i>index){
				$('#hands li').eq(i-1).css('display','none');
			}
		}
	})
	$('.dax').click(function(){
		if($(this).find('input').attr('disabled')){
			return false;
		}
		var amount=$('#goodPrice').val();
		var index=Math.floor(amount/8000);
		var size=$('#hands li').size();
		index=index>10?10:index;
		$('#hands li').eq(index-1).click();
		$('#hands li').css('display','inline-block');
		for(var i=0;i<=size;i++){
			if(i>index){
				$('#hands li').eq(i-1).css('display','none');
			}
		}
	})
	$('#gotoPay').click(function(){
		if(!!document.getElementById('jbp_contract_cbx')){
			if(!$("#jbp_contract_cbx").is(':checked')){
				error_info('请先阅读并同意《开户协议》');
				return false;
			}

		}
        if(!!document.getElementById('jbp_contract_cbx_s')){
            if(!$("#jbp_contract_cbx_s").is(':checked')){
                error_info('为确保您的资金安全，每次充值前请再次确认提款银行资料是否正确。');
                return false;
            }

        }
        if(!!document.getElementById('jbp_contract_cbx_ss')){
            if(!$("#jbp_contract_cbx_ss").is(':checked')){
                error_info('投资有风险，交易需谨慎，交易前请再次确认已阅读上面风险提示。');
                return false;
            }

        }
		var account=$('#account').val();
		if(account.length!=0){
			var method='deposit';
		}else{
			var method='open';
		}
		var contract=$("#contract input:checked").val();
		var amount=$('#goodPrice').val();
		var hands=$('#hands li.active').text();
		var out_orderid=$('#out_orderid').val();
		var subject=$('#subject').val();
		var userid=$('#userid').val();
		if(checkamount(amount)){
		$('#loading_img').show();
		showOverlay();
			$.ajax({
				type:'POST',
				url:conUrl+'/invest_record',
				data:{
					'out_orderid' : out_orderid,
					'method'	  : method,
					'type_kind'	  : agent_type,
					'account'	  : account,
					'contract'	  : contract,
					'amount'	  : amount,
					'hands'		  : hands,
					'subject'	  : subject,
					'body'	  	  : userid},
				success:function(data){
					if(data.flag==1){
						$('#allscore_form').submit();
					}else{
						alert('系统错误，请重试或联系客服！');
						window.location.reload();
					}
				}
			})
		}
	})
	//连连支付充值
	$('#webllpay_btn').click(function(){
		if(!!document.getElementById('jbp_contract_cbx')){
			if(!$("#jbp_contract_cbx").is(':checked')){
				error_info('请先阅读并同意《开户协议》');
				return false;
			}
		}
        if(!!document.getElementById('jbp_contract_cbx_s')){
            if(!$("#jbp_contract_cbx_s").is(':checked')){
                error_info('为确保您的资金安全，每次充值前请再次确认提款银行资料是否正确。');
                return false;
            }

        }
        if(!!document.getElementById('jbp_contract_cbx_ss')){
            if(!$("#jbp_contract_cbx_ss").is(':checked')){
                error_info('投资有风险，交易需谨慎，交易前请再次确认已阅读上面风险提示。');
                return false;
            }

        }
		var account=$('#account').val();
		if(account.length!=0){
			var method='deposit';
		}else{
			var method='open';
		}
		var contract=$("#contract input:checked").val();
		var amount=$('#goodPrice').val();
		var hands=$('#hands li.active').text();
		var out_orderid=$('#out_orderid').val();
		var subject=$('#subject').val();
		var userid=$('#userid').val();
		if((amount)){
		$('#loading_img').show();
		showOverlay();
			$.ajax({
				type:'POST',
				url:conUrl+'/webllpay_pay',
				data:{
					'out_orderid': out_orderid,
					'method'	  : method,
					'type_kind'	  : agent_type,
					'account'	  : account,
					'contract'	  : contract,
					'amount'	  : amount,
					'hands'		  : hands,
					'subject'	  : subject,
					'body'		  : userid},
				success:function(data){
					if(data.flag==1){
						$('#webllpay_form').submit();
					}else{
						alert('系统错误，请重试或联系客服！');
						window.location.reload();
					}
				}
			})
		}
	})
    $('#quick_btn').click(function(){
        if(!!document.getElementById('jbp_contract_cbx')){
            if(!$("#jbp_contract_cbx").is(':checked')){
                error_info('请先阅读并同意《开户协议》');
                return false;
            }
        }
        if(!!document.getElementById('jbp_contract_cbx_s')){
            if(!$("#jbp_contract_cbx_s").is(':checked')){
                error_info('为确保您的资金安全，每次充值前请再次确认提款银行资料是否正确。');
                return false;
            }

        }
        if(!!document.getElementById('jbp_contract_cbx_ss')){
            if(!$("#jbp_contract_cbx_ss").is(':checked')){
                error_info('投资有风险，交易需谨慎，交易前请再次确认已阅读上面风险提示。');
                return false;
            }

        }
        var account=$('#account').val();
        if(account.length!=0){
            var method='deposit';
        }else{
            var method='open';
        }
        var contract=$("#contract input:checked").val();
        var amount=$('#goodPrice').val();
        var hands=$('#hands li.active').text();
        var out_orderid=$('#out_orderid').val();
        var subject=$('#subject').val();
        var userid=$('#userid').val();
        if((amount)){
            $('#loading_img').show();
            showOverlay();
            $.ajax({
                type:'POST',
                url:conUrl+'/webllpay_quick',
                data:{
                    'out_orderid': out_orderid,
                    'method'	  : method,
                    'type_kind'	  : agent_type,
                    'account'	  : account,
                    'contract'	  : contract,
                    'amount'	  : amount,
                    'hands'		  : hands,
                    'subject'	  : subject,
                    'body'		  : userid},
                success:function(data){
                    if(data.flag==1){
                        $('#webllpays').submit();
                    }else{
                        alert('系统错误，请重试或联系客服！');
                        window.location.reload();
                    }
                }
            })
        }
    })
	//连连微信支付
	$('#weixin_btn').click(function(){
		if(!!document.getElementById('jbp_contract_cbx')){
			if(!$("#jbp_contract_cbx").is(':checked')){
				error_info('请先阅读并同意《开户协议》');
				return false;
			}
		}
        if(!!document.getElementById('jbp_contract_cbx_s')){
            if(!$("#jbp_contract_cbx_s").is(':checked')){
                error_info('为确保您的资金安全，每次充值前请再次确认提款银行资料是否正确。');
                return false;
            }

        }
        if(!!document.getElementById('jbp_contract_cbx_ss')){
            if(!$("#jbp_contract_cbx_ss").is(':checked')){
                error_info('投资有风险，交易需谨慎，交易前请再次确认已阅读上面风险提示。');
                return false;
            }

        }
		var account=$('#account').val();
		if(account.length!=0){
			var method='deposit';
		}else{
			var method='open';
		}
		var contract=$("#contract input:checked").val();
		var amount=$('#goodPrice').val();
		var hands=$('#hands li.active').text();
		var out_orderid=$('#out_orderid').val();
		var subject=$('#subject').val();
		var userid=$('#userid').val();
		if(checkamount(amount)){
			$('#loading_img').show();
			showOverlay();
			$.ajax({
				type:'POST',
				url:conUrl+'/weixin_pay',
				data:{
					'out_orderid' : out_orderid,
					'method'	  : method,
					'type_kind'	  : agent_type,
					'account'	  : account,
					'contract'	  : contract,
					'amount'	  : amount,
					'hands'		  : hands,
					'subject'	  : subject,
					'body'		  : userid},
				success:function(data){
					if(data.flag==1){
						$('#weixin_form').submit();
					}else{
						alert('系统错误，请重试或联系客服！');
						window.location.reload();
					}
				}
			})
		}
	})
	$('#zfb_next').click(function(){
		var amount=$('#goodPrice').val();
		var zfb_num=$('#zfb_num').val();
		if(!!document.getElementById('jbp_contract_cbx')){
			if(!$("#jbp_contract_cbx").is(':checked')){
				error_info('请先阅读并同意《开户协议》');
				return false;
			}
		}
        if(!!document.getElementById('jbp_contract_cbx_s')){
            if(!$("#jbp_contract_cbx_s").is(':checked')){
                error_info('为确保您的资金安全，每次充值前请再次确认提款银行资料是否正确。');
                return false;
            }

        }
        if(!!document.getElementById('jbp_contract_cbx_ss')){
            if(!$("#jbp_contract_cbx_ss").is(':checked')){
                error_info('投资有风险，交易需谨慎，交易前请再次确认已阅读上面风险提示。');
                return false;
            }

        }
		if(zfb_num.length==0){
			error_info('请填写支付宝账号');
			return false;
		}else if((amount)){
			$('#confirm_zfb .confirm_amount').text(amount);
			showOverlay();
			$('#confirm_zfb').show();
		}
	})
	$('#confirm_not').click(function(){
		hideOverlay();
		$('#confirm_zfb').hide();
	})
	$('#zfb_toPay').click(function(){
		var account=$('#account').val();
		if(account.length!=0){
			var method='deposit';
		}else{
			var method='open';
		}
		var contract=$("#contract input:checked").val();
		var amount=$('#goodPrice').val();
		var hands=$('#hands li.active').text();
		var out_orderid=$('#out_orderid').val();
		var subject=$('#subject').val();
		var userid=$('#userid').val();
		var zfb_num=$('#zfb_num').val();
		var order_num=$('#order_num').val();

		if(zfb_num.length==0){
			error_info('请填写支付宝账号');
			return false;
		}
		if(order_num.length != 6){
			error_info('请填写支付宝订单号后6位');
			return false;
		}

		if((amount)){
			$('#confirm_zfb').hide();
			$('#loading_img').show();
			showOverlay();
			$.ajax({
				type:'POST',
				url:conUrl+'/zfb_pay',
				data:{
					'out_orderid'   : out_orderid,
					'method'		: method,
					'type_kind'		: agent_type,
					'contract'		: contract,
					'account'		: account,
					'amount'		: amount,
					'hands'			: hands,
					'subject'		: subject,
					'body'			: userid,
					'nickname'		: zfb_num,
					'order_num'		: order_num},
				success:function(data){
					if(data.flag==1){
						$('#loading_img').hide();
						$('.recharge_yn').show();
					}else{
						alert('系统错误，请重试或联系客服！');
						 window.location.reload(); 
					}
				}
			})
		}
	})
    $('#zfb_toPay_agent').click(function(){
        var account=$('#account').val();
        if(account.length!=0){
            var method='deposit';
        }else{
            var method='open';
        }
        var contract=$("#contract input:checked").val();
        var amount=$('#goodPrice').val();
        var hands=$('#hands li.active').text();
        var out_orderid=$('#out_orderid').val();
        var subject=$('#subject').val();
        var userid=$('#userid').val();
        var zfb_num=$('#zfb_num').val();
        var order_num=$('#order_num_agent').val();

        if(zfb_num.length==0){
            error_info('请填写支付宝账号');
            return false;
        }
        if(order_num.length != 6){
            error_info('请填写支付宝订单号后6位');
            return false;
        }

        if((amount)){
            $('#confirm_zfb').hide();
            $('#loading_img').show();
            showOverlay();
            $.ajax({
                type:'POST',
                url:conUrl+'/zfb_pay',
                data:{
                    'out_orderid'   : out_orderid,
                    'method'		: method,
                    'type_kind'		: agent_type,
                    'contract'		: contract,
                    'account'		: account,
                    'amount'		: amount,
                    'hands'			: hands,
                    'subject'		: subject,
                    'body'			: userid,
                    'nickname'		: zfb_num,
                    'order_num'		: order_num},
                success:function(data){
                    if(data.flag==1){
                        $('#loading_img').hide();
                        $('.recharge_yn').show();
                    }else{
                        alert('系统错误，请重试或联系客服！');
                        window.location.reload();
                    }
                }
            })
        }
    })
	//调整手数
	$('#add_hands').click(function(){
		var account=$('#account').val();
		var out_orderid='XDP'+$.trim($('#out_orderid').val());
		var type='增加优先';
		var type_kind=$('#agent_type').val();
		var contract=$("#hand_contract input:checked").val();
		var hands=$('#hands li.active').text();
		showOverlay();
		$('#loading_img').show();
		$.ajax({
			type:'POST',
			url:conUrl+'/modify_hands',
			data:{
				"out_orderid"	: out_orderid,
				"account"		: account,
				"type"			: type,
				"type_kind"		: type_kind,
				"contract"		: contract,
				"hands"			: hands
				},
			success:function(arr){
				if(arr.flag==1){
					$('#loading_img').hide();
					$('#prior_yes').show();
				}else{
					alert('服务器繁忙，请重试！');
					window.location.reload();
				}
			}
		});
	})
	$('#dec_hands').click(function(){
		var account=$('#account').val();
		var out_orderid='XDP'+$.trim($('#out_orderid').val());
		var type='减少优先';
		var type_kind=$('#agent_type').val();
		var contract=$("#hand_contract input:checked").val();
		var hands=$('#hands li.active').text();
		showOverlay();
		$('#loading_img').show();
		$.ajax({
			type:'POST',
			url:conUrl+'/modify_hands',
			data:{
				"out_orderid"	: out_orderid,
				"account"		: account,
				"type"			: type,
				"type_kind"		: type_kind,
				"contract"		: contract,
				"hands"			: hands
				},
			success:function(arr){
				if(arr.flag==1){
					$('#loading_img').hide();
					$('#prior_yes').show();
				}else{
					alert('服务器繁忙，请重试！');
					window.location.reload();
				}
			}
		});
	})
	//点击协议
	$('#xieyi_dqihuo').click(function(){
		windowOpen(conUrl+'/DomesticContract','国内期货合同',900,700);
	});
	$('#xieyi_aqihuo').click(function(){
		windowOpen(conUrl+'/InternationalContract','国际期货合同',900,700);
	});
	$('#xieyi_shares').click(function(){
		windowOpen(conUrl+'/SharesContract','股票配资合同',900,700);
	});
	function checkamount(money){
		var pattern = '^-?[1-9]\\d*$|^-?0\\.\\d*$|^-?[1-9]\\d*\\.\\d*$';
		var regDot = /^(\d+\.\d{2,2}|\d+)$/;
		var reg = new RegExp(pattern, 'g');
		if (!money || !reg.test(money)) {
			$('#error_system').show();
			$('#error_system_text').text('请输入正确的金额');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if(agent_type=='aqihuo'){
			if (money < 50) {
				$('#error_system').show();
				$('#error_system_text').text("金额不能小于"+50+"元");
				setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
				return false;
			}
		}else if(agent_type='dqihuo'){
			if (money < 50) {
				$('#error_system').show();
				$('#error_system_text').text("金额不能小于"+50+"元");
				setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
				return false;
			}
		}
		
		if (money > 100000) {
			$('#error_system').show();
			$('#error_system_text').text("金额不能大于"+10+"万元");
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if (!regDot.test(money)) {
			$('#error_system').show();
			$('#error_system_text').text('金额只能输入两位小数');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		return true;
	}
	function checkinvest(money){
		var pattern = '^-?[1-9]\\d*$|^-?0\\.\\d*$|^-?[1-9]\\d*\\.\\d*$';
		var regDot = /^(\d+\.\d{2,2}|\d+)$/;
		var reg = new RegExp(pattern, 'g');
		if(money.length==0){
			return false;
		}
		if (!reg.test(money)) {
			$('#invest_money').select();
			$('#invest_money').css('border','1px solid #f55');
			$('#error_system').show();
			$('#error_system_text').text('请输入正确的金额');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if(agent_type=='aqihuo'){
			if (money < 50) {
				$('#invest_money').select();
				$('#invest_money').css('border','1px solid #f55');
				$('#error_system').show();
				$('#error_system_text').text("金额不能小于"+50+"元");
				setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
				return false;
			}
		}else if(agent_type=='dqihuo'){
			if (money < 50) {
				$('#invest_money').select();
				$('#invest_money').css('border','1px solid #f55');
				$('#error_system').show();
				$('#error_system_text').text("金额不能小于"+50+"元");
				setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
				return false;
			}
		}
		if (money > 100000) {
			$('#invest_money').select();
			$('#invest_money').css('border','1px solid #f55');
			$('#error_system').show();
			$('#error_system_text').text("金额不能大于"+10+"万元");
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if (!regDot.test(money)) {
			$('#invest_money').select();
			$('#invest_money').css('border','1px solid #f55');
			$('#error_system').show();
			$('#error_system_text').text('金额只能输入两位小数');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		return true;
	}
	//用户名修改
	$('.setname_sub').click(function(){
		var name=$('#setname .name_input').val();
		if(length(name)<2||length(name)>16){
			$('#error_info').show();
			$('#error_span').text('中文昵称需要在1-8位之间,英文昵称在2-16位之间！');
			return false;
		}else if(!/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(name)){
			$('#error_info').show();
			$('#error_span').text('昵称不得使用特殊符号！');
			return false;
		}else{
			$('#error_info').hide();
			$('#loading_img').show();
			showOverlay();
			$.ajax({
				type:'POST',
				url:conUrl+'/updatename',
				data:{'username':name},
				success:function(arr){
					if(arr.flag==1){
						$('#loading_img').hide();
						$('#setname_success').show();
					}else if(arr.flag==0){
						$('#loading_img').hide();
						hideOverlay();
						$('#error_info').show();
						$('#error_span').text('修改昵称失败，请重试或联系客服！');
					}else if(arr.flag==-1){
						$('#loading_img').hide();
						hideOverlay();
						$('#error_info').show();
						$('#error_span').text('昵称重复，请换个昵称试试');
					}
				}
			});
		}
	})
	//头像设置
	if(!!document.getElementById('myCan')){
		var canvas=document.getElementById('myCan');
		var ctx=canvas.getContext('2d');
	}
	var imgurl=rootUrl+'/Public/img/about.png';
	var $face_image = $('.img_container .face_img');
	//$face_image.attr('src', imgurl);
	$face_image.on("load", function() {        // 等待图片加载成功后，才进行图片的裁剪功能
		$face_image.cropper({
			aspectRatio:1/1
		});
	})
	$('#setface .file_input').change(function(){
		var file=this.files[0];
		var reader=new FileReader();
		reader.onload=function(){
			// 通过 reader.result 来访问生成的 DataURL
			var url=reader.result;
			$face_image.attr('src',url);
			$('.cropper-canvas > img').attr('src',url);
			$('.cropper-view-box > img').attr('src',url);
		};
		reader.readAsDataURL(file);
		function selectImage(file)
		{
			cropper.loadImage(file[0]);
		}
	});
	$('.face_cut').on("click", function() {
		var src = $face_image.eq(0).attr("src");
		var canvasdata = $face_image.cropper("getCanvasData");
		var cropBoxData = $face_image.cropper('getCropBoxData');
		convertToData(src, canvasdata, cropBoxData, function(basechar){
			console.log(basechar);
	        $(".cut_img").attr("src", basechar);
		})
	})
	$('.face_cut').click(function(){
		showOverlay();
		$('.cut_box').show();
	})
	$('.cut_box_close').click(function(){
		hideOverlay();
		$('.cut_box').hide();
	})
	$('.cut_sub').click(function(){
		hideOverlay();
		$('.cut_box').hide();
		var postUrl=conUrl+'/updataface'; 
		var can_data=canvas.toDataURL();
		can_data=can_data.split(',')[1];
		can_data=window.atob(can_data);
		var ia = new Uint8Array(can_data.length);
		for (var i = 0; i < can_data.length; i++) {
			ia[i] = can_data.charCodeAt(i);
		}
		var blob=new Blob([ia],{type:"image/png",endings:'transparent'});
		var fd=new FormData();
		fd.append('file',blob);
		$.ajax({
			url:postUrl,
			type:"POST",
			data:fd,
			async: false,  
			cache: false,  
			contentType: false,  
			processData: false,  
			success:function(arr){
				if(arr.flag==1){
					location.href='/personal/user/user';
				}else if(arr.flag==0){
					alert('修改头像失败，请重试');
					location.href=conUrl+'/setface';
				}
			}
		});
	})
	//手机号修改
	$('#getCode').click(function(){
		var phone=$('#phone_num').val();
		var getCode=$(this);
		var time=59;
		if(/^[1]\d{10}$/.test(phone)){
			getCode.css('cursor','default');
			getCode.css('color','#999');
			getCode.css('background','#eee');
			getCode.attr({ "disabled": "disabled" });
			$.ajax({
				url: rootUrl+"/master/demo/message_xsend_demo.php",
				type: 'post',
				data: {'phone': phone},
				success: function (data) {
					if(data.indexOf('success')){
						getCode.html("<p>60秒后</p><p>可重新发送</p>");
						var hander = setInterval(function () {
							if (time <= 0) {
								clearInterval(hander);
								getCode.css('cursor','pointer');
								getCode.css('color','#fff');
								getCode.css('background','#01c0dd')
								getCode.html("获取验证码");
								getCode.removeAttr("disabled");
							}
							else {
								getCode.css('cursor','default');
								getCode.css('color','#999');
								getCode.css('background','#eee');
								getCode.attr({ "disabled": "disabled" });
								getCode.html( "<p>"+ time + "秒后</p><p>可重新发送</p>");
								time--;
							}
						}, 1000);
					}else{
						alert('验证码发送失败，请联系客服');
					}
				}
			});
		}else{
			$('#error_info').show();
			$('#error_span').text('请输入正确的手机号！');
			return false;
		}
	})
	
	$('#setphone_next').click(function(){
		var code=$.trim($('#setphone_code').val());
		var phone=$.trim($('#phone_num').val());
		if(code.length!=6){
			$('#error_info').show();
			$('#error_span').text('请输入6位手机验证码！');
			return false
		}else{
			$('#error_info').hide();
			$('#loading_img').show();
			showOverlay();
			$.ajax({
				type:'POST',
				url:conUrl+'/is_setphone_code',
				data:{'code':code,'phone':phone},
				success:function(data){
					if(data.flag==1){
						location.href=conUrl+'/newphone';
					}else if(data.flag==0){
						$('#loading_img').hide();
						$('#error_info').show();
						$('#error_span').text('手机验证码错误！');
					}
				}
			});
		}
	})
	
	$('#newphone_btn').click(function(){
		var phone=$('#phone_num').val();
		var code=$('#newphone_code').val();
		var old_phone=$('#old_phone').val();
		if(!/^[1]\d{10}$/.test(phone)){
			$('#error_info').show();
			$('#error_span').text('请输入正确的手机号！');
			return false;
		}else if(phone==old_phone){
			$('#error_info').show();
			$('#error_span').text('新手机号不得与旧手机号相同！');
			return false;
		}else{
			$.ajax({
				type:'POST',
				url:conUrl+'/is_code',
				data:{'code':code,'phone':phone},
				success:function(data){
					if(data.flag==1){
						$('#error_info').hide();
						$('#loading_img').show();
						showOverlay();
						$.ajax({
							type:'POST',
							url:conUrl+'/updatenewphone',
							data:{'phone':phone,'code':code},
							success:function(arr){
								if(arr.flag==1){
									$('#loading_img').hide();
									$('#newphone_success').show();
								}else if(arr.flag==0){
									$('#loading_img').hide();
									$('#newphone_error').show();
								}else if(arr.flag==-1){
									hideOverlay();
									$('#loading_img').hide();
									$('#error_info').show();
									$('#error_span').text('该手机号已注册！');
								}
							}
						});
					}else if(data.flag==0){
						$('#error_info').show();
						$('#error_span').text('手机验证码错误！');
					}
				}
			});
		}
	})
	//登录密码修改
	$('#setpwd .setpwd_btn').click(function(){
		var window_width=$(window).width();
		var new_pwd=$('#setpwd .new_pwd').val();
		var old_pwd=$('#setpwd .old_pwd').val();
		var re_pwd=$('#setpwd .re_pwd').val();
		if(window_width>768)$('#setpwd input').css('border','1px solid #a9a9a9');
		if(old_pwd.length<6||old_pwd.length>20||new_pwd.length<6||new_pwd.length>20){
			$('#error_info').show();
			$('#error_span').text('密码需要在6-20位之间！');
			return false;
		}else{
			if(new_pwd!=re_pwd){
				$('#error_info').show();
				$('#error_span').text('两次密码输入不一致！');
				$('#setpwd .re_pwd').val('');
				if(window_width>768)$('#setpwd .re_pwd').css('border','1px solid #f55');
				return false;
			}else{
				$('#error_info').hide();
				$('#loading_img').show();
				showOverlay();
				$.ajax({
					type:'POST',
					url:conUrl+'/updatepwd',
					data:{'old_pwd':old_pwd,'new_pwd':new_pwd},
					success:function(arr){
						if(arr.flag==1){
							$('#loading_img').hide();
							$('#setpwd_success').show();
						}else if(arr.flag==0){
							$('#loading_img').hide();
							$('#setpwd_error').show();
						}else if(arr.flag==-1){
							hideOverlay();
							$('#loading_img').hide();
							$('#error_info').show();
							$('#error_span').text('原交易/登录密码错误！');
							$('#setpwd .old_pwd').val('');
							if(window_width>768)$('#setpwd .old_pwd').css('border','1px solid #f55');
						}
					}
				});
			}
		}
	})
	
	//交易密码修改
	$('#setpwd .dealpwd_btn').click(function(){
		var window_width=$(window).width();
		var login_pwd=$('#setpwd .login_pwd').val();
		var deal_pwd=$('#setpwd .deal_pwd').val();
		var new_deal=$('#setpwd .new_deal').val();
		var re_deal=$('#setpwd .re_deal').val();
		if(window_width>768)$('#setpwd .dealpwd_input').css('border','1px solid #a9a9a9');
		if($('#setpwd .old_pwd').val().length<6||$('#setpwd .old_pwd').val().length>20){
			$('#error_info').show();
			$('#error_span').text('原交易/登录密码需要在6-20位之间！');
			$('#setpwd .old_pwd').val('');
			if(window_width>768)$('#setpwd .old_pwd').css('border','1px solid #f55');
			return false;
		}else if(new_deal.length<6||new_deal.length>20){
			$('#error_info').show();
			$('#error_span').text('交易密码需要在6-20位之间！');
			$('#setpwd .new_deal').val('');
			$('#setpwd .re_deal').val('');
			if(window_width>768)$('#setpwd .new_deal').css('border','1px solid #f55');
			return false;
		}else if(new_deal!=re_deal){
			$('#error_info').show();
			$('#error_span').text('两次密码输入不一致！');
			$('#setpwd .re_deal').val('');
			if(window_width>768)$('#setpwd .re_deal').css('border','1px solid #f55');
			return false;
		}else{
			$('#error_info').hide();
			$('#loading_img').show();
			showOverlay();
			$.ajax({
				type:'POST',
				url:conUrl+'/updatedealpwd',
				data:{'login_pwd':login_pwd,'deal_pwd':deal_pwd,'new_deal':new_deal},
				success:function(arr){
					if(arr.flag==1){
						$('#loading_img').hide();
						$('#dealpwd_success').show();
					}else if(arr.flag==0){
						$('#loading_img').hide();
						$('#dealpwd_error').show();
					}else if(arr.flag==-1){
						hideOverlay();
						$('#loading_img').hide();
						$('#error_info').show();
						$('#error_span').text('原交易/登录密码错误！');
						$('#setpwd .old_pwd').val('');
						if(window_width>768)$('#setpwd .old_pwd').css('border','1px solid #f55');
					}
				}
			});
		}
	})
	$('#setpwd .dealpwd_input').keydown(function(e){
		if(e.keyCode==13){
			$('#setpwd .dealpwd_btn').click();
		}
	})

	/* 实名验证 */
	/* $('#verify_btn').click(function(){
		var name=$('#idname').val();
		var idcard=$('#idcard').val();
		if(name.length==0||idcard.length==0){
			alert('姓名和身份证号不得为空！')
			return false;
		}
		if(!IdentityCodeValid(idcard)){
			alert('身份证错误！');
			return false;
		}else{
			$('#loading_img').show();
			showOverlay();
			
			$.ajax({
				url:conUrl+'/verifyname',
				type:"POST",
				data:{"name":name,"idcard":idcard},
				success:function(arr){
					if(arr.flag==1){
						setTimeout(function(){
							$('#loading_img').hide();
							hideOverlay();
							alert('认证成功！');
							location.href=conUrl+'/user';
						},1000);
					}else if(arr.flag==0){
						alert('认证失败，请重新认证！');
						location.href=conUrl+'/verifyname';
					}
				}
			});
		}
	}) */
	
	/* 邮箱认证 */
	$('#email_btn').click(function(){
		var email=$('#email_input').val();
		var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(reg.test(email)){
			$('#error_info').hide();
			showOverlay();
			$('#loading_img').show();
			$.ajax({
				type:'post',
				url:conUrl+'/verifyemail',
				data:{'email':email},
				success:function(data){
					$('#loading_img').hide();
					if(data.indexOf('[status] => success')){
						$('#verifyemail_success').show();
					}else{
						$('#verifyemail_error').show();
					}
					
					
				}
			})
		}else{
			error_info('电子邮箱格式错误！');
		}
	})
	
	/* 银行卡绑定 */
	$('#addcard_bankcode').change(function(){
		var bankname=$("#addcard_bankcode option:selected").text();
		$('#bankname').val(bankname);
	})
	$('#addcard_btn').click(function(){
		var window_width=$(window).width();
		var bankname=$.trim($('#bankname').val());
		var bankcode=$("#addcard_bankcode option:selected").val();
		var card=$.trim($('#card').val());
		var name=$.trim($('#idname').val());
		var idcard=$.trim($('#idcard').val());
		var cardprovince=$.trim($('#province').val());
		var cardcity=$.trim($('#city').val());
		var bankbranchname=$.trim($('#bankbranchname').val());
		var cardphone=$.trim($('#cardphone').val());
        var strs=name.replace(/(^\s+)|(\s+$)/g, "");//去除前后的空格
        if (!strs.match(/^[\u4e00-\u9fa5]{2,4}$/)) {//我习惯用match
            error_info("只能输入2到4个汉字");
            return false;
        }
		if(window_width>768)$('#addcardform p input').css('border','1px solid #a9a9a9');
		if(bankname.length==0||card.length==0||name.length==0||idcard.length==0||cardprovince.length==0||cardcity.length==0||cardphone.length==0||bankbranchname.length==0){
			error_info('内容不得为空！');
			return false;
		}else if(!luhmCheck(card)){
			error_info('卡号格式错误！');
			if(window_width>768)$('#card').css('border','1px solid #f55');
			return false;
		}else if(!IdentityCodeValid(idcard)){
			error_info('身份证格式错误！');
			if(window_width>768)$('#idcard').css('border','1px solid #f55');
			return false;
		}else if(cardprovince == '请选择'){
			error_info('请选择开户省、市');
			return false;
		}else if(!/^[1]\d{10}$/.test(cardphone)){
			error_info('请输入正确的手机号！');
			if(window_width>768)$('#cardphone').css('border','1px solid #f55');
			return false;
		}else {
			$('#error_info').hide();
			$('#loading_img').show();
			showOverlay();
			$.ajax({
				type:'post',
				url:conUrl+'/addcard_success',
				data:{'bankname':bankname,'bankcode':bankcode,'card':card,'name':name,'idcard':idcard,'cardprovince':cardprovince,'cardcity':cardcity,'bankbranchname':bankbranchname,'cardphone':cardphone},
				success:function(arr){
					if(arr.flag==1){
						setTimeout(function(){
							$('#loading_img').hide();
							$('#addcard_success').show();
						},1000);
					}else{
						$('#loading_img').hide();
						hideOverlay();
						error_info('银行卡绑定失败，请重试或联系客服！');
					}
				}
			})
		}
	})
	$('#cardphone').keydown(function(e){
		if(e.keyCode==13){
			$('#addcard_btn').click();
		}
	})
	
	$('#show_bankbranchname').click(function(){
		showOverlay();
		$('#bankbranchname_box').show();
	})
	$('#bankbranchname_sub').click(function(){
		var bankbranchname=$.trim($('#bankbranchname_input').val());
		if(bankbranchname.length==0){
			alert('名称不得为空');
		}else{
			$.ajax({
			type:'post',
			url:conUrl+'/setcard',
			data:{'bankbranchname':bankbranchname},
			success:function(arr){
				if(arr.flag==1){
					location.href=conUrl+'/setcard';
				}else if(arr.flag==0){
					alert('支行名称填写失败，请重试或联系客服');
				}
			}
		})
		}
	})
	
	/* 期货账户 */
	
	$('#a_account_btn').click(function(){
		var a_account=$('#a_account').val();
		var a_account_password=$('#a_account_password').val();
		if(a_account.length != 6){
			$('#a_error_info').show();
			$('#a_error_span').text('输入的账号格式有误！');
			return false;
		}else if(a_account_password.length == 0 ){
			$('#a_error_info').show();
			$('#a_error_span').text('账号密码不得为空！');
			return false;
		}else{
			$('#a_error_info').hide();
			$('#loading_img').show();
			showOverlay();
			$.ajax({
				type:'post',
				url:conUrl+'/a_account',
				data:{'a_account':a_account,'a_account_password':a_account_password},
				success:function(arr){
					if(arr.flag==1){
						$('#loading_img').hide();
						$('#account_success').show();
					}else if(arr.flag==0){
						$('#loading_img').hide();
						hideOverlay();
						$('#error_info').show();
						$('#a_error_span').text('账户绑定失败，请重试或联系客服！');
					}
				}
			})
		}
	})
	
	$('#d_account_btn').click(function(){
		var d_account=$('#d_account').val();
		var d_account_password=$('#d_account_password').val();
		if(!d_account.length){
			$('#d_error_info').show();
			$('#d_error_span').text('账号不得为空！');
			return false;
		}else if(d_account_password.length == 0 ){
			$('#d_error_info').show();
			$('#d_error_span').text('密码不得为空！');
			return false;
		}else{
			$('#d_error_info').hide();
			$('#loading_img').show();
			showOverlay();
			$.ajax({
				type:'post',
				url:conUrl+'/d_account',
				data:{'d_account':d_account,'d_account_password':d_account_password},
				success:function(arr){
					if(arr.flag==1){
						$('#loading_img').hide();
						$('#account_success').show();
					}else if(arr.flag==0){
						$('#loading_img').hide();
						hideOverlay();
						$('#error_info').show();
						$('#d_error_span').text('账户绑定失败，请重试或联系客服！');
					}
				}
			})
		}
	})
	
	$('#s_account_btn').click(function(){
		var s_account=$('#s_account').val();
		var s_account_password=$('#s_account_password').val();
		if(!s_account.length){
			$('#s_error_info').show();
			$('#s_error_span').text('账号不得为空！');
			return false;
		}else if(s_account_password.length == 0 ){
			$('#s_error_info').show();
			$('#s_error_span').text('密码不得为空！');
			return false;
		}else{
			$('#s_error_info').hide();
			$('#loading_img').show();
			showOverlay();
			$.ajax({
				type:'post',
				url:conUrl+'/s_account',
				data:{'s_account':s_account,'s_account_password':s_account_password},
				success:function(arr){
					if(arr.flag==1){
						$('#loading_img').hide();
						$('#account_success').show();
					}else if(arr.flag==0){
						$('#loading_img').hide();
						hideOverlay();
						$('#error_info').show();
						$('#s_error_span').text('账户绑定失败，请重试或联系客服！');
					}
				}
			})
		}
	})
	
	$('#a_account_password').keydown(function(e){
		if(e.keyCode==13){
			$('#a_account_btn').click();
		}
	})
	$('#d_account_password').keydown(function(e){
		if(e.keyCode==13){
			$('#d_account_btn').click();
		}
	})
	$('#s_account_password').keydown(function(e){
		if(e.keyCode==13){
			$('#s_account_btn').click();
		}
	})
	
	$('.account_need_dealpwd').click(function(){
		showOverlay();
		$('#need_dealpwd_box').show();
	})
	
	$('#show_deal_pwd').click(function(){
		showOverlay();
		$('#put_deal_pwd_box').show();
	})
	
	$('#show_a_pwd').click(function(){
		showOverlay();
		$('#show_a_pwd_box').show();
	})
	$('#show_d_pwd').click(function(){
		showOverlay();
		$('#show_d_pwd_box').show();
	})
	$('#show_s_pwd').click(function(){
		showOverlay();
		$('#show_s_pwd_box').show();
	})
	$('#deal_pwd_sub').click(function(){
		var dealpwd=$('#account_deal_pwd').val();
		$.ajax({
			type:'POST',
			url:conUrl+'/is_dealpwd',
			data:{'dealpwd':dealpwd},
			success:function(arr){
				if(arr.flag==1){
					$('#account_deal_pwd').val('');
					$('#put_deal_pwd_box').hide();
					$('#show_deal_pwd_box').show();
				}else if(arr.flag==0){
					$('#error_system').css('z-index',10001);
					$('#error_system').show();
					$('#error_system_text').text('交易密码错误');
					setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
				}
			}
		})
		
	});
	$('#account_deal_pwd').keydown(function(e){
		if(e.keyCode==13){
			$('#deal_pwd_sub').click();
		}
	})
	$('.tanchu_close').click(function(){
		$('.tanchu_system').hide();
		hideOverlay();
	})
	
	
	/* $('#deposit_btn').click(function(){
		$('#account_amount').val('');
		$('#put_amount_box').show();
		showOverlay();
	})
	$('#account_amount_btn').click(function(){
		var confirm_money=$('#account_amount').val();
		if(changeMoney(confirm_money)){
			var confirm_total_money=confirm_money*7;
			var balance=parseFloat($('#confirm_balance').html());
			var d_val=balance-confirm_money;
			$('#confirm_money').html(confirm_money);
			$('#confirm_total_money').html(confirm_total_money);
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
			$('#put_amount_box').hide();
			
		}
	})
	$('#confirm_btn').click(function(){
		var userid=$('#account_userid').val();
		var expenses=$('#account_expenses').val();
		var phone=$('#account_phone').val();
		var name=$('#account_name').val();
		var idcard=$('#account_idcard').val();
		var account=$('#account_account').val();
		var out_orderid=$('#account_out_orderid').val();
		var flag=false;
		
		$('.loading').show();
		$('#overlay').css('z-index','10001');
		showOverlay();
		
		$.ajax({
			type:'POST',
			url:conUrl+'/withRecord',
			data:{
				"method":'1',
				"out_orderid":out_orderid,
				"expenses":expenses,
				"body":userid,
				"subject":'资金支付',
				"state":"处理中"
				},
			async:false,
			success:function(arr){
				if(arr.flag==1){
					flag=true;
				}else if(arr.flag==0){
					$('.loading').hide();
					$('#overlay').css('z-index','9999');
					hideOverlay();
					alert('支付错误，请重试！');
					location.href=conUrl+"/aqihuo";
				}
			}
		});
		if(flag){
			$.ajax({
				url:conUrl+"/aqihuo_pay",
				type:'POST',
				data:{
					"capital_type":0,
					"userid":userid,
					"out_orderid":out_orderid,
					"method":1,
					"amount":expenses,
					"account":account,
					"type":'账户入金',
					"transaction_fees":'不变',
					"phone":phone,
					"name":name,
					"idcard":idcard,
					"state":0,
					"complete":0
					},
				async:false,
				success:function(data){
					if(data.flag==1){
						setTimeout(function(){location.href=conUrl+'/download';},2000);
					}else{
						alert(data.flag);
						$('.loading').hide();
						$('#overlay').css('z-index','9999');
						hideOverlay();
						$('#dealconfirm').hide();
						alert('支付数据更新有误，请联系客服！');
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
	}) */
	
	/* 出金 */
	/* if(user_active == '.change_amount'){
		var card=$('#usercard').val();
		if(card.length<16){
			$('#need_card').show();
			showOverlay();
		}else if(deal_pwd!='true'){
			$('#need_dealpwd').show();
			showOverlay();
		}
		
	} */
	/* 全部选择 */
	var last_money=null;
	$('#withdraw_all').change(function(){
		if($(this).is(':checked')){
			last_money=$('#webwithdraw_payamount').val();
			$('#webwithdraw_payamount').attr('readOnly',true);
			$('#webwithdraw_payamount').css('background','#eee');
			$('#webwithdraw_payamount').css('color','#eee');
			$('#webwithdraw_payamount').val('全部');
		}else{
			$('#webwithdraw_payamount').val(last_money);
			$('#webwithdraw_payamount').attr('readOnly',false);
			$('#webwithdraw_payamount').css('background','#fff');
			$('#webwithdraw_payamount').css('color','#000');
		}
	})
	$('#mt_all').change(function(){
		if($(this).is(':checked')){
			last_money=$('#mt_withdrawal_payamount').val();
			$('#mt_withdrawal_payamount').attr('readOnly',true);
			$('#mt_withdrawal_payamount').css('background','#f0f0f0');
			$('#mt_withdrawal_payamount').css('color','#f0f0f0');
			$('#mt_withdrawal_payamount').val('全部');
		}else{
			$('#mt_withdrawal_payamount').val(last_money);
			$('#mt_withdrawal_payamount').attr('readOnly',false);
			$('#mt_withdrawal_payamount').css('background','#fff');
			$('#mt_withdrawal_payamount').css('color','#000');
		}
	})
	
	
	$('#webwithdraw_btn').click(function(){
		var out_orderid = $('#without_orderid').val();
		var method      = 'withdraw';
		var userid      = $('#withuserid').val();
		var type_kind   = $('#type_kind').val();
		var account     = $('#withdraw_account').html();
		var login_pass  = $('#login_pass').val();
		var amount      = $.trim($('#webwithdraw_payamount').val());
		if(checkWithdraw(amount)){
			$('#loading_img').show();
			showOverlay();
			$.ajax({
				type:'POST',
				url:conUrl+'/webWithdraw_pay',
				data:{"out_orderid":out_orderid,"method":method,"body":userid,"amount":amount,"account":account,"type_kind":type_kind},
				success:function(arr){
					if(arr['flag']==1){
						$('#loading_img').hide();
						$('#webwithdraw_yes').show();
					}else{
						alert('服务器繁忙，请重试或联系客服！');
						location.href=conUrl+'/webWithdraw';
					}
				}
			});
		}
	})
	$("#webwithdraw_payamount").keydown(function(e){
		if(e.keyCode==13){
			$('#webwithdraw_btn').click();
		}
	})
	
	$('#mt_webwithdraw_btn').click(function(){
		var dealpwd=$('#mt_withdrawa_dealpwd').val(); 
		
		var out_orderid=$('#without_orderid').val();
		var userid=$('#withuserid').val();
		var type_kind=$('#type_kind').val();
		var account=$('#withdraw_account').html();
		var account_password=$('#mt_account_pwd').val();
		var login_pass=$('#login_pass').val();
		var amount=$.trim($('#mt_withdrawal_payamount').val());
		if(account_password != login_pass){
			$('#error_system').show();
			$('#error_system_text').text('账户密码错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		var flag=false;
		if(changeMoney(amount)){
			$.ajax({
				type:'POST',
				url:conUrl+'/is_dealpwd',
				data:{"dealpwd":dealpwd},
				async:false,
				success:function(arr){
					if(arr.flag==0){
						$('#error_system').show();
						$('#error_system_text').text('交易密码错误');
						setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
					}else if(arr.flag==1){
						flag=true;
					}
				}
			});
			
			if(flag){
				$('#loading_img').show();
				showOverlay();
				$.ajax({
					type:'POST',
					url:conUrl+'/webWithdraw_pay',
					data:{"out_orderid":out_orderid,"body":userid,"amount":amount,"account":account,"account_password":account_password,"type_kind":type_kind},
					success:function(arr){
						if(arr.indexOf('[status] => success')){
							$('#loading_img').hide();
							$('#webwithdraw_yes').show();
						}else{
							alert('服务器繁忙，请重试或联系客服！');
							location.href=conUrl+'/webWithdraw';
						}
					}
				});
			}
		}
	})
	
	/* 期转商 */
	$('#transform_all').change(function(){
		if($(this).is(':checked')){
			last_money=$('#transform_payamount').val();
			$('#transform_payamount').attr('readOnly',true);
			$('#transform_payamount').css('background','#ddd');
			$('#transform_payamount').css('color','#ddd');
			$('#transform_payamount').val('全部');
		}else{
			$('#transform_payamount').val(last_money);
			$('#transform_payamount').attr('readOnly',false);
			$('#transform_payamount').css('background','#fff');
			$('#transform_payamount').css('color','#000');
		}
	})
	$('#transform_btn').click(function(){
		stopTime();
		var method='transform';
		var dealpwd=$('#transform_dealpwd').val(); 
		var out_orderid=$('#transform_orderid').val();
		var type_kind=$('#type_kind').val();
		var userid=$('#transformuserid').val();
		var amount=$.trim($('#transform_payamount').val());
		var account=$.trim($('#transform_account').html());
		var account_password=$.trim($('#account_pwd').val());
		var login_pass=$.trim($('#login_pass').val());
		if(account_password != login_pass){
			$('#error_system').show();
			$('#error_system_text').text('账户密码错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		var flag=false;
        if(changeMoney(amount)){
			
			$.ajax({
				type:'POST',
				url:conUrl+'/is_dealpwd',
				data:{"dealpwd":dealpwd},
				async:false,
				success:function(arr){
					if(arr.flag==0){
						$('#error_system').show();
						$('#error_system_text').text('交易密码错误');
						setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
					}else if(arr.flag==1){
						flag=true;
					}
				}
			});
			
			if(flag){
				$('#loading_img').show();
				showOverlay();
				$.ajax({
					type:'POST',
					url:conUrl+'/transform_pay',
					data:{"out_orderid":out_orderid,"body":userid,"amount":amount,"account":account,"account_password":account_password,"type_kind":type_kind},
					success:function(arr){
						$('#loading_img').hide();
						if(arr.indexOf('[status] => success')){	
							$('#transform_yes').show();
						}else{
							alert('出金至余额错误，请重试或联系客服！');
							location.href=conUrl+'/transform';
						}
					}
				});
			}
		}
	})
	$("#transform_dealpwd").keydown(function(e){
		if(e.keyCode==13){
			$('#transform_btn').click();
		}
	})
	$('#mt_transform_btn').click(function(){
		stopTime();
		var method='transform';
		var dealpwd=$('#mt_transform_dealpwd').val(); 
		var out_orderid=$('#transform_orderid').val();
		var userid=$('#transformuserid').val();
		var amount=$.trim($('#mt_withdrawal_payamount').val());
		var account=$.trim($('#user_account').val());
		var account_password=$.trim($('#mt_account_pwd').val());
		var login_pass=$.trim($('#login_pass').val());
		if(account_password != login_pass){
			$('#error_system').show();
			$('#error_system_text').text('账户密码错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		var flag=false;
        if(changeMoney(amount)){
			$.ajax({
				type:'POST',
				url:conUrl+'/is_dealpwd',
				data:{"dealpwd":dealpwd},
				async:false,
				success:function(arr){
					if(arr.flag==0){
						$('#error_system').show();
						$('#error_system_text').text('交易密码错误');
						setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
					}else if(arr.flag==1){
						flag=true;
					}
				}
			});
			$('#loading_img').show();
			showOverlay();
			if(flag){
				$.ajax({
					type:'POST',
					url:conUrl+'/transform_pay',
					data:{"out_orderid":out_orderid,"body":userid,"amount":amount,"account":account,"account_password":account_password},
					success:function(arr){
						$('#loading_img').hide();
						if(arr.indexOf('[status] => success')){	
							$('#transform_yes').show();
						}else{
							alert('出金至余额错误，请重试或联系客服！');
							location.href=conUrl+'/transform';
						}
					}
				});
			}
		}
	})
	/* 充值 */
	$('.recharge_style .wsyh_btn').click(function(){
		$('.recharge_style li').removeClass('active');
		$(this).addClass('active');
		$('.recharge .acwenhe').css('display','none');
		$('.recharge .bank_box').css('display','none');
		$('.recharge .select_bank').css('display','block');
	})
	$('.recharge_style .kjzf_btn').click(function(){
		$('.recharge_style li').removeClass('active');
		$(this).addClass('active');
		$('.recharge .acwenhe').css('display','block');
		$('.recharge .bank_box').css('display','block');
		$('.recharge .select_bank').css('display','none');
	})
	
	$('.select_bank li').click(function(){
		$('.select_bank li').removeClass('active');
		$(this).addClass('active');
	})
	
	$('#recharge_btn').click(function(){
		var money = $.trim($("#goodPrice").val());
			if(changeMoney(money)){
				showOverlay();
				$('#recharge_form').submit();
				$('.recharge_yn').show();
			}
	})
	
	$("#goodPrice").keydown(function(e){
		if(e.keyCode==13){
			$('#recharge_btn').click();
		}
	})
	
	$('#recharge_success').click(function(){
		var out_orderid=$('#out_orderid').val();
		$.ajax({
			type:'POST',
			url:conUrl+'/has_record',
			data:{'out_orderid':out_orderid},
			success:function(arr){
				if(arr.flag==1){
					location.href=conUrl+'/dealRecord';
				}else if(arr.flag==0){
					$('#recharge_error').show();
					showOverlay();
				}
			}
		});
	})
	
	$('#mt_recharge_btn').click(function(){
		var amount=$('#mt_goodPrice').val();
		if(changeMoney(amount)){
			showOverlay();
			$('#mt_recharge_form').submit();
			$('.recharge_yn').show();
		}
	})
	
	/* 提现 */
	if(user_active == '.withdrawal'){
		var card=$('#withcard').val();
		if(card.length<16){
			$('#need_card').show();
			showOverlay();
		}else if(deal_pwd!='true'){
			$('#need_dealpwd').show();
			showOverlay();
		}
	}
	$('#withdrawal_btn').click(function(){
		var method='withdrawal';
		var dealpwd=$('#withdrawal_dealpwd').val();
		
		var expenses=$('#withdrawal_payamount').val();
		var balance=parseFloat($('#with_balance').val());
		
		
		var out_orderid=$('#without_orderid').val();
		var userid=$('#withdrawuserid').val();
		var userphone=$('#withdrawuserphone').val();
		var username=$('#withname').val();
		
		var flag=false;
		if(changeMoney(expenses)){
			var d_value=balance-parseFloat(toDecimal(expenses));
			if (d_value<0) {
				$('#error_system').show();
				$('#error_system_text').text('可提现余额不足');
				setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
				return false;
			}
			$.ajax({
				type:'POST',
				url:conUrl+'/is_dealpwd',
				data:{"dealpwd":dealpwd},
				async:false,
				success:function(arr){
					if(arr.flag==0){
						$('#error_system').show();
						$('#error_system_text').text('交易密码错误');
						setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
					}else if(arr.flag==1){
						flag=true;
					}
				}
			});
		}
		if(flag){
			showOverlay();
			$('#loading_img').show();
			$.ajax({
				type:'POST',
				url:conUrl+'/withRecord',
				data:{
					"method":method,
					"out_orderid":out_orderid,
					"amount":expenses,
					"body":userid,
					"subject":'网站提现',
					"state":"处理中"
					},
				async:false,
				success:function(arr){
					if(arr.flag==1){
						flag=true;
					}else if(arr.flag==0){
						flag=false;
						$('#loading_img').hide();
						hideOverlay();
						alert('提现错误，请重试或联系客服！');
						location.href=conUrl+"/withdrawal";
					}
				}
			});
			if(flag){
				$.ajax({
					url:conUrl+"/withdrawal_pay",
					type:'POST',
					data:{
						"capital_type":0,
						"method":method,
						"userid":userid,
						"out_orderid":out_orderid,
						"amount":expenses,
						"type":"网站提现",
						"name":username,
						},
					success:function(data){
						$('#loading_img').hide();
						if(data.flag==1){
							$('#withdrawal_out').show();
						}else{
							hideOverlay();
							alert('支付数据更新有误，请联系客服！');
						}
					}
				});
			}
		}
	})
	$('#withdrawal_payamount').keydown(function(e){
		if(e.keyCode==13){
			$('#withdrawal_btn').click();
		}
	})
	$('#withdrawal_dealpwd').keydown(function(e){
		if(e.keyCode==13){
			$('#withdrawal_btn').click();
		}
	})
	
	$('#mt_withdrawal_btn').click(function(){
		var method='withdrawal';
		var dealpwd=$('#mt_withdrawa_dealpwd').val();
		
		var expenses=$('#mt_withdrawal_payamount').val();
		var balance=parseFloat($('#with_balance').val());
		
		
		var out_orderid=$('#without_orderid').val();
		var userid=$('#withdrawuserid').val();
		var userphone=$('#withdrawuserphone').val();
		var username=$('#withname').val();
		
		var flag=false;
		if(changeMoney(expenses)){
			var d_value=balance-parseFloat(toDecimal(expenses));
			if (d_value<0) {
				$('#error_system').show();
				$('#error_system_text').text('可提现余额不足');
				setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
				return false;
			}
			$.ajax({
				type:'POST',
				url:conUrl+'/is_dealpwd',
				data:{"dealpwd":dealpwd},
				async:false,
				success:function(arr){
					if(arr.flag==0){
						$('#error_system').show();
						$('#error_system_text').text('交易密码错误');
						setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
					}else if(arr.flag==1){
						flag=true;
					}
				}
			});
		}
		if(flag){
			showOverlay();
			$('#loading_img').show();
			$.ajax({
				type:'POST',
				url:conUrl+'/withRecord',
				data:{
					"method":method,
					"out_orderid":out_orderid,
					"amount":expenses,
					"body":userid,
					"subject":'网站提现',
					"state":"处理中"
					},
				async:false,
				success:function(arr){
					if(arr.flag==1){
						flag=true;
					}else if(arr.flag==0){
						flag=false;
						$('#loading_img').hide();
						hideOverlay();
						alert('提现错误，请重试或联系客服！');
						location.href=conUrl+"/withdrawal";
					}
				}
			});
			if(flag){
				$.ajax({
					url:conUrl+"/withdrawal_pay",
					type:'POST',
					data:{
						"capital_type":0,
						"method":method,
						"userid":userid,
						"out_orderid":out_orderid,
						"amount":expenses,
						"type":"网站提现",
						"name":username,
						},
					success:function(data){
						$('#loading_img').hide();
						if(data.flag==1){
							$('#withdrawal_out').show();
						}else{
							hideOverlay();
							alert('支付数据更新有误，请联系客服！');
						}
					}
				});
			}
		}
	})
	/* 交易记录 */
	var recharge_state=$('#recharge_state').val();
	if(recharge_state=='YRJ'){
		showOverlay();
		$('#deal_success_box').show();
	}
	$('#deal_success_close').click(function(){
		hideOverlay();
		$('#deal_success_box').hide();
	})
	var withdrawal_state=$('#withdrawal_state').val();
	if(withdrawal_state=='withdrawal'){
		showOverlay();
		$('#capital_success_box').show();
	}
	$('#capital_success_close').click(function(){
		$('#capital_success_box').hide();
		hideOverlay();
	})
	var $state = $("#state");
	var $day = $("#day");
	var $market = $("#market");
	var $recordType = $("#recordType");
	var $record_form = $("#record_form");
	$("#deatilStateId a").each(function () {
		var $this = $(this);
		if ($this.attr("data") == $state.val()) {
			$this.addClass("active");
		} else {
			$this.removeClass("active");
		}
	})
	
	$("#deatilTimeId a").each(function () {
		var $this = $(this);
		if ($this.attr("data") == $day.val()) {
			$this.addClass("active");
		} else {
			$this.removeClass("active");
		}
	})
	
	$("#detailMarketId a").each(function () {
		var $this = $(this);
		if ($this.attr("data") == $market.val()) {
			$this.addClass("active");
		} else {
			$this.removeClass("active");
		}
	})

	$("#detailTypeId a").each(function () {
		var $this = $(this);
		if ($this.attr("data") == $recordType.val()) {
			$this.addClass("active");
		} else {
			$this.removeClass("active");
		}
	})

	$("#deatilStateId a").click(function () {
		var $this = $(this);
		var state = $this.attr("data");
		$state.val(state);
		$record_form.submit();
	})
	$("#deatilTimeId a").click(function () {
		var $this = $(this);
		var day = $this.attr("data");
		$day.val(day);
		$record_form.submit();
	})
	$("#detailMarketId a").click(function () {
		var $this = $(this);
		var market = $this.attr("data");
		$market.val(market);
		$record_form.submit();
	})
	$("#detailTypeId a").click(function () {
		var $this = $(this);
		var tradetype = $this.attr("data");
		$recordType.val(tradetype);
		$record_form.submit();
	})
	
	$('.page_box .num').eq(0).css('border-left','1px solid #eee');
	
	$("#record_type a").each(function () {
		var $this = $(this);
		if ($this.attr("data") == $recordType.val()) {
			$this.addClass("active");
		} else {
			$this.removeClass("active");
		}
	})
	$("#record_type a").click(function () {
		var $this = $(this);
		var tradetype = $this.attr("data");
		$recordType.val(tradetype);
		$record_form.submit();
	})
	
	/* 消息中心 */
	var $message_type = $("#message_type");
	var $message_state = $("#message_state");
	var $message_form = $("#message_form");
	$("#type_choose a").each(function () {
		var $this = $(this);
		if ($this.attr("data") == $message_type.val()) {
			$this.addClass("active");
		} else {
			$this.removeClass("active");
		}
	})

	$("#state_choose a").each(function () {
		var $this = $(this);
		if ($this.attr("data") == $message_state.val()) {
			$this.addClass("active");
		} else {
			$this.removeClass("active");
		}
	})

	$("#type_choose a").click(function () {
		var $this = $(this);
		var message_type = $this.attr("data");
		$message_type.val(message_type);
		$message_form.submit();
	})
	$("#state_choose a").click(function () {
		var $this = $(this);
		var message_state = $this.attr("data");
		$message_state.val(message_state);
		$message_form.submit();
	})
	
	$('.message_list a').click(function(){
		var id=$(this).attr('data');
		var state=$(this).attr('name');
		if(state==0){
			$.ajax({
				url:conUrl+'/message_read',
				type:'post',
				data:{'id':id},
				success:function(data){
					if(data.flag==1){
						location.href=conUrl+'/messageDetail/message/'+id;
					}
				}
			})
		}else{
			location.href=conUrl+'/messageDetail/message/'+id;
		}
	})
	$('#allread').click(function(){
		var type=$('#message_type').val();
		$.ajax({
			url:conUrl+'/allread',
			type:'post',
			data:{'allread':type},
			success:function(data){
				if(data.flag==1){
					location.reload();
				}
			}
		})
	})
	
	$("#checkall").click(function(){   
		$(".message_list input[type='checkbox']").prop("checked", true);   
	});
	$("#checknull").click(function(){   
		$(".message_list input[type='checkbox']").prop("checked", false);   
	});
	$("#checkread").click(function(){   
		$(".message_list input[data='1']").prop("checked", true);   
	});
	$("#checkunread").click(function(){   
		$(".message_list input[data='0']").prop("checked", true);   
	});
	$('#message_delete').click(function(){
		stopTime();
		var message_check=$(".message_list :checked");
		if(message_check.size()<1){
			$('#error_system').show();
			$('#error_system_text').text('未选中任何信息');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
		}else{
			if(confirm('您确定要删除吗？')){
				var dropIds = new Array();  
				message_check.each(function(){  
					dropIds.push($(this).val());  
				});  
				$.ajax({  
					type:'post',  
					traditional :true,  
					url:conUrl+'/messageDelete',  
					data:{'ids[]':dropIds},  
					success:function(data){
						if(data.flag==1){
							location.reload();
						}else{
							alert('删除错误，请重试或联系客服！');
							location.reload();
						};
					}  
				});  
			}
		}
	})
	/*推广点击复制*/
	$('.myinvite .copy').click(function(){
		obj=$('.myinvite .link').first();
		obj.select();
		document.execCommand("Copy");
		alert('复制好了，快去推广给好友吧！');
	})
	$('#myinvite .copy').click(function(){
		obj=$('#myinvite .link').first();
		obj.select();
		document.execCommand("Copy");
		alert('复制好了，快去推广给好友吧！');
	})
	/* 手机交易颜色 */
	var record_num=$('#dealRecord .record_detail ul li .number');
	var record_num_row=$('#dealRecord .record_detail ul li .number').length;
	for(var i=0;i<record_num_row;i++){
		var record_num_updown=record_num.eq(i).html().charAt(0);
		if(record_num_updown=='-'){
			record_num.eq(i).css('color','#00c56b')
		}else if(record_num_updown=='+'){
			record_num.eq(i).css('color','#ee3800');
		}else{
			record_num.eq(i).css('color','#b38928');
		}
	}
	/* 头像裁剪函数 */
	function convertToData(url, canvasdata, cropdata, callback) {  
	    var cropw = cropdata.width; // 剪切的宽  
	    var croph = cropdata.height; // 剪切的宽  
	    var imgw = canvasdata.width; // 图片缩放或则放大后的高  
	    var imgh = canvasdata.height; // 图片缩放或则放大后的高  
	      
	    var poleft = canvasdata.left - cropdata.left; // canvas定位图片的左边位置  
	    var potop = canvasdata.top - cropdata.top; // canvas定位图片的上边位置  
	      
	    canvas.width = cropw;  
	    canvas.height = croph;  
	      
	    var img = new Image();  
	    img.src = url;  
	      
	    img.onload = function() {  
	        this.width = imgw;  
	        this.height = imgh;  
	            // 这里主要是懂得canvas与图片的裁剪之间的关系位置  
	        ctx.drawImage(this, poleft, potop, this.width, this.height);  
	        var base64 = canvas.toDataURL('image/jpeg', 0.8);  // 这里的“1”是指的是处理图片的清晰度（0-1）之间，当然越小图片越模糊，处理后的图片大小也就越小  
	        callback && callback(base64)      // 回调base64字符串  
	    }  
	}
	
})