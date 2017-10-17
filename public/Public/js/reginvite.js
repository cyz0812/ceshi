$(function(){
	var encrypt = new JSEncrypt();
	var publickey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBiYEk6LHMqqUm6WJCcSNfjlPZXPj/zHjmuVuU/QLE/yKqv2YEiPiGxaajZdBL4WUNRQxO4Dt4MDrjN43CsAzQj6OT/fDgroPERccBnwAZQr5FTR4GFfhxcoWxT/2nfmIVI7nHoJSeV7nHHwBBwagb4Z5EDrQDKr3vsumk9DY98wIDAQAB-----END PUBLIC KEY-----';
	encrypt.setPublicKey(publickey);
	
	$('#reg_xieyi').click(function(){
		var window_width=document.body.clientWidth;
		var be_left=(window_width-1000)/2;
		window.open(conUrl+'/reg_xieyi',null,"width=1000,height=700,top=50,left="+be_left+",right=0,bottom=0,toolbar=no,scrollbars=yes,location=no,status=no");
	})
	var postUrl=rootUrl+"/master/demo/message_xsend_demo.php"; 
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
			$('#error_system').show();
			$('#error_system_text').text('请先阅读并同意注册协议');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
		}
		if(!/^[1]\d{10}$/.test(phone_num)){
			$('#error_system').show();
			$('#error_system_text').text('手机号格式错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#pc_phone_num').css('border','1px solid #f99');
			return false;
		}
		if(code_num.length!=6){
			$('#error_system').show();
			$('#error_system_text').text('验证码错误');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#pc_code_num').css('border','1px solid #f99');
			return false;
		}
		if(pwd_num.length<6||pwd_num.length>20){
			$('#error_system').show();
			$('#error_system_text').text('密码长度需在6-20位之间');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#pc_pwd_num').css('border','1px solid #f99');
			return false;
		}
		if(pwd_num!=$('#pc_pwd_num2').val()){	
			$('#error_system').show();
			$('#error_system_text').text('两次密码输入不一致');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			$('#pc_pwd_num2').css('border','1px solid #f99');
			return false;
		}
		if(invite_code.length==0){
			$('#error_system').show();
			$('#error_system_text').text('邀请码不得为空！');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
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
						$('#error_system').show();
						$('#error_system_text').text('邀请码错误！');
						setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
						$('#pc_invite_code').css('border','1px solid #f99');
						invite=false;
					}
				}
			})
		}
		
		if(invite){
			$.ajax({
				type:'POST',
				url:phone_url,
				data:{'phone':phone_num},
				success:function(data){
					if(data.flag==1){
						$.ajax({
							type:'POST',
							url:conUrl+'/is_code',
							data:{'code':code_num,'phone':phone_num},
							success:function(data){
								if(data.flag==1){
									flag=1;
								}else if(data.flag==0){
									$('#error_system').show();
									$('#error_system_text').text('验证码不正确');
									setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
									$('#pc_code_num').css('border','1px solid #f99');
								}
							},
							async:false
						});
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
				$('#pc_phone_num').attr('type','password').val(encrypt.encrypt(phone_num));
				$('#pc_pwd_num').val(encrypt.encrypt(pwd_num));
				$('#register_form').submit();
			};
		}else{
			return false;
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
	
	/* 修改名字 */
	$('#setname').click(function(){
		showOverlay();
		$('#setname_box').show();
	})
	$('#setname_btn').click(function(){
		var username=$.trim($('#name_input').val());
		if(length(username)<2||length(username)>16){
			error_info('中文昵称在1-8位之间,英文昵称在2-16位之间');
			return false;
		}else if(!/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(username)){
			error_info('昵称不能包含特殊符号');
			return false;
		}else{
			upOverlay(10003);
			$('#loading_img').show();
			$.ajax({
				type:'POST',
				url:conUrl+'/updatename',
				data:{'username':username},
				success:function(arr){
					downOverlay();
					hideOverlay();
					$('#loading_img').hide();
					if(arr.flag==1){
						$('.username').html(username);
						$('#setname_box').hide();
					}else if(arr.flag==0){
						error_info('修改昵称失败，请重试或联系客服！');
					}else if(arr.flag==-1){
						error_info('昵称重复，请换个昵称试试');
					}
				}
			});
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
				$.ajax({
					type:'POST',
					url:phone_url,
					data:{'phone':phone_num},
					success:function(data){
						if(data.flag==1){
							$.ajax({
								type:'POST',
								url:conUrl+'/is_code',
								data:{'code':code_num,'phone':phone_num},
								success:function(data){
									if(data.flag==1){
										$('#phone_num').attr('type','password').val(encrypt.encrypt(phone_num));
										$('#pwd_num').val(encrypt.encrypt(pwd_num));
										$('#mt_register_form').submit();
									}else if(data.flag==0){
										$('#errorInfo').show();	
										$('#errorInfo_text').text('验证码错误');
									}
								},
								async:false
							});
						}else if(data.flag==0){
							$('#errorInfo').show();
							$('#errorInfo_text').text('该手机号已注册');
						}
					},
					async:false
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