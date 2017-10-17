$(function(){
	var postUrl=rootUrl+"/master/demo/message_xsend_demo.php"; 
	var phone_url=conUrl+'/has_phone';
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	
	//PC
	$('#find_pc_getCode').click(function(){
		stopTime();
		$('#findpwd_form ul li input').css('border','1px solid #ccc');
		var phoneNum=$('#find_pc_phone_num').val();
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
						error_info('该手机号尚未注册','#find_pc_phone_num');
					}else if(data.flag==0){
						flag=1
					}
				},
				async:false
			});
			if(flag==1){
				getCode.css('cursor','default');
				getCode.css('color','#999');
				getCode.css('background','#eee');
				getCode.attr({ "disabled": "disabled" });
				$.ajax({
					url: postUrl,
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
				return false;
			}
		}else{
			error_info('手机号格式错误','#find_pc_phone_num');
			return false;
		}
		
	})
	
	$('#pc_find_btn').click(function(){
		var phone_num=$('#find_pc_phone_num').val();
		var code_num=$('#find_pc_code_num').val();
		var pwd_num=$('#find_pc_pwd_num').val();
		stopTime();
		$('#register_form ul li input').css('border','1px solid #ccc');
		if(!/^[1]\d{10}$/.test(phone_num)){
			error_info('手机号格式错误','#find_pc_phone_num');
			return false;
		}else if(code_num.length!=6){
			error_info('验证码错误','#find_pc_code_num');
			return false;
		}else if(pwd_num.length<6||pwd_num.length>20){
			error_info('密码长度需在6-20位之间','#find_pc_pwd_num');
			return false;
		}else if(pwd_num!=$('#find_pc_pwd_num2').val()){
			error_info('两次密码输入不一致','#find_pc_pwd_num2');
			return false;
		}else{
			$.ajax({
				type:'POST',
				url:conUrl+'/findpwd',
				data:{'code':code_num,'phone':phone_num,'password':pwd_num},
				success:function(data){
					if(data.ret=='success'){
						showOverlay();
						$('#findpwd_success').show();
					}else if(data.flag==0){
						error_info('验证码不正确','#find_pc_code_num');
					}
				}
			});
		}
	})
	
	/* 邮箱 */
	$('#find_emailCode').click(function(){
		stopTime();
		$('#findpwd_form ul li input').css('border','1px solid #ccc');
		var phoneNum=$('#find_pc_phone_num').val();
		var email=$('#find_pc_email_num').val();
		var getCode=$(this);
		var time=59;
		var flag=0;
		if(/^[1]\d{10}$/.test(phoneNum)){
			if(reg.test(email)){
				$.ajax({
					type:'POST',
					url:conUrl+'/has_email',
					data:{'phone':phoneNum,'email':email},
					success:function(data){
						if(data.flag==1){
							flag=1
						}else if(data.flag==-1){
							error_info('该手机号尚未注册');
							$('#find_pc_phone_num').css('border','1px solid #f99');
						}else if(data.flag==0){
							error_info('该账户尚未绑定邮箱或邮箱错误','#find_pc_email_num');
						}
					},
					async:false
				});
				if(flag==1){
					getCode.css('cursor','default');
					getCode.css('color','#999');
					getCode.css('background','#eee');
					getCode.attr({ "disabled": "disabled" });
					$.ajax({
						url: rootUrl+'/master/demo/EmailCode.php',
						type: 'post',
						data: {'email': email,'phone':phoneNum},
						success: function (data) {
							if(data.indexOf('[status] => success')){
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
					return false;
				}
			}else{
				$('#error_system').show();
				$('#error_system_text').text('邮箱格式错误');
				setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
				$('#find_pc_email_num').css('border','1px solid #f99');
				return false;
			}
		}else{
			$('#error_system').show();
			$('#error_system_text').text('手机号格式错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#find_pc_phone_num').css('border','1px solid #f99');
			return false;
		}
		
	})
	
	$('#pc_find_emailbtn').click(function(){
		var phone_num=$('#find_pc_phone_num').val();
		var email=$('#find_pc_email_num').val();
		var code_num=$('#find_pc_code_num').val();
		var pwd_num=$('#find_pc_pwd_num').val();
		stopTime();
		$('#register_form ul li input').css('border','1px solid #ccc');
		if(!/^[1]\d{10}$/.test(phone_num)){
			$('#error_system').show();
			$('#error_system_text').text('手机号格式错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#find_pc_phone_num').css('border','1px solid #f99');
			return false;
		}else if(!reg.test(email)){
			$('#error_system').show();
			$('#error_system_text').text('邮箱格式错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#find_pc_email_num').css('border','1px solid #f99');
			return false;
		}else if(code_num.length!=6){
			$('#error_system').show();
			$('#error_system_text').text('验证码错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#find_pc_code_num').css('border','1px solid #f99');
			return false;
		}else if(pwd_num.length<6||pwd_num.length>20){
			$('#error_system').show();
			$('#error_system_text').text('密码长度需在6-20位之间');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#find_pc_pwd_num').css('border','1px solid #f99');
			return false;
		}else if(pwd_num!=$('#find_pc_pwd_num2').val()){
			$('#error_system').show();
			$('#error_system_text').text('两次密码输入不一致');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#find_pc_pwd_num2').css('border','1px solid #f99');
			return false;
		}else{
			$.ajax({
				type:'POST',
				url:conUrl+'/is_emailcode',
				data:{'code':code_num,'phone':phone_num,'email':email},
				success:function(data){
					if(data.flag==1){
						$('#findpwd_form').submit();
					}else if(data.flag==0){
						$('#error_system').show();
						$('#error_system_text').text('验证码不正确');
						setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
						$('#find_pc_code_num').css('border','1px solid #f99');
					}
				}
			});
		}
	})
	//MT
	$('#find_getCode').click(function(){
		$('#errorInfo').hide();
		var phoneNum=$('#find_phone_num').val();	
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
						$('#errorInfo').show();
						$('#errorInfo_text').text('该手机号尚未注册');
					}else if(data.flag==0){
						flag=1;
					}
				},
				async:false
			});
			if(flag==1){
				getCode.css('cursor','default');
				getCode.css('color','#999');
				getCode.css('background','#eee');
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
			}else{
				return false;
			}
		}else{
			$('#errorInfo').show();
			$('#errorInfo_text').text('手机号码格式错误');
			return false;
		}
		
	})
	
	$('#find_btn').click(function(){
		$('#errorInfo').hide();
		var phone_num=$('#find_phone_num').val();
		var code_num=$('#find_code_num').val();
		var pwd_num=$('#find_pwd_num').val();
		if(!/^[1]\d{10}$/.test(phone_num)){
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
		}else if(pwd_num!=$('#find_pwd_num2').val()){
			$('#errorInfo').show();
			$('#errorInfo_text').text('两次密码输入不一致');
			return false;
		}else{
			$.ajax({
				type:'POST',
				url:conUrl+'/is_code',
				data:{'code':code_num,'phone':phone_num},
				success:function(data){
					if(data.flag==1){
						$('#mt_findpwd_form').submit();
					}else if(data.flag==0){
						$('#errorInfo').show();	
						$('#errorInfo_text').text('验证码错误');
					}
				}
			});
		}
	})

	
})