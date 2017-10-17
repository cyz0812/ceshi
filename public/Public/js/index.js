$(function(){
	var encrypt = new JSEncrypt();
	var publickey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBiYEk6LHMqqUm6WJCcSNfjlPZXPj/zHjmuVuU/QLE/yKqv2YEiPiGxaajZdBL4WUNRQxO4Dt4MDrjN43CsAzQj6OT/fDgroPERccBnwAZQr5FTR4GFfhxcoWxT/2nfmIVI7nHoJSeV7nHHwBBwagb4Z5EDrQDKr3vsumk9DY98wIDAQAB-----END PUBLIC KEY-----';
	encrypt.setPublicKey(publickey);
	//轮播器转换
	var banner_index = 1;
	var prev = 0;
	$('.banner_bg img').eq(0).css('opacity',1);
	$('.banner_bg li').eq(0).css('background','#57b1df').css('opacity','1');
	var banner_timer = setInterval(auto,5000);
	$('.banner_bg li').hover(function(){
		clearInterval(banner_timer);
		banner_index = $(this).index();
		change(this);
		$('.banner_change').attr('data',banner_index);
	},function(){
		prev = $(this).index();
		banner_index = prev + 1;
		banner_timer = setInterval(auto,5000);
	})
	$('#banner_prev').click(function(){
		clearInterval(banner_timer);
		prev = parseInt($(this).attr('data'));
		banner_index = prev-1;
		if (banner_index < 0) banner_index = $('.banner_bg ul li').size()-1;
		$('.banner_change').attr('data',banner_index);
		change($('.banner_bg li').eq(banner_index));
		prev = banner_index
		banner_index = banner_index + 1;
		banner_timer = setInterval(auto,5000);
	})
	$('#banner_next').click(function(){
		clearInterval(banner_timer);
		prev = parseInt($(this).attr('data'));
		banner_index = prev+1;
		if (banner_index >= $('.banner_bg ul li').size()) banner_index = 0;
		$('.banner_change').attr('data',banner_index);
		change($('.banner_bg li').eq(banner_index));
		prev = banner_index
		banner_index = banner_index + 1;
		banner_timer = setInterval(auto,5000);
	})
	
	function change(obj){
		$('.banner_bg li').css('background','#999').css('opacity','0.7');
		$(obj).css('background','#57b1df').css('opacity','1');
		$('.banner_bg img').eq(prev).stop().animate({opacity:'0'},500).css('zIndex', '1');
		$('.banner_bg img').eq(banner_index).css('zIndex', '2').stop().animate({opacity : 1},500)
	}
	function auto(){
		if (banner_index >= $('.banner_bg ul li').size()) banner_index = 0;
		change($('.banner_bg li').eq(banner_index).first());
		prev = banner_index
		banner_index++;
		$('.banner_change').attr('data',prev);
	};
	
	//首页登录
	$('#index_login').click(function(){
		stopTime();
		var phone_num=$('#index_phoneNum').val();
		var pwd=$('#index_pwd').val();
		if(!/^[1]\d{10}$/.test(phone_num)){
			error_info('手机号格式错误');
			return false;
		}else if(pwd.length<6||pwd.length>20){
			error_info('密码位数错误');
			return false;
		}
		var phone    = encrypt.encrypt(phone_num);
		var password = encrypt.encrypt(pwd);
		$.ajax({
			type:'POST',
			url:'Login/Login/login',
			data:{
					'phone'    : phone,
					'password' : password
				 },
			success:function(data){
				if(data.ret=='success') {
					location.href = '/';
				}else if(data.ret=='error') {
					error_info('密码错误');
				}else {
					error_info('该手机号尚未注册');
				}
			}
		});
	})
    $('#index_login_agent').click(function(){
        stopTime();
        var phone_num=$('#index_phoneNum').val();
        var pwd=$('#index_pwd').val();
        if(!/^[1]\d{10}$/.test(phone_num)){
            error_info('手机号格式错误');
            return false;
        }else if(pwd.length<6||pwd.length>20){
            error_info('密码位数错误');
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
	
	$('#index_pwd').keydown(function(e){
		if(e.keyCode==13){
			$('#index_login').click();
		}
	})
    $('#index_pwd').keydown(function(e){
        if(e.keyCode==13){
            $('#index_login_agent').click();
        }
    })
	
	function dqihuo_fn (){
		qihuo_title_num=1;
		$('.h2_box .aqihuo').css('transform','rotateY(-120deg) translateZ(80px)');
		$('.h2_box .dqihuo').css('transform','rotateY(0deg) translateZ(80px)');
		$('.h2_box .h2_aqihuo').css('transform','rotateY(120deg)');
		$('.h2_box .h2_dqihuo').css('transform','rotateY(0deg)');
		$('.h2_box .h2_aqihuo img').css({'transform':'scale(0.8,0.8)','opacity':0.3,'filter':'blur(2px)','-webkit-filter':'blur(2px)'});
		$('.h2_box .h2_dqihuo img').css({'transform':'scale(1,1)','opacity':1,'filter':'blur(0px)','-webkit-filter':'blur(0px)'});
		$('.goods_box .aqihuo_box').css({'transform':'rotateY(90deg)','height':0,'opacity':0});
		$('.goods_box .dqihuo_box').css({'transform':'rotateY(0)','height':'auto','opacity':1});
		$('.qihuo_type span').removeClass('active');
		$('.qihuo_type .type_dqihuo').addClass('active');
		$('.qihuo_type .blue_line').css({'right':-48});
	}
	function aqihuo_fn (){
		qihuo_title_num=0;
		$('.h2_box .aqihuo').css('transform','rotateY(0deg) translateZ(80px)');
		$('.h2_box .dqihuo').css('transform','rotateY(120deg) translateZ(80px)');
		$('.h2_box .h2_aqihuo').css('transform','rotateY(0deg)');
		$('.h2_box .h2_dqihuo').css('transform','rotateY(-120deg)');
		$('.h2_box .h2_aqihuo img').css({'transform':'scale(1,1)','opacity':1,'filter':'blur(0px)','-webkit-filter':'blur(0px)'});
		$('.h2_box .h2_dqihuo img').css({'transform':'scale(0.8,0.8)','opacity':0.3,'filter':'blur(2px)','-webkit-filter':'blur(2px)'});
		$('.goods_box .aqihuo_box').css({'transform':'rotateY(0)','height':'auto','opacity':1});
		$('.goods_box .dqihuo_box').css({'transform':'rotateY(-90deg)','height':0,'opacity':0});
		$('.qihuo_type span').removeClass('active');
		$('.qihuo_type .type_aqihuo').addClass('active');
		$('.qihuo_type .blue_line').css({'right':48});
	}
	var qihuo_title_num=0;
	$('#qihuo_title').click(function(){
		if(qihuo_title_num==0){
			dqihuo_fn();
		}else{
			aqihuo_fn();
		}
	})
	$('#type_aqihuo').click(function(){
		aqihuo_fn();
	})
	$('#type_dqihuo').click(function(){
		dqihuo_fn();
	})
	
	/* var scroll_h2=true;
	var scroll_img=true;
	
	$(window).scroll(function(){
		if(scroll_h2){
			if($(document).scrollTop()+$(window).height()>=1165){
				$('#scroll_h2').animate({
					top:0,
					opacity:1,
				},'slow',function(){
					scroll_h2=false
				})
			}
		}
		if($(document).scrollTop()+$(window).height()>=1200&&$(document).scrollTop()+$(window).height()<=2260){
				var img_top=-70+($(document).scrollTop()+$(window).height()-1200)/10;
				$('#scroll_img').stop().animate({
					top:img_top,
				},'slow',function(){
					
				})
		}
	})
	
	var newbanb_div=true;
	
	$('.newbanb_div').hover(function(){
		if(newbanb_div){
			$('.newbanb_div').stop().animate({width:250},'fast','linear');
			$(this).stop().animate({width:290},'fast','linear',function(){newbanb_div=true;});
			$('.newbanb_div').find('img').stop().animate({width:120,height:120},'fast','linear');
			$(this).find('img').stop().animate({width:160,height:160},'fast','linear');
			$('.newbanb_div').find('dl dt').stop().animate({fontSize:22},'fast','linear');
			$(this).find('dl dt').stop().animate({fontSize:26},'fast','linear');
		}	
		newbanb_div=false
	},function(){})
	
	$('.banb_center').mouseleave(function(){
		$('.newbanb_div').stop().animate({width:260},'fast','linear');
		$('.newbanb_div').find('img').stop().animate({width:120,height:120},'fast','linear');
		$('.newbanb_div').find('dl dt').stop().animate({fontSize:22},'fast','linear');
		setTimeout(function(){newbanb_div=true;},500);
	}) */
	var click_num=0;
	$('.test_box').click(function(){
		$(this).css({'transform':"rotateY("+-45*++click_num+"deg)"});
		/* this.style['transform']='rotateY(-45deg)'; */
	})
	
	//移动端滑动换图
	var max_eq=$('#banner ul li').size()-1;
	var mt_index = 0;
	var mt_prev = max_eq;
	var mt_next = 1;
	var bg_width=$('#banner img').width();
	$('#banner img').eq(0).css('zIndex',3);
	$('#banner img').eq(max_eq).css('zIndex',1).css('left',-bg_width);
	$('#banner img').eq(1).css('zIndex',2).css('left',bg_width);
	$('#banner ul li').eq(0).css('color','#fff').css('opacity','1');
	var mt_timer = setInterval(mt_chang_left,5000)
	$('#banner').swipe({
		swipeLeft:function(){ 
			clearInterval(mt_timer);
			mt_chang_left(mt_index);
			mt_timer = setInterval(mt_chang_left,5000);
		},
		swipeRight:function(){
			clearInterval(mt_timer);
			mt_chang_right(mt_index);
			mt_timer = setInterval(mt_chang_left,5000);
		},threshold:50
	})
	function mt_chang_left(){
		mt_prev++;
		mt_index++;	
		mt_next++;
		if (mt_prev > max_eq) mt_prev = 0;
		if (mt_index > max_eq) mt_index = 0;
		if (mt_next > max_eq) mt_next = 0;
		$('#banner li').css('color','#eee').css('opacity','0.7');
		$('#banner li').eq(mt_index).css('color','#fff').css('opacity','1');
		$('#banner img').eq(mt_prev).css('zIndex',1).stop().animate({'left' : -bg_width},'fast','linear');
		$('#banner img').eq(mt_index).css('zIndex',2).stop().animate({'left' : 0},'fast','linear');
		$('#banner img').eq(mt_next).css('zIndex',1).css('left',bg_width);
	}
	function mt_chang_right(index){
		mt_prev--;
		mt_index--;	
		mt_next--;
		if (mt_prev < 0) mt_prev = max_eq;
		if (mt_index < 0) mt_index = max_eq;
		if (mt_next < 0) mt_next = max_eq;
		$('#banner li').css('color','#eee').css('opacity','0.7');
		$('#banner li').eq(mt_index).css('color','#fff').css('opacity','1');
		$('#banner img').eq(mt_prev).css('zIndex',1).css('left',-bg_width);
		$('#banner img').eq(mt_index).css('zIndex',3).stop().animate({'left' : 0},'fast','linear');
		$('#banner img').eq(mt_next).css('zIndex',1).stop().animate({'left' : bg_width},'fast','linear');;
	}
	//涨跌判断
	if(!!$('#type .updown').length){
		var updown_length=$('#type .updown').length;
		for(var i=0;i<updown_length;i++){
			var updown=$('#type .updown').eq(i).html().charAt(1);
			if(updown=='-'){
				$('#type .money').eq(i).css('color','#008000');
				$('#type .updown_box').eq(i).css('color','#00c56b');
			}else{
				$('#type .money').eq(i).css('color','#ee3800');
				$('#type .updown_box').eq(i).css('color','#ee3800');
			}
		}
	}

	

	
	
	
	
	
})