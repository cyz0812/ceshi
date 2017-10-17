$(function(){
	var encrypt = new JSEncrypt();
	var publickey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBiYEk6LHMqqUm6WJCcSNfjlPZXPj/zHjmuVuU/QLE/yKqv2YEiPiGxaajZdBL4WUNRQxO4Dt4MDrjN43CsAzQj6OT/fDgroPERccBnwAZQr5FTR4GFfhxcoWxT/2nfmIVI7nHoJSeV7nHHwBBwagb4Z5EDrQDKr3vsumk9DY98wIDAQAB-----END PUBLIC KEY-----';
	encrypt.setPublicKey(publickey);
	var window_width=$(window).width();
	
	$('#login_sub').click(function(){
		stopTime();
		var phone_num=$('#login_phone').val();
		var pwd=$('#login_pwd').val();
		var code_num=null;
		$('#login_form input').css('border','1px solid #a9a9a9');
		if(!/^[1]\d{10}$/.test(phone_num)){
			error_info('手机号格式错误','#login_phone');
			return false;
		}else if(pwd.length<6||pwd.length>20){
			error_info('密码位数错误','#login_pwd');
			return false;
		}
		var phone    = encrypt.encrypt(phone_num);
		var password = encrypt.encrypt(pwd);
		$.ajax({
			type:'POST',
			url:conUrl+'/login',
			data:{
					'phone'    : phone,
					'password' : password
				 },
			success:function(data){
				if(data.ret=='success') {
					location.href = '/Personal/User/user';
				}else if(data.ret=='error') {
					error_info('密码错误');
				}else {
					error_info('该手机号尚未注册');
				}
			}
		});
	})
    $('#login_sub_agent').click(function(){
        stopTime();
        var phone_num=$('#login_phone_agent').val();
        var pwd=$('#login_pwd_agent').val();
        var code_num=null;
        $('#login_form input').css('border','1px solid #a9a9a9');
        if(!/^[1]\d{10}$/.test(phone_num)){
            error_info('手机号格式错误','#login_phone');
            return false;
        }else if(pwd.length<6||pwd.length>20){
            error_info('密码位数错误','#login_pwd');
            return false;
        }
        var phone    = encrypt.encrypt(phone_num);
        var password = encrypt.encrypt(pwd);
        $.ajax({
            type:'POST',
            url:'/agent/login/login',
            data:{
                'phone'    : phone,
                'password' : password
            },
            success:function(data){
                if(data.ret=='success') {
                    location.href = '/agent/user/user';
                }else if(data.ret=='error') {
                    error_info('密码错误');
                }else {
                    error_info('该手机号尚未注册');
                }
            }
        });
    })
	
	
	$('#login_pwd').keydown(function(event){ 
		if(event.keyCode==13){ 
			$('#login_sub').click();
		} 
	});
    $('#login_pwd_agent').keydown(function(event){
        if(event.keyCode==13){
            $('#login_sub_agent').click();
        }
    });
	/* 移动端 */
	$('#mt_login_sub').click(function(){
		var phone_num=$('#mt_login_phone').val();
		var pwd=$('#mt_login_pwd').val();
		
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
		}
		var phone    = encrypt.encrypt(phone_num);
		var password = encrypt.encrypt(pwd);
		$.ajax({
			type:'POST',
			url:'/login/login/login',
			data:{
					'phone'    : phone,
					'password' : password
				 },
			success:function(data){
				if(data.ret=='success') {
                    location.href = '/personal/user/user';
				}else if(data.ret=='error') {
					error_info('密码错误');
				}else {
					error_info('该手机号尚未注册');
				}
			}
		});
	})
    $('#mt_login_sub_agent').click(function(){
        var phone_num=$('#mt_login_phone_agent').val();
        var pwd=$('#mt_login_pwd_agent').val();

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
        }
        var phone    = encrypt.encrypt(phone_num);
        var password = encrypt.encrypt(pwd);
        $.ajax({
            type:'POST',
            url:'/agent/login/login',
            data:{
                'phone'    : phone,
                'password' : password
            },
            success:function(data){
                if(data.ret=='success') {
                    location.href = '/agent/user/user';
                }else if(data.ret=='error') {
                    error_info('密码错误');
                }else {
                    error_info('该手机号尚未注册');
                }
            }
        });
    })
	
})