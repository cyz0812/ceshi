$(function(){
	var encrypt = new JSEncrypt();
	var publickey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBiYEk6LHMqqUm6WJCcSNfjlPZXPj/zHjmuVuU/QLE/yKqv2YEiPiGxaajZdBL4WUNRQxO4Dt4MDrjN43CsAzQj6OT/fDgroPERccBnwAZQr5FTR4GFfhxcoWxT/2nfmIVI7nHoJSeV7nHHwBBwagb4Z5EDrQDKr3vsumk9DY98wIDAQAB-----END PUBLIC KEY-----';
	encrypt.setPublicKey(publickey);
	
	//代理后台
	//代理登录
	$('#agentlogin_sub').click(function(){
		if($('#agentcode').val()!='' && $('#agentpwd').val()!=''){
			$('#agentlogin_form').submit();
		}else{
			alert('账号密码不得为空！');
			return false;
		}
	})
	$('#agentpwd').keydown(function(e){
		if(e.keyCode==13){
			$('#agentlogin_sub').click();
		}
	})
	//代理左侧
	$('#manage_left ul li').click(function(){
		$('#manage_left ul li').removeClass('active');
		$(this).addClass('active');
	})
	//点击跳转详情
	$('.right_content .table_a tbody tr').click(function(){
		location.href=$(this).find('.href_a').attr('href');
	})
	//代理文件下载
	$('.loaded').click(function(){
		var _this = $(this)
		var file_id = _this.attr('name');
		var loaded  = _this.parent().parent().find('.is_loaded').text();
		if(loaded.length == 0){
			$.ajax({
				type:'post',
				url:conUrl+'/loaded',
				data:{'file_id':file_id},
				success:function(data){
					if(data.flag == 1){
						_this.parent().parent().find('.is_loaded').text('已下载');
					}
				}
			})
		}
	})
	if(document.getElementById('file_html')){
		$('#file_html a').each(function(){
			var path=$(this).attr('data');
			var index=$(this).attr('data').lastIndexOf(".");
			var download=$(this).text()+(path.substring(index,path.length));
			$(this).attr('download',download);
			$(this).text(download);
		})
	}
	
	$('#reg_xieyi').click(function(){
		var window_width=document.body.clientWidth;
		var be_left=(window_width-1000)/2;
		window.open('/agent/register/reg_xieyi',null,"width=1000,height=700,top=50,left="+be_left+",right=0,bottom=0,toolbar=no,scrollbars=yes,location=no,status=no");
	})
	var postUrl=rootUrl+"/master/demo/message_code_agent.php"; 
	var phone_url='/agent/register/has_phone';
	var window_width=$(window).width();
	var error_info_code=$('#error_info_code').val();
	if(error_info_code==1){
		$('#error_system').show();
		$('#error_system_text').text('验证码错误');
		setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
		if(window_width>768)$('#login_code').css('border','1px solid #f99');
	}else if(error_info_code==2){
		$('#error_system').show();
		$('#error_system_text').text('密码错误');
		setTime=setTimeout(function(){$('#error_system').hide()},5000);
		if(window_width>768)$('#login_pwd').css('border','1px solid #f99');
	}else if(error_info_code==3){
		$('#error_system').show();
		$('#error_system_text').text('该手机号尚未注册');
		setTime=setTimeout(function(){$('#error_system').hide()},5000);
		if(window_width>768)$('#login_phone').css('border','1px solid #f99');
	}
	
	$('#login_sub').click(function(){
		stopTime();
		var phone_num=$('#login_phone').val();
		var pwd=$('#login_pwd').val();
		var code_num=null;
		$('#login_form input').css('border','1px solid #a9a9a9');
		if(!/^[1]\d{10}$/.test(phone_num)){
			$('#error_system').show();
			$('#error_system_text').text('手机号格式错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#login_phone').css('border','1px solid #f99');
			return false;
		}else if(pwd.length<6||pwd.length>20){
			$('#error_system').show();
			$('#error_system_text').text('密码位数错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#login_pwd').css('border','1px solid #f99');
			return false;
		}else if(document.getElementById("login_yzm")){
			code_num=$('#login_code').val();
			if(code_num.length!=4){
				$('#error_system').show();
				$('#error_system_text').text('验证码错误');
				setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
				$('#login_code').css('border','1px solid #f99');
				return false;
			}
		}
        var telephone= encrypt.encrypt(phone_num);
        var pass= 	encrypt.encrypt(pwd);
        $.ajax({
            type:'post',
            url:'/agent/login/login',
            data:{'phone':telephone,'password':pass},
            success:function(data){
                if(data.ret=='success') {
                    location.href = '/agent/user/user';
                }else if(data.ret=='error') {
                    error_info('密码错误');
                }else {
                    error_info('该手机号尚未注册');
                }
            }

        })
	})
	$('#login_pwd').keydown(function(e){
		if(e.keyCode==13){
			$('#login_sub').click();
		}
	});
	
	//MT
	$('#mt_login_sub').click(function(){
		var phone_num=$('#mt_login_phone').val();
		var pwd=$('#mt_login_pwd').val();
		var code_num=null
		if(!/^[1]\d{10}$/.test(phone_num)){
			$('#error_system').show();
			$('#error_system_text').text('手机号格式错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}else if(pwd.length<6||pwd.length>20){
			$('#error_system').show();
			$('#error_system_text').text('密码位数错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}else if(document.getElementById("mt_login_yzm")){
			code_num=$('#mt_login_code').val();
			if(code_num.length!=4){
				$('#error_system').show();
				$('#error_system_text').text('验证码错误');
				setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			}
		}
        var telephone= $('#login_phone').attr('type','password').val(encrypt.encrypt(phone_num)).val();
        var pass= 	$('#login_pwd').val(encrypt.encrypt(pwd)).val();
        $.ajax({
            type:'post',
            url:'/agent/login/login',
            data:{'phone':telephone,'password':pass},
            success:function(data){
                if(data.ret=='success') {
                    location.href = '/agent/user/user';
                }else if(data.ret=='error') {
                    error_info('密码错误');
                }else {
                    error_info('该手机号尚未注册');
                }
            }

        })
	})
	//PC
	$('#pc_getCode').click(function(){
		stopTime();
		$('#register_form ul li input').css('border','1px solid #ccc');
		var phoneNum=$('#pc_phone_num').val();
		var getCode=$(this);
		var time=59;
		var flag=0;
		if(/^[1]\d{10}$/.test(phoneNum)){
			$.ajax({
				type:'POST',
				url:'/agent/login/has_phone',
				data:{'phone':phoneNum},
				success:function(data){
					if(data.flag==1){
						flag=1;
					}else if(data.flag==0){
						$('#error_system').show();
						$('#error_system_text').text('该手机号已经注册');
						setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
						$('#pc_phone_num').css('border','1px solid #f99');
					}
				},
				async:false
			});
			if(flag==1){
				$('#pc_code_num').select();
				getCode.css('cursor','default');
				getCode.css('color','#999');
				getCode.css('background','#eee');
				getCode.attr({ "disabled": "disabled" });
				$.ajax({
					url: rootUrl+"/master/demo/message_code_xmyttz.php",
					type: 'post',
					data: {'phone': phoneNum},
					success: function (data) {
						if(data.indexOf('success')){
							
							getCode.html("<p>60秒后</p><p>可重新发送</p>");
							var hander = setInterval(function () {
								if (time <= 0) {
									clearInterval(hander);
									getCode.css('cursor','pointer');
									getCode.css('color','#fff');
									getCode.css('background','#0379b5')
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
			}
		}else{
			$('#error_system').show();
			$('#error_system_text').text('手机号格式错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#pc_phone_num').css('border','1px solid #f99');
			return false;
		}
		
	})
	$('#pc_reg_btn').click(function(){
        var phone_num=$('#pc_phone_num').val();
        var code_num=$('#pc_code_num').val();
        var pwd_num=$('#pc_pwd_num').val();
        var invite_code=$.trim($('#pc_invite_code').val());
        var invite=true;
        var flag=0;
        stopTime();
        $('#register_form ul li input').css('border','1px solid #ccc');
        if(!$('#pc_checkbox').is(':checked')){
            error_info('请先阅读并同意注册协议');
            return false;
        }
        if(!/^[1]\d{10}$/.test(phone_num)){
            error_info('手机号格式错误');
            $('#pc_phone_num').css('border','1px solid #f99');
            return false;
        }
        if(code_num.length!=6){
            error_info('请输入6位验证码');
            $('#pc_code_num').css('border','1px solid #f99');
            return false;
        }
        if(pwd_num.length<6||pwd_num.length>20){
            error_info('密码长度需在6-20位之间');
            $('#pc_pwd_num').css('border','1px solid #f99');
            return false;
        }
        if(pwd_num!=$('#pc_pwd_num2').val()){
            error_info('两次密码输入不一致');
            $('#pc_pwd_num2').css('border','1px solid #f99');
            return false;
        }
        if(invite_code.length==0){
            error_info('邀请码不得为空！');
            $('#pc_invite_code').css('border','1px solid #f99');
            return false;
        }
        if(invite_code.length!=0){
            $.ajax({
                url:conUrl+'/is_invite_code',
                type:'post',
                data:{'invite_code':invite_code},
                async:false,
                success:function(data){
                    if(data.flag==0){
                        error_info('邀请码错误！');
                        $('#pc_invite_code').css('border','1px solid #f99');
                        invite=false;
                    }
                }
            })
        }

        if(invite){
            var phone    = encrypt.encrypt(phone_num);
            var password = encrypt.encrypt(pwd_num);
            $.ajax({
                type:'POST',
                url:conUrl+'/register',
                data:{
                    'phone'    : phone,
                    'password' : password,
                    'code'     : code_num,
                    'invite'   : invite_code
                },
                success:function(data){
                    if(data.ret == 'repeat'){
                        error_info('该手机号已经注册');
                        $('#pc_phone_num').css('border','1px solid #f99');
                    }else if(data.ret == 'success'){
                        location.href = '/agent/user/user';
                    }else if(data.ret == 'error'){
                        error_info('验证码错误');
                        $('#pc_code_num').css('border','1px solid #f99');
                    }else{
                        error_info('服务器繁忙，请重试');
                        setTimeout(function(){location.reload()},keepTime);
                    }
                }
            });
        }
	})
	$('#pc_pwd_num2').keydown(function(e){
		if(e.keyCode==13){
			$('#pc_reg_btn').click();
		}
	})
	$('#pc_invite_code').keydown(function(e){
		if(e.keyCode==13){
			$('#pc_reg_btn').click();
		}
	})
	//MT
	$('#getCode').click(function(){
		$('#errorInfo').hide();
		var phoneNum=$('#phone_num').val();	
		var getCode=$(this);
		var time=59;
		var flag=0;
		if(/^[1]\d{10}$/.test(phoneNum)){
			$.ajax({
				type:'POST',
				url:phone_url,
				data:{'phone':phoneNum},
				success:function(data){
					if(data.flag==1){
						flag=1;
					}else if(data.flag==0){
						$('#errorInfo').show();
						$('#errorInfo_text').text('该手机号已注册');
					}
				},
				async:false
			});
			if(flag==1){
				$('#code_num').select();
				getCode.css('cursor','default');
				getCode.css('color','#999');
				getCode.css('background','#eee');
                getCode.css('font-size','14px');
				getCode.attr({ "disabled": "disabled" });
				$.ajax({
					url: postUrl,
					type: 'post',
					data: { 'phone': phoneNum},
					success: function (data) {
						if(data.indexOf('success')){
							getCode.html("<p>60秒后</p><p>可重新发送</p>");
							var hander = setInterval(function () {
								if (time <= 0) {
									clearInterval(hander);
									getCode.css('cursor','opinter');
									getCode.css('color','#fff');
									getCode.css('background','#01c0dd')
									getCode.html("获取验证码");
									getCode.removeAttr("disabled");
								}else {
                                    getCode.css('font-size','14px');
									getCode.css('cursor','default');
									getCode.css('color','#999');
									getCode.css('background','#eee');
									getCode.attr({ "disabled": "disabled" });
									getCode.html("<b style='line-height:20px;font-size: 14px;height:50px'>"+ time + "秒后</b><b style='font-size: 14px;'>可重新发送</b>");
									time--;
								}
							}, 1000);
						}else{
							$('#errorInfo').show();
							$('#errorInfo_text').text('验证码发送失败，请联系客服');
						}
					}
				});
			}
		}else{
			$('#errorInfo').show();
			$('#errorInfo_text').text('手机号码格式错误');
			return false;
		}
		
	})
    $('#addcard_btn_agent').click(function(){
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
            $('#addcard_btn_agent').click();
        }
    })
	$('#register_btn').click(function(){
		var phone_num=$('#phone_num').val();
		var code_num=$('#code_num').val();
		var pwd_num=$('#pwd_num').val();
		var invite_code=$.trim($('#invite_code').val());
		var invite=true;
		var flag=0;
		stopTime();
		if(!$('#mt_checkbox').is(':checked')){
			$('#error_system').show();
			$('#error_system_text').text('请先阅读并同意注册协议');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if(!/^[1]\d{10}$/.test(phone_num)){
			$('#error_system').show();
			$('#error_system_text').text('手机号格式错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if(code_num.length!=6){
			$('#error_system').show();
			$('#error_system_text').text('验证码错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if(pwd_num.length<6||pwd_num.length>20){
			$('#error_system').show();
			$('#error_system_text').text('密码长度需在6-20位之间');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if(pwd_num!=$('#pwd_num2').val()){	
			$('#error_system').show();
			$('#error_system_text').text('两次密码输入不一致');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if(invite_code!=$('#invite_code').val()){	
			$('#error_system').show();
			$('#error_system_text').text('邀请码不得为空');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		phone_num=encrypt.encrypt(phone_num);

		$.ajax({
			url:conUrl+'/is_invite_code',
			type:'post',
			data:{'invite_code':invite_code},
			async:false,
			success:function(data){
				if(data.flag==0){
					$('#error_system').show();
					$('#error_system_text').text('邀请码错误！');
					setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
					invite=false;
				}
			}
		})
        if(invite){
            var password = encrypt.encrypt(pwd_num);

            $.ajax({
                type:'POST',
                url:'/agent/register/register',
                data:{
                    'phone'    : phone_num,
                    'password' : password,
                    'code'     : code_num,
                    'invite'   : invite_code
                },
                success:function(data){
                    if(data.ret == 'repeat'){
                        error_info('该手机号已经注册');
                        $('#pc_phone_num').css('border','1px solid #f99');
                    }else if(data.ret == 'success'){
                        location.href = '/agent/user/user';
                    }else if(data.ret == 'error'){
                        error_info('验证码错误');
                        $('#pc_code_num').css('border','1px solid #f99');
                    }else{
                        error_info('服务器繁忙，请重试');
                        setTimeout(function(){location.reload()},keepTime);
                    }
                }
            });
        }
	})
	
	//充值并支付
	//银行卡绑定
	//新充值
	
	//账号绑定
	$('#a_account_btn').click(function(){
		var a_account=$('#a_account').val();
		if(a_account.length != 6){
			$('#a_error_info').show();
			$('#a_error_span').text('输入的账号格式有误！');
			return false;
		}
	})
	
	$('#d_account_btn').click(function(){
		var d_account=$('#d_account').val();
		if(!d_account.length){
			$('#d_error_info').show();
			$('#d_error_span').text('账号不得为空！');
			return false;
		}
	})
	
	$('#s_account_btn').click(function(){
		var s_account=$('#s_account').val();
		if(!s_account.length){
			$('#s_error_info').show();
			$('#s_error_span').text('账号不得为空！');
			return false;
		}
	})
	
	
	//代理开户
	$('#submission_sub').click(function(){
		var agent=$('#agent_name').val();
		var type=$('#select_type option:selected').val();
		var user=$('#user_name').val();
		var commission=$('#commission').val();
		if(agent.length==0||type.length==0||user.length==0||commission.length==0){
			alert('所有内容都必须填写');
			return false;
		};
	})
	
	//金额检测
	function checkamount(money){
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
				$('#error_system_text').text('金额只能输入一位小数');
				setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
				return false;
			}
		}
		return true;
	}
	function checkinvest(money){
		var pattern = '^-?[1-9]\\d*$|^-?0\\.\\d*$|^-?[1-9]\\d*\\.\\d*$';
		var regDot = /^(\d+\.\d{1,1}|\d+)$/;
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
			$('#error_system_text').text('金额只能输入一位小数');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		return true;
	}
	
	
	function rand_num(){
		var Num=""; 
		for(var i=0;i<6;i++) 
		{ 
			Num+=Math.floor(Math.random()*10); 
		}
		return Num;
	}
    $('.files').click(function () {
        var winHeight = $(window).height();
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            $(".weixin-tip").css("height",winHeight);
            $(".weixin-tip").show();
        } else {
          return true;
        }

    })

})