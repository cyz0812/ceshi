$(function(){
	var encrypt = new JSEncrypt();
	var publickey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBiYEk6LHMqqUm6WJCcSNfjlPZXPj/zHjmuVuU/QLE/yKqv2YEiPiGxaajZdBL4WUNRQxO4Dt4MDrjN43CsAzQj6OT/fDgroPERccBnwAZQr5FTR4GFfhxcoWxT/2nfmIVI7nHoJSeV7nHHwBBwagb4Z5EDrQDKr3vsumk9DY98wIDAQAB-----END PUBLIC KEY-----';
	encrypt.setPublicKey(publickey);
	
	$('#agreement').click(function(){
		var window_width=document.body.clientWidth;
		var be_left=(window_width-1000)/2;
		window.open(conUrl+'/agreement',null,"width=1000,height=700,top=50,left="+be_left+",right=0,bottom=0,toolbar=no,scrollbars=yes,location=no,status=no");
	})
	var phone_url=conUrl+'/has_phone';
	
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
				url:phone_url,
				data:{'phone':phoneNum},
				success:function(data){
					if(data.flag==1){
						flag=1;
					}else if(data.flag==0){
						error_info('该手机号已经注册');
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
			error_info('手机号格式错误');
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
						location.href = '/Personal/User/user';
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
				getCode.attr({ "disabled": "disabled" });
				$.ajax({
					url: rootUrl+"/master/demo/message_code_xmyttz.php",
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
									getCode.css('cursor','default');
									getCode.css('color','#999');
									getCode.css('background','#eee');
									getCode.attr({ "disabled": "disabled" });
									getCode.html("<p>"+ time + "秒后</p><p>可重新发送</p>");
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
	
	$('#register_btn').click(function(){
		$('#errorInfo').hide();
		var phone_num=$('#phone_num').val();
		var code_num=$('#code_num').val();
		var pwd_num=$('#pwd_num').val();
		var invite_code=$.trim($('#invite_code').val());
		var flag=0;
		var invite=true;
		if(!$('#mt_checkbox').is(':checked')){
			$('#errorInfo').show();
			$('#errorInfo_text').text('请先阅读并同意注册协议');
			return false;
		}else if(!/^[1]\d{10}$/.test(phone_num)){
			$('#errorInfo').show();
			$('#errorInfo_text').text('手机号码格式错误');
			return false;
		}else if(code_num.length!=6){
			$('#errorInfo').show();
			$('#errorInfo_text').text('验证码错误');
			return false;
		}else if(pwd_num.length<6||pwd_num.length>20){
			$('#errorInfo').show();
			$('#errorInfo_text').text('密码长度需在6-20位之间');
			return false;
		}else if(pwd_num!=$('#pwd_num2').val()){
			$('#errorInfo').show();
			$('#errorInfo_text').text('两次密码输入不一致');
			return false;
		}else{
			if(invite_code.length==0){
				$('#errorInfo').show();
				$('#errorInfo_text').text('邀请码不得为空！');
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
							$('#errorInfo').show();
							$('#errorInfo_text').text('邀请码错误！');
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
						if(data.ret == 'repeat') {
							error_info('该手机号已经注册');
							$('#pc_phone_num').css('border','1px solid #f99');
						}else if(data.ret == 'success') {
							location.href = '/Personal/User/user';
						}else if(data.ret == 'error') {
							error_info('验证码错误');
						}else {
							$('#error_system').show();
							$('#error_system_text').text('服务器繁忙，请重试');
							setTime=setTimeout(function(){$('#error_system').hide();location.reload();},keepTime);
						}
					}
				});
			}
		}
		
	})
	
	
	function rand_num(){
		var Num=""; 
		for(var i=0;i<6;i++) 
		{ 
			Num+=Math.floor(Math.random()*10); 
		}
		return Num;
	}

})