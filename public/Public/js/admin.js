$(function(){
	//后台管理员登录
	$('#login_sub').click(function(){
		if($('#login_user').val()!='' && $('#login_pass').val()!=''){
			var user=$('#login_user').val();
			var pwd=$('#login_pass').val();
			var flag=0;
			$.ajax({
				type:'POST',
				url:conUrl+'/login',
				data:{'user':user,'password':pwd},
				success:function(data){
					if(data.flag==1){
						location.href="/base/Admin/admin";
					}else if(data.flag==0){
						alert('用户名或密码错误！');
					}
				},
				async:false
			});
			if(flag==0){
				return false;
			}
		}else{
			alert('账号密码不得为空！');
			return false;
		}
	})
	$('#login_pass').keydown(function(e){
		if(e.keyCode==13){
			$('#login_sub').click();
		}
	})
	//出入金提示
	var deposit_music = document.getElementById("deposit_music");
	var withdraw_music = document.getElementById("withdraw_music");
	var prior_music = document.getElementById("prior_music");
	var open_music = document.getElementById("open_music");
	var withdraw_music_yn='on';
	var bell_num=0;
	$("#audio_btn").click(function(){
		if(bell_num++%2==0){ 
			$("#audio_btn b").html('关');
			withdraw_music.pause(); 
			withdraw_music_yn='off';
		}else{ 
			withdraw_music_yn='on';
			$("#audio_btn b").html('开');
		}
	})
	if($('#deposit').html()){
		var deposit=$('#deposit').html();
		var withdraw=$('#withdraw').html();
		var prior=$('#prior').html();
		var open_account=$('#open').html();
		var submission_num=$('#submission').html();
		if(deposit>0){
			$('#rujin_bell').show();
		}else{
			$('#rujin_bell').hide();
		}
		if(withdraw>0){
			$('#chujin_bell').show();
		}else{
			$('#chujin_bell').hide();
		}
		if(prior>0){
			$('#prior_bell').show();
		}else{
			$('#prior_bell').hide();
		}
		if(open_account>0){
			$('#open_bell').show();
		}else{
			$('#open_bell').hide();
		}
		if(submission_num.length!=0){
			$('#submission_bell').show();
		}else{
			$('#submission_bell').hide();
		}
		refreshOnTime();
		setInterval(refreshOnTime,3000);
		function refreshOnTime(){
			$.ajax({
				type:'POST',
				url:conUrl+'/refresh',
				data:{'time':3},
				success:function(data){
					$('#deposit').html(data.deposit);
					$('#withdraw').html(data.withdraw);
					$('#prior').html(data.prior);
					$('#open').html(data.open);
					$('#submission').html(data.submission);
					if(data.deposit>0){
						$('#rujin_bell').show();
						deposit_music.play();
					}else{
						$('#rujin_bell').hide();
						deposit_music.pause();
					}
					if(data.withdraw>0){
						$('#chujin_bell').show();
						var bell_withdraw=1;
					}else{
						$('#chujin_bell').hide();
						var bell_withdraw=0;
					}
					if(data.prior>0){
						$('#prior_bell').show();
						prior_music.play();
					}else{
						$('#prior_bell').hide();
						prior_music.pause();
					}
					if(data.open_account>0){
						$('#open_bell').show();
						open_music.play();
					}else{
						$('#open_bell').hide();
						open_music.pause();
					}
					if(data.submission>0){
						$('#submission_bell').show();
					}else{
						$('#submission_bell').hide();
					}
					
					if(withdraw_music_yn=='on' && bell_withdraw!=0){
						withdraw_music.play(); 
					}else{
						withdraw_music.pause(); 
					}
				}
			});
			
		}
	};
	$('#to_deposit').click(function(){
		$(parent.frames["left"].document).find("#left ul li a").removeClass('active');
		$(parent.frames["left"].document).find("#in_deposit").addClass('active');
	})
	
	$('#to_withdraw').click(function(){
		$(parent.frames["left"].document).find("#left ul li a").removeClass('active');
		$(parent.frames["left"].document).find("#in_withdraw").addClass('active');
	})
	
	$('#to_prior').click(function(){
		$(parent.frames["left"].document).find("#left ul li a").removeClass('active');
		$(parent.frames["left"].document).find("#in_prior").addClass('active');
	})
	
	$('#to_capital').click(function(){
		$(parent.frames["left"].document).find("#left ul li a").removeClass('active');
		$(parent.frames["left"].document).find("#in_capital").addClass('active');
	})
	
	$('#to_withdrawal').click(function(){
		$(parent.frames["left"].document).find("#left ul li a").removeClass('active');
		$(parent.frames["left"].document).find("#in_withdrawal").addClass('active');
	})
	
	$('#to_transform').click(function(){
		$(parent.frames["left"].document).find("#left ul li a").removeClass('active');
		$(parent.frames["left"].document).find("#in_transform").addClass('active');
	})
	$('#to_open').click(function(){
		$(parent.frames["left"].document).find("#left ul li a").removeClass('active');
		$(parent.frames["left"].document).find("#in_open").addClass('active');
	})
	//代理开户提醒
	
	
	
	//左侧选择
	$('#left h3').click(function(){
		var sumWidth =1;
		$(this).parent().find("li").each(function(){
			sumWidth += $(this).height()+1;
		});
		if($(this).parent().find('ul').height()!=0){
			$(this).parent().find('ul').stop().animate({'height':0});
			$(this).find('span').css({'transform':'rotateZ(180deg)'});
		}else{
			$('#left h3').parent().find('ul').stop().animate({'height':0});
			$('#left h3').find('span').css({'transform':'rotateZ(180deg)'});
			$(this).parent().find('ul').stop().animate({'height':sumWidth});
			$(this).find('span').css({'transform':'rotateZ(0deg)'});
		}
	})
	
	$('#left li a').click(function(){
		$('#left li a').removeClass('active');
		$(this).addClass('active');
	})
	
	$('.had_click').click();
	//阻止默认事件
	$('.stop_default').click(function(e){
		e.stopPropagation();
	})
	
	//select默认选中
	$('.default_select option').each(function(){
		if($(this).val()==$(this).parent().attr('data')){
			$(this).attr('selected',true);
		}
	})
	//添加
	$('.add_show').click(function(){
		var index_id=$(this).attr('data');
		$(".add_tr"+index_id).show();
		$(this).hide();
		$(this).parent().find('.confirm_add').css('display','inline-block');
		$(this).parent().find('.cancel_add').css('display','inline-block');
	})
	$('.cancel_add').click(function(){
		var index_id=$(this).attr('data');
		$(".add_tr"+index_id).hide();
		$(this).parent().find('.add_show').css('display','inline-block');
		$(this).parent().find('.confirm_add').hide();
		$(this).parent().find('.cancel_add').hide();
	})
	
	$('.confirm_add').click(function(){
		var index_id=$(this).attr('data');
		$(".add_tr"+index_id+" .add_input").each(function(){
			if($.trim($(this).val()).length==0){
				alert('内容不可为空');
				return false;
			}
		})
		$("#add_form"+index_id).submit();
	})
	//删除
	$('.delete_a').click(function(e){
		e.stopPropagation();
	})
	$('.to_delete').click(function(e){
		if (confirm('确认要删除？')) {
			location.href=conUrl+$(this).attr('data');
		}
	})
	
	//通道显示切换
	$('.switch_display').click(function(e){
		e.stopPropagation();
		var display=$(this).attr('value');
		var id=$(this).attr('data');
		var name=$(this).attr('name');
		var _this=$(this);
		$.ajax({
			type:'POST',
			url:conUrl+'/switch_display',
			data:{'id':id,'name':name,'display':display},
			success:function(data){
				if(data.flag==1){
					if(display==1){
						_this.html('　');
						_this.attr('value',0);
					}else if(display==0){
						_this.html('是');
						_this.attr('value',1);
					}
				}else if(data.flag==0){
					alert('显示修改错误，请重试或联系技术人员！');
				}
			}
		});
	})
	//首页图片删除
	$('.delete_bg').click(function(){
		if (confirm('确认要删除？')) {
			location.href=conUrl+'/yt_bg/delete/'+$(this).attr('data');
		}
	})
	//交易软件删除
	$('.delete_download').click(function(){
		if (confirm('确认要删除？')) {
			location.href=conUrl+'/yt_download/delete/'+$(this).attr('data');
		}
	})
	//上传文件删除
	$('.delete_file').click(function(){
		if (confirm('确认要删除？')) {
			location.href=conUrl+'/yt_file/delete/'+$(this).attr('data');
		}
	})
	//盈透风采删除
	$('.delete_picture').click(function(){
		if (confirm('确认要删除？')) {
			location.href=conUrl+'/yt_picture/delete/'+$(this).attr('data');
		}
	})
	//点击跳转详情
	$('.right_content .table_a tbody tr').click(function(){
		location.href=$(this).find('.href_a').attr('href');
	})
	//添加阻止跳转
	$('.add_tr').click(function(e){
		e.stopPropagation();
	})
	//条件默认选中
	$('#select_condition option').each(function(){if($(this).val()==select_condition){$(this).attr('selected',true);}})
    // $('#select_type option').each(function(){if($(this).val()==select_type){$(this).attr('selected',true);}})
    // $('#select_kind option').each(function(){if($(this).val()==select_kind){$(this).attr('selected',true);}})
	$('.select_option').each(function () {
			var select_data=$(this).attr('data');

			$(this).find('option').each(function(){if($(this).val()==select_data){$(this).attr('selected',true);}});
	})
	//图片上传
	$("#imageupload").change(function() {  
        var $file = $(this);  
        var objUrl = $file[0].files[0];  
        //获得一个http格式的url路径:mozilla(firefox)||webkit or chrome  
        var windowURL = window.URL || window.webkitURL;  
        //createObjectURL创建一个指向该参数对象(图片)的URL  
        var dataURL;  
        dataURL = windowURL.createObjectURL(objUrl); 	
        $("#imageview").attr("src",dataURL);  
    });   
	//图片清空
	$('#clearFile').click(function(){
		clearFile();
	})
	function clearFile(){
		var file = $("#imageupload") ;
		$('#imageview').attr('src','');
		file.after(file.clone().val(""));      
		file.remove(); 
	}
	
	//文件上传
	var check_num=0;
	$('#select_all').click(function(){
		if(check_num++%2==0){
			$('.sendee input').prop('checked',true);
		}else{
			$('.sendee input').prop('checked',false);
		}
	})
	//首页图片
	//增加、修改图片验证
	
	$('#add_bg .sub').click(function(){
		var postUrl=conUrl+"/is_num"; 
		if($('#add_bg .name').val()!='' && $('#imageupload').val()!=''){
			var num = parseInt($('#add_bg .num').val());
			var flag=0;
			if(num){
				$.ajax({
					type:'POST',
					url:postUrl,
					data:{'num':num},
					success:function(data){
						if(data.flag==1){
							flag=1
						}else if(data.flag==0){
							alert('该序号与其他序号重复，请修改（可返回列表查看已有序号）');
						}
					},
					async:false
				});
				if(flag==1){
					return true;
				}else{
					return false;
				}
			}
			return true;
		}else{
			alert('名称、图片不得为空！（序号必须为数字）');
			return false;
		}
	});
	$('#update_bg .sub').click(function(){
		var hidden_num=$('#hidden_num').val();
		var postUrl=conUrl+"/is_num"; 
		if(parseInt($('#update_bg .num').val())!='' && $('#update_bg .name').val()!=''){
			var num = parseInt($('#update_bg .num').val());
			if(num != hidden_num){
				var flag=0;
				$.ajax({
					type:'POST',
					url:postUrl,
					data:{'num':num},
					success:function(data){
						if(data.flag==1){
							flag=1
						}else if(data.flag==0){
							alert('该序号与其他序号重复，请修改（可返回列表查看已有序号）');
						}
					},
					async:false
				});
				if(flag==1){
					return true;
				}else{
					return false;
				}
			}else{
				return true;
			}
		}else{
			alert('序号、名称不得为空！（序号必须为数字）');
			return false;
		}
	})
	//关于我们
	$('#about_add_sub').click(function(){
		var title=$('#about_add_title').val();
		if(title.length<=0){
			alert('标题不得为空');
			return false;
		}
	})
	$('.delete_about').click(function(){
		if (confirm('确认要删除？')) {
			location.href=conUrl+'/yt_about/delete/'+$(this).attr('data');
		}
	})
	//帮助中心管理
	$('#help_add_sub').click(function(){
		var title=$('#about_add_title').val();
		if(title.length<=0){
			alert('标题不得为空');
			return false;
		}
	})
	$('.delete_help').click(function(){
		if (confirm('确认要删除？')) {
			location.href=conUrl+'/yt_help/delete/'+$(this).attr('name');
		}
	})
	$('#help_serial').blur(function(){
		var raw_serial=$('#raw_serial').html();
		var help_serial = parseInt($('#help_serial').val());
		var par_num=$('#par_num').val();
		if(!isNaN(help_serial) && help_serial !=raw_serial){
			$.ajax({
				type:'POST',
				url:conUrl+'/is_serial',
				data:{'serial':help_serial,'par_num':par_num},
				success:function(data){
					if(data.flag==1){
						flag=1
					}else if(data.flag==0){
						alert('该序号与其他序号重复，请修改（可返回列表查看已有序号）');
					}
				}
			});
		}
	})
	//新闻
	//新闻删除
	$('.delete_news').click(function(){
		if (confirm('确认要删除？')) {
			location.href=conUrl+'/yt_news/delete/'+$(this).attr('data');
		}
	})
	//新闻时间事件
	
	$('#news_time').focus(function(){
		$('#show_time').show();
		$('#show_time span').html($(this).val());
	})
	$('#news_time').keyup(function(){
		$('#show_time span').html($(this).val());
	})
	//时间格式判断
	$('#news_time').blur(function(){
		var news_time=$(this).val();
		if(news_time=='' || /^[12]{1}[901]{1}[\d]{2}-[01]{1}[\d]{1}-[0123]{1}[\d]{1}\s[012]{1}[\d]{1}:[01245]{1}[\d]{1}:[01245]{1}[\d]{1}$/.test(news_time)){
			if($('.news_sub').css('display')=='none'){
				$('.news_sub').css('display','block');
				$('.news_info').css('display','none');
			}
		}else{
			alert('输入的时间有误，请重新输入');
			if($('.news_sub').css('display')!='none'){
				$('.news_sub').css('display','none');
				$('.news_info').css('display','block');
			}
		}
		$('#show_time').hide();
	})
	//交易管理
	//二维码管理
	$('.erweima_show').each(function(){
		if($(this).attr('data')==1){
			$(this).attr('checked','selected');
		}
	})
	$('.erweima_show').click(function(){
		var id=$(this).val();
		var type=$(this).attr('name');
		var _this=$(this);
		$.ajax({
			type:'POST',
			url:conUrl+'/erweima_show',
			data:{'id':id,'type':type},
			success:function(data){
				if(data.flag==1){
					alert('二维码显示修改成功');
				}else if(data.flag==0){
					alert('显示修改错误，请重试！');
					window.location.reload();
				}	
			}
		});
	})
	//国内期货管理
	$('.dqihuo_show_hide').click(function(e){
		e.stopPropagation();
		var state=$(this).attr('data');
		var id=$(this).attr('name');
		var _this=$(this);
		$.ajax({
			type:'POST',
			url:conUrl+'/dqihuo_show_hide',
			data:{'id':id,'state':state},
			success:function(data){
				if(data.flag==1){
					if(state==1){
						_this.html('隐藏');
						_this.attr('data',0);
					}else if(state==0){
						_this.html('显示');
						_this.attr('data',1);
					}
				}else if(data.flag==0){
					alert('显示修改错误，请重试！');
				}
			}
		});
	})
	//国内期货删除
	$('.delete_dqihuo').click(function(){
		if (confirm('确认要删除？')) {
			location.href=conUrl+'/yt_dqihuo/delete/'+$(this).attr('name');
		}
	})
	
	//国际期货管理
	$('.aqihuo_show_hide').click(function(e){
		e.stopPropagation();
		var state=$(this).attr('data');
		var id=$(this).attr('name');
		var _this=$(this);
		$.ajax({
			type:'POST',
			url:conUrl+'/aqihuo_show_hide',
			data:{'id':id,'state':state},
			success:function(data){
				if(data.flag==1){
					if(state==1){
						_this.html('否');
						_this.attr('data',0);
					}else if(state==0){
						_this.html('是');
						_this.attr('data',1);
					}
				}else if(data.flag==0){
					alert('显示修改错误，请重试！');
				}
			}
		});
	})
	//国际期货删除
	$('.delete_aqihuo').click(function(){
		if (confirm('确认要删除？')) {
			location.href=conUrl+'/yt_aqihuo/delete/'+$(this).attr('name');
		}
	})
	
	
	/* 消息发送 */
	$("#message_checkall").click(function(){   
		if(this.checked){   
			$("#user_list :checkbox").prop("checked", true);  
		}else{   
		$("#user_list :checkbox").prop("checked", false);
		}   
	});
	/* $("#message_type1").change(function(){
		if(this.checked){
			$("input[type=checkbox]").prop("checked", true);  
		}   
	}); */
	/* $("#message_type2").change(function(){
		if(this.checked){
			$("input[type=checkbox]").prop("checked", false);
		}   
	}); */
	$('#user_list a').each(function(){
		var _this=$(this);
		_this.change(function(){
			if(!_this.is(':checked')){
				$("#message_type2").prop("checked", true);
			}
		})
	})
	$('#message_btn').click(function(){
		var message_title=$('#message_title').val();
		var message_check=$("#user_list :checked");
		
		if(message_check.size()<1){
			alert('请至少选择一个接收人！')
		}else if(message_title.length==0){
			alert('标题不得为空');
		}else{
			$('#message_form').submit();
		}
	})
	
	/* 消息管理 */
	var $messagelist_type = $("#messagelist_type");
	var $messagelist_userid = $("#messagelist_userid");
	var $messagelist_form = $("#messagelist_form");
	$("#message_typelist a").each(function () {
		var $this = $(this);
		if ($this.attr("data") == $messagelist_type.val()) {
			$this.addClass("active");
		} else {
			$this.removeClass("active");
		}
	})

	$("#message_useridlist a").each(function () {
		var $this = $(this);
		if ($this.attr("data") == $messagelist_userid.val()) {
			$this.addClass("active");
		} else {
			$this.removeClass("active");
		}
	})

	$("#message_typelist a").click(function () {
		var $this = $(this);
		var messagelist_type = $this.attr("data");
		$messagelist_type.val(messagelist_type);
		$messagelist_form.submit();
	})
	$("#message_useridlist a").click(function () {
		var $this = $(this);
		var messagelist_userid = $this.attr("data");
		$messagelist_userid.val(messagelist_userid);
		$messagelist_form.submit();
	})
	
	$("#checkall").click(function(){   
		$(".body input[type='checkbox']").prop("checked", true);   
	});
	$("#checknull").click(function(){   
		$(".body input[type='checkbox']").prop("checked", false);   
	});
	$('#message_delete').click(function(){
		var message_check=$(".body :checked");
		if(message_check.size()<1){
			alert('未选中任何信息！')
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
							alert('删除错误，请重试');
							location.reload();
						};
					}  
				});  
			}
		}
	})
	$('#message_detail_btn').click(function(){
		var message_id=$('#message_id').val();
		if(confirm('您确定要删除吗？')){
			location.href=conUrl+'/message_detail/delete/'+message_id;
		}
	})
	
	//信管家用户管理
	$('#export_xgjuser').click(function(){
		showOverlay();
		$('#export_pop').show();
	})
	$('#xgjuser_getcode').click(function(){
		var getCode=$(this);
		var time=59;
		getCode.css('cursor','default');
		getCode.css('color','#999');
		getCode.css('background','#eee');
		getCode.attr({ "disabled": "disabled" });
		$('#xgjuser_code').select();
		$.ajax({
			url: rootUrl+"/master/demo/message_csvCode.php",
			type: 'post',
//			data: {'phone':15260180650},
			data: {'phone':13799389122},
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
	})
	$('#export_sub').click(function(){
		var code=$('#xgjuser_code').val();
		if(code.length==0){
			alert('验证码不得为空');
			return false;
		}else{
			hideOverlay();
			$('#export_pop').hide();
		}
	})
	$('.pop_close').click(function(){
		$('.pop_system').hide();
		hideOverlay();
	})
	$('.delete_xgjuser').click(function(){
		var xgjuser_id=$(this).attr('data');
		var regtime=($(this).attr('value'))
		if(confirm('您确定要删除吗？')){
			location.href=conUrl+'/yt_xgjuser/delete/'+xgjuser_id+'/time/'+regtime;
		}
	})
	//网站用户删除
	$('.delete_user').click(function(){
		var user_id=$(this).attr('data');
		var regtime=($(this).attr('value'))
		if(confirm('您确定要删除吗？')){
			location.href=conUrl+'/yt_userlist/delete/'+user_id+'/time/'+regtime;
		}
	})
	//入金详情
	var $day = $("#day");
	var $recordType = $("#recordType");
	var $record_form = $("#record_form");
	$("#deatilTimeId a").each(function () {
		var $this = $(this);
		if ($this.attr("data") == $day.val()) {
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

	$("#deatilTimeId a").click(function () {
		var $this = $(this);
		var day = $this.attr("data");
		$day.val(day);
		$record_form.submit();
	})
	$("#detailTypeId a").click(function () {
		var $this = $(this);
		var tradetype = $this.attr("data");
		$recordType.val(tradetype);
		$record_form.submit();
	})
	
	$('.page_box .num').eq(0).css('border-left','1px solid #eee');
	
	//信管家入金
	/* $('#deposit_form_sub').click(function(){
		var deposit_id=$('#deposit_id').val();
		$.ajax({
			type:'POST',
			url:conUrl+'/complete_deposit',
			data:{"deposit_id":deposit_id,"complete":1},
			success:function(data){
				if(data.flag==1){
					$('#detail_deposit_form').submit();
					$('#deposit_form_sub').hide();
				}else if(data.flag==0){
					alert('提交有误，请重试或者联系相关技术人员');
				}
			}
		});
	})

	$('#finish_btn').click(function(){
		var deposit_id=$('#deposit_id').val();
		var out_orderid=$('#deposit_out_orderid').val();
		$.ajax({
			type:'POST',
			url:conUrl+'/deposit_success',
			data:{'out_orderid':out_orderid},
			success:function(data){
				if(data.flag==1){
					location.href=conUrl+'/reply_deposit/success/'+deposit_id;
				}else{
					alert('客户开户数据更新失败，请截图并联系相关技术人员！');
				}
			},
		});
	}) */
	//代理客户开户回复
	$('#reply_open_agent').click(function(){
		var capital_id=$('#capital_id').val();
		var out_orderid=$('#capital_out_orderid').val();
		var type_kind=$('#type_kind').val();
		var userid=$('#capital_userid').val();
		var capital_phone=$('#capital_phone').text();
		var account=$('#capital_account').val();
		var account_pwd=$('#capital_pwd').val();
        var invite_code=$('#invite_code').val();
        var invite_phone=$('#invite_phone').val();
		if(account.length!=0 && account_pwd!=0){
			$.ajax({
				type:'POST',
				url:conUrl+'/open_success',
				data:{'invite_code':invite_code,'invite_phone':invite_phone,"capital_id":capital_id,"out_orderid":out_orderid,"type_kind":type_kind,'userid':userid,'account':account,'account_password':account_pwd},
				success:function(data){
					if(data.flag==1){
						$.ajax({
							type:'POST',
							url:rootUrl+'/master/demo/open_success.php',
							data:{'phone':capital_phone,'account':account,'password':account_pwd},
							success:function(data){
								if(data.indexOf('success')){
									/* bell_yse(); */
									location.href=conUrl+'/reply_open/success/'+capital_id;
								}else{
									alert('消息发送失败，请重试或联系相关技术人员！');
									location.href=conUrl+'/reply_open/'+capital_id;
								}
							}
						});
					}else{
						alert('客户开户数据更新失败，请截图并联系相关技术人员！');
					}
				},
			});
		}else{
			alert('请填写新开账户的账号和密码')
			return false;
		}
	})
	//代理客户配资回复
	$('#reply_capital_agent').click(function(){
		var capital_id=$('#capital_id').val();
		location.href=conUrl+'/reply_capital/success/'+capital_id;
	})
	//开户回复
	$('#open_reply_btn').click(function(){
		var type_kind=$('#type_kind').val();
		var capital_id=$('#capital_id').val();
		var capital_userid=$('#capital_userid').val();
		var capital_phone=$('#capital_phone').html();
		var capital_amount=$('#capital_amount').html();
		var capital_account=$('#capital_account').val();
		var capital_pwd=$('#capital_pwd').val();
		var out_orderid=$('#capital_out_orderid').val();
		var invite_code=$('#invite_code').val();
        var invite_phone=$('#invite_phone').val();
		if(capital_account.length!=0 && capital_pwd!=0){
			$.ajax({
				type:'POST',
				url:conUrl+'/open_success',
				data:{'invite_code':invite_code,'invite_phone':invite_phone,'userid':capital_userid,'account':capital_account,'account_password':capital_pwd,"out_orderid":out_orderid,"type_kind":type_kind,"amount":capital_amount},
				success:function(data){
					if(data.flag==1){
						$.ajax({
							type:'POST',
							url:rootUrl+'/master/demo/open_success.php',
							data:{'phone':capital_phone,'account':capital_account,'password':capital_pwd},
							success:function(data){
								if(data.indexOf('success')){
									/* bell_yse(); */
									location.href=conUrl+'/reply_open/success/'+capital_id;
								}else{
									alert('消息发送失败，请重试或联系相关技术人员！');
									location.href=conUrl+'/reply_open/'+capital_id;
								}
							}
						});
					}else{
						alert('客户开户数据更新失败，请截图并联系相关技术人员！');
					}
				},
			});
		}else{
			alert('请填写新开账户的账号和密码')
			return false;
		}
		
	})
	//配资回复
	$('#capital_reply_btn').click(function(){
		var type_kind=$('#type_kind').val();
		var capital_id=$('#capital_id').val();
		var capital_phone=$('#capital_phone').html();
		var capital_amount=$('#capital_amount').html();
		var capital_account=$('#capital_account').val();
		var out_orderid=$('#capital_out_orderid').val();
		
		$.ajax({
			type:'POST',
			url:conUrl+'/capital_success',
			data:{'out_orderid':out_orderid,'amount':capital_amount},
			success:function(data){
				if(data.flag==1){
					$.ajax({
						type:'POST',
						url:rootUrl+'/master/demo/capital_success.php',
						data:{'phone':capital_phone,'account':capital_account,'money':capital_amount},
						success:function(data){
							if(data.indexOf('success')){
								/* bell_yse(); */
								location.href=conUrl+'/reply_capital/success/'+capital_id;
							}else{
								alert('消息发送失败，请重试或联系相关技术人员！');
								location.href=conUrl+'/reply_capital/'+capital_id;
							}
						},
					});
				}else{
					alert('客户开户数据更新失败，请截图并联系相关技术人员！');
				}
			},
		});
			
	})
	$('#reply_capital_web').click(function(){
		var type_kind=$('#type_kind').val();
		var capital_id=$('#capital_id').val();
		var capital_phone=$('#capital_phone').html();
		var capital_amount=$('#capital_amount').html();
		var capital_account=$('#capital_account').val();
		var out_orderid=$('#capital_out_orderid').val();
		$.ajax({
			type:'POST',
			url:rootUrl+'/master/demo/capital_success.php',
			data:{'phone':capital_phone,'account':capital_account,'money':capital_amount},
			success:function(data){
				if(data.indexOf('success')){
					/* bell_yse(); */
					location.href=conUrl+'/reply_capital/success/'+capital_id;
				}else{
					alert('消息发送失败，请重试或联系相关技术人员！');
					location.href=conUrl+'/reply_capital/'+capital_id;
				}
			},
		});	
	})
	//入金回复
	$('#deposit_reply_btn').click(function(){
		var deposit_id=$('#deposit_id').val();
		var deposit_phone=$('#deposit_phone').html();
		var deposit_amount=$('#deposit_amount').html();
		var deposit_account=$('#deposit_account').val();
		var out_orderid=$('#deposit_out_orderid').val();
		$.ajax({
			type:'post',
			url:conUrl+'/deposit_success',
			data:{"out_orderid":out_orderid},
			success:function(arr){
				if(arr.flag==1){
					$.ajax({
						type:'POST',
						url:rootUrl+'/master/demo/deposit_success_reply.php',
						data:{'phone':deposit_phone,'account':deposit_account,'money':deposit_amount},
						success:function(data){
							if(data.indexOf('success')){
								/* bell_yse(); */
								location.href=conUrl+'/reply_deposit/success/'+deposit_id;
							}else{
								alert('消息发送失败，请重试或联系相关技术人员！');
								location.href=conUrl+'/reply_deposit/'+deposit_id;
							}
						}
					});
				}else{
					alert('客户开户数据更新失败，请截图并联系相关技术人员！');
				}
			}
		});
				
	})
	
	
	//入金完成
	$('#success_deposit').click(function(){

			/* bell_yse(); */
            // var deposit_id=$('#deposit_id').val();
            // location.href=conUrl+'/reply_deposit/success/'+deposit_id;

		var deposit_id=$('#deposit_id').val();
		var invite_phone=$('#invite_phone').val();
		var phone=$('#kehu_phone').val();
		var amount=$('#amount').val();
		var account=$('#account').val();
		var laiyuan=$('#laiyuan').val();
		var shichang=$('#shichang').val();
		var userid=$('#userid').val();
        var patrn=/^\d{11}$/;
        var kehu_phone='';
        var daili_phone='';
        if(patrn.test(phone)){
            kehu_phone=phone;
        }else{
            kehu_phone='';
        }
        if(invite_phone!=''){
            daili_phone=invite_phone;
        }else{
            daili_phone='';
        }

		$.ajax({
			type:'post',
			url:'/xinguanjia/deposit/deposit_success',
			data:{'userid':userid,'shichang':shichang,'laiyuan':laiyuan,'success':deposit_id,'invite_phone':daili_phone,'phone':kehu_phone,'account':account,'amount':amount},
			success:function (data) {
				if(data.flag==1){
                    alert('处理成功');
                    location.href=conUrl+"/yt_deposit";
                }else{
                    alert('客户开户数据更新失败，请截图并联系相关技术人员！');
                }
            }
		})

	})
	//入金错误
	$('#error_deposit').click(function(){
		/* bell_yse(); */
		var deposit_id=$('#deposit_id').val();
		location.href=conUrl+'/reply_deposit/id/'+deposit_id;
	})
	//信管家出金
	$('#success_withdraw').click(function(){
		/* bell_yse(); */
		var withdraw_id=$('#withdraw_id').val();
		location.href=conUrl+'/reply_withdraw/success/'+withdraw_id;
	})
	//网站出金完成
	$('#success_webwithdraw').click(function(){
		var withdraw_id=$('#withdraw_id').val();
		var userid=$('#userid').val();
		var withdraw_phone=$('#withdraw_phone').val();
		var out_orderid=$('#out_orderid').val();
		var withdraw_account=$('#withdraw_account').val();
		var withdraw_amount=$('#withdraw_amount').val();
		var invite_phone=$('#invite_phone').val();
        var patrn=/^\d{11}$/;
        var kehu_phone='';
        var daili_phone='';
        if(patrn.test(withdraw_phone)){
            kehu_phone=withdraw_phone;
        }else{
            kehu_phone='';
        }
        if(invite_phone!=''){
            daili_phone=invite_phone;
        }else{
            daili_phone='';
        }
		$.ajax({
			type:'POST',
			url:conUrl+'/withdraw_success',
			data:{'phone':kehu_phone,'invite_phone':daili_phone,'id':withdraw_id,'account':withdraw_account,'out_orderid':out_orderid,'userid':userid,'amount':withdraw_amount},
			success:function(data){
				if(data.flag==1){
                    alert('处理成功');
                    location.href=conUrl+"/yt_withdraw";
				}else{
					alert('客户开户数据更新失败，请截图并联系相关技术人员！');
				}
			}
		});
	})
	//出金错误
	$('#error_withdraw').click(function(){
		if(confirm('确定是否出金错误？')){
			var withdraw_id=$('#withdraw_id').val();
			location.href=conUrl+'/reply_withdraw/error/'+withdraw_id;
		}
	})
	//网站出金错误
	$('#error_webwithdraw').click(function(){
		var withdraw_id=$('#withdraw_id').val();
		location.href=conUrl+'/reply_withdraw/id/'+withdraw_id;
	})
	$('#reply_withdraw_error').click(function(){
		var withdraw_id=$('#withdraw_id').val();
		var userid=$('#userid').val();
		var phone=$('#withdraw_phone').html();
		var amount=$('#withdraw_amount').html();
		var account=$('#withdraw_account').html();
		var error_text=$('#error_text option:selected').html();
		var out_orderid=$('#out_orderid').val();
		var withdraw_invite_phone=$('#withdraw_invite_phone').html();
        var patrn=/^\d{11}$/;
        var kehu_phone='';
        var daili_phone='';
        if(patrn.test(phone)){
            kehu_phone=phone;
        }else{
            kehu_phone='';
        }
        if(withdraw_invite_phone!=''){
            daili_phone=withdraw_invite_phone;
        }else{
            daili_phone='';
        }
		$.ajax({
			type:'POST',
			url:conUrl+'/withdraw_error',
			data:{'invite_phone':daili_phone,'id':withdraw_id,'out_orderid':out_orderid,'userid':userid,'amount':amount,'error_text':error_text,'phone':kehu_phone,'account':account},
			success:function(data){
				if(data.flag==1){
					alert('处理成功');
					location.href=conUrl+"/yt_withdraw";
				}else{
					alert('客户开户数据更新失败，请截图并联系相关技术人员！');
				}
			},
		});
	})
	//提现完成
	$('#success_withdrawal').click(function(){
		/* bell_yse(); */
		var out_orderid=$('#withdrawal_out_orderid').val();
		location.href=conUrl+'/success_withdrawal/success/'+out_orderid;
	})
	
	$('#reload').click(function(){
		location.reload();
	})
	//网站期转商完成
	
	$('#relpy_transform_amount').blur(function(){
		/* bell_yse(); */
		var amonut=parseFloat($(this).val());
		var balance=parseFloat($('#balance').html());
		var transform_balance=amonut+balance;
		$('#transform_balance').val(transform_balance);
	})
	
	$('#success_transform').click(function(){
		var transform_id=$('#transform_id').val();
		var out_orderid=$('#transform_out_orderid').val();
		var amount=$('#transform_amount').val();
		var userid=$('#transformuserid').val();
		var account=$('#transform_account').val();
		$.ajax({
			type:'POST',
			url:conUrl+'/transform_success',
			data:{'out_orderid':out_orderid,'amount':amount,'userid':userid},
			success:function(data){
				if(data.flag==1){
					$.ajax({
						type:'POST',
						url:rootUrl+'/master/demo/transform_success.php',
						data:{'phone':13799389122,'account':account,'money':amount},
						success:function(data){
							if(data.indexOf('success')){
								/* bell_yse(); */
								location.href=conUrl+'/reply_transform/success/'+transform_id;
							}else{
								alert('短信发送失败，请联系相关技术人员！');
								location.href=conUrl+'/reply_transform/success/'+transform_id;
							}
						},
					});
					
				}else{
					alert('客户开户数据更新失败，请截图并联系相关技术人员！');
				}
			}
		});
	})
	//网站期转商错误
	$('#error_transform').click(function(){
		var transform_id=$('#transform_id').val();
		location.href=conUrl+'/reply_transform/id/'+transform_id;
	})
	
	$('#reply_transform_btn').click(function(){
		var out_orderid=$('#out_orderid').val();
		var userid=$('#transformuserid').val();
		var transform_id=$('#transform_id').val();
		var phone=$('#transform_phone').html();
		var account=$('#transform_account').html();
		var amount=parseFloat($('#relpy_transform_amount').val());
		var transform_balance=parseFloat($('#transform_balance').val());
		$.ajax({
			type:'POST',
			url:conUrl+'/transform_success',
			data:{'out_orderid':out_orderid,'amount':amount,'userid':userid,'account':account,'transform_balance':transform_balance,'phone':phone},
			success:function(data){
				if(data.flag==1){
					/* bell_yse(); */
					location.href=conUrl+'/reply_transform/success/'+transform_id;
				}else{
					alert('期转商数据更新失败，请截图并联系相关技术人员！');
				}
			}
		});
		
	})
	
	$('#reply_transform_error').click(function(){
		var out_orderid=$('#out_orderid').val();
		var transform_id=$('#transform_id').val();
		var userid=$('#transformuserid').val();
		var phone=$('#transform_phone').html();
		var account=$('#transform_account').html();
		var amount=$('#transform_amount').html();
		var error_text=$('#error_text').html();
		
		
		$.ajax({
			type:'POST',
			url:conUrl+'/transform_error',
			data:{'out_orderid':out_orderid,'amount':amount,'userid':userid,'account':account,'phone':phone,'error_text':error_text},
			success:function(data){
				if(data.flag==1){
					/* bell_yse(); */
					location.href=conUrl+'/reply_transform_error/error/'+transform_id;
				}else{
					alert('期转商数据更新失败，请截图并联系相关技术人员！');
				}
			},
		});		
	})
	//添加推荐人
	$('#add_invite').click(function(){
		location.href='/website/invitelist/add_invitelist';
	})
	$('#confirm_add_invite').click(function () {
		var  invite_code=$('#invite_code').val();
        var  invite_name=$('#invite_name').val();
        var  account_front=$('#account_front').val();
        var  bail=$('#bail').val();
        var  level=$('#level').val();
        var  group=$('#group').val();
        var  fee=$('#fee').val();
        var  phone=$('#phone').val();
        var  password=$('#password').val();
        var path=/^\d{3}$/;
        if(!path.test(account_front)&&account_front!=''){
        	alert('账号要前三位');
        	return false;
		}
        $.ajax({
            url:'/website/invitelist/has_invite_code',
            type:'post',
            data:{'invite_code':invite_code},
            success:function(data){
                if(data.flag==1){
                    alert(' 邀请码重复！');
                    return false;
                }else if(data.flag==0){
                    alert('该邀请码可以使用！');
                    $.ajax({
                        type:'post',
                        url:'/website/invitelist/add_data',
                        data:{'invite_code':invite_code,'invite_name':invite_name,'account_front':account_front,
                            'bail':bail,'level':level,'group':group,'fee':fee,'phone':phone,'password':password
                        },
                        success:function (data) {
                            if(data.flag==1){
                                alert('添加成功');
                                location.href='/website/invitelist/yt_invitelist';
                            }
                            else{
                                alert('添加失败');
                                location.href='/website/invitelist/yt_invitelist';
                            }
                        }
                    })
                }
            }
        })

    })
    $('#back_invitelist').click(function () {
        location.href='/website/invitelist/yt_invitelist';
    })
	
	// $('#invite_code').blur(function(){
	// 	var invite_code=$(this).val();
	// 	if(invite_code.length==0){
	// 		return false;
	// 	}
    //
	// 	$.ajax({
	// 		url:'/website/invitelist/has_invite_code',
	// 		type:'post',
	// 		data:{'invite_code':invite_code},
	// 		success:function(data){
	// 			if(data.flag==1){
     //               alert(' 邀请码重复！');
	// 			}else if(data.flag==0){
     //                alert('该邀请码可以使用！');
    //
	// 			}
	// 		}
	// 	})
	// })
	
	// $('#confirm_add_invite').click(function(){
	// 	$('#invite_form').submit();
	// })
	
	$('.invite_delete').click(function(){
		var delete_id=$(this).attr('data');
		if(confirm('确定要删除吗？')){
			location.href=conUrl+'/yt_invitelist/delete/'+delete_id;
		}
	})
	//代理短信
	$('.agent_delete').click(function(){
		var delete_id=$(this).attr('data');
		if(confirm('确定要删除吗？')){
			location.href=conUrl+'/yt_agent/delete/'+delete_id;
		}
	})
/* 显示遮罩层 */
function showOverlay() {
	$("#overlay").height(pageHeight());
	$("#overlay").width(pageWidth());

	// fadeTo第一个参数为速度，第二个为透明度
	// 多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
	$("#overlay").fadeTo(200, 0.8);
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
/* 遮罩层上移 */
function upOverlay(num){
	var index=!!num ? num : 10001;
	$('#overlay').css('z-index',index);
}
/* 遮罩层下移 */
function downOverlay(num){
	var index=!!num ? num : 10000;
	$('#overlay').css('z-index',index);
}
//错误信息函数
function error_info(info){
	$('#error_system').show();
	$('#error_system_text').text(info);
	setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
}

//开户失败

    $('#error_open').click(function(){
        if(confirm('确定是否开户错误？')){
            var withdraw_id=$('#deposit_id').val();
            location.href=conUrl+'/open_error/error/'+withdraw_id;
        }
    })

	$('#reply_open_error').click(function () {
		var id=$('#withdraw_id').val();
		var userid=$('#userid').val();
		var out_orderid = $('#out_orderid').val();
		var name=$('#withdraw_name').html();
		var phone=$('#withdraw_phone').html();
		var withdraw_amount=$('#withdraw_amount').html();
        var error_text=$('#error_text option:selected').html();
        var contract=$('#contract').val();
        var type_kind=$('#type_kind').val();
        var invite=$('#invite').val();
        var type=$('#type').val();
		var patrn=/^\d{11}$/;
        var kehu_phone='';

        if(patrn.test(phone)){
            kehu_phone=phone;
        }else{
            kehu_phone='';
        }

		$.ajax({
			type:'post',
			url:'/website/open/webopen_error',
			data:{'amount':withdraw_amount,'type':type,'type_kind':type_kind,'contract':contract,'id':id,'userid':userid,'out_orderid':out_orderid,'name':name,'phone':kehu_phone,'text':error_text},
			success:function (data) {
                if(data.flag==1){
                    alert('处理成功');
                    location.href=conUrl+"/yt_open";
                }else{
                    alert('客户开户数据更新失败，请截图并联系相关技术人员！');
                }
            }
		})
    })
	$('#reply_deposit_error_a').click(function () {
        var id=$('#withdraw_id').val();
        var userid=$('#userid').val();
        var out_orderid = $('#out_orderid').val();
        var account=$('#withdraw_account').html();
        var phone=$('#withdraw_phone').html();
        var invite_phone=$('#withdraw_invite_phone').html();
        var amount=$('#withdraw_amount').html();
        var error_text=$('#error_text option:selected').html();
        var invite=$('#invite').val();
        var patrn=/^\d{11}$/;
        var kehu_phone='';
        var daili_phone='';
        if(patrn.test(phone)){
            kehu_phone=phone;
        }else{
            kehu_phone='';
        }
        if(invite_phone!=''){
            daili_phone=invite_phone;
        }else{
            daili_phone='';
        }
        $.ajax({
            type:'post',
            url:'/xinguanjia/deposit/deposit_error',
            data:{'amount':amount,'id':id,'userid':userid,'out_orderid':out_orderid,'account':account,'phone':kehu_phone,'text':error_text,'invite_phone':daili_phone},
            success:function (data) {
                if(data.flag==1){
                    alert('处理成功');
                    location.href=conUrl+"/yt_deposit";
                }else{
                    alert('客户开户数据更新失败，请截图并联系相关技术人员！');
                }
            }
        })
    })


//	优先更改成功

    $('#success_prior').click(function(){
//
	/* bell_yse(); */
       var deposit_id=$('#deposit_id').val();
        location.href=conUrl+'/reply_prior/success/'+deposit_id;
//
//     var deposit_id=$('#deposit_id').val();
//     var out_orderid=$('#deposit_out_orderid').val();
//     var type=$('#type').val();
//     var contract=$('#contract').val();
//     var add_type=$('#add_type').val();
//     var hands=$('#hands').val();
//     var invite_phone=$('#invite_phone').val();
//     var phone=$('#phone').val();
//     var amount=$('#amount').val();
//     var account=$('#account').val();
//     var userid=$('#userid').val();
//     var patrn=/^\d{11}$/;
//     var kehu_phone='';
//     var daili_phone='';
//     if(patrn.test(phone)){
//         kehu_phone=phone;
//     }else{
//         kehu_phone='';
//     }
//     if(invite_phone!=''){
//         daili_phone=invite_phone;
//     }else{
//         daili_phone='';
//     }
//
//     $.ajax({
//         type:'post',
//         url:'/xinguanjia/prior/prior_success',
//         data:{'success':deposit_id,'userid':userid,'account':account,'amount':amount,'id':deposit_id,'out_orderid':out_orderid,'type':type,'invite_phone':daili_phone,'phone':kehu_phone},
//         success:function (data) {
//             if(data.flag==1){
//                 alert('处理成功');
//             }else{
//                 alert('客户开户数据更新失败，请截图并联系相关技术人员！');
//             }
//         }
//     })
//
 })
	$('#error_prior').click(function() {
//
		/* bell_yse(); */
        var deposit_id = $('#deposit_id').val();
        location.href = conUrl + '/reply_prior/error/' + deposit_id;
    })

	$('#agent_confirm').click(function () {
		var account_front=$('#account_front').val();
        var invite_phone=$('#invite_phone').val();
        var id=$('#agent_id').val();
        var   account='';
        var patrn=/^\d{3}$/;
        if(patrn.test(account_front)){
            account=account_front;
        }else{
        	alert('账号前三位');
        	return false;
		}
        $.ajax({
        	type:'post',
			url:'/xinguanjia/agent/agent_change',
			data:{'id':id,'account':account,'invite_phone':invite_phone},
			success:function (data) {
                if(data.flag==1){
                    alert('处理成功');
                    location.href=conUrl+"/yt_agent";
                }else{
                    alert('客户开户数据更新失败，请截图并联系相关技术人员！');
                }
            }
		})
    })


})