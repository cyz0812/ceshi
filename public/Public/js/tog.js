$(function(){
	//新充值
	
	var agent_type=$('#agent_type').val();
	$('#to_zhifubao').click(function(){
		$('.web_bank').hide();
		$('.recharge_zfb').show();
		$('.recharge_method ul li').removeClass('active');
		$(this).parent().addClass('active');
		
	})
	$('#hands li').click(function(){
		$('#hands li').removeClass('active');
		$(this).addClass('active');
	})
	$('#goodPrice').blur(function(){
		if(agent_type=='aqihuo'){
			var capital_money=$(this).val();
			if(checkinvest(capital_money)){
				$('#contract label').css('color','#999');
				$('#contract label input').attr('disabled',true);
				if(capital_money<800){
					$('#contract .low input').attr('disabled',false).attr('checked','selected').parent().css('color','#0379b5');
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
				data:{'out_orderid':out_orderid,'method':method,'type':agent_type,'account':account,'contract':contract,'amount':amount,'hands':hands,'subject':subject,'body':userid},
				success:function(data){
					if(data.flag==1){
						$('#aqihuopay_form').submit();
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
		if(zfb_num.length==0){
			error_info('请填写支付宝账号');
			return false;
		}else if(checkinvest(amount)){
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
		if(zfb_num.length==0){
			error_info('请填写支付宝账号');
			return false;
		}
		if(checkinvest(amount)){
			$('#confirm_zfb').hide();
			$('#loading_img').show();
			showOverlay();
			$.ajax({
				type:'POST',
				url:conUrl+'/zfb_pay',
				data:{'out_orderid':out_orderid,'method':method,'type':agent_type,'contract':contract,'account':account,'amount':amount,'hands':hands,'subject':subject,'body':userid,'zfb_num':zfb_num},
				success:function(data){
					if(data.flag==1){
						$('#loading_img').hide();
						$('.recharge_yn').show();
					}else{
						alert('系统错误，请重试或联系客服！');
						/* window.location.reload(); */
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
			data:{"out_orderid":out_orderid,"account":account,"type":type,"type_kind":type_kind,"contract":contract,"hands":hands},
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
			data:{"out_orderid":out_orderid,"account":account,"type":type,"type_kind":type_kind,"contract":contract,"hands":hands},
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
		var regDot = /^(\d+\.\d{1,1}|\d+)$/;
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
			$('#error_system_text').text('金额只能输入一位小数');
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
			return false;
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
		if(window_width>768)$('#addcardform p input').css('border','1px solid #a9a9a9');
		if(bankname.length==0||card.length==0||name.length==0||idcard.length==0||cardprovince.length==0||cardcity.length==0||cardphone.length==0||bankbranchname.length==0){
			$('#error_info').show();
			$('#error_span').text('内容不得为空！');
			return false;
		}else if(!luhmCheck(card)){
			$('#error_info').show();
			$('#error_span').text('卡号格式错误！');
			if(window_width>768)$('#card').css('border','1px solid #f55');
			return false;
		}else if(!IdentityCodeValid(idcard)){
			$('#error_info').show();
			$('#error_span').text('身份证格式错误！');
			if(window_width>768)$('#idcard').css('border','1px solid #f55');
			return false;
		}else if(cardprovince == '请选择'){
			error_info('请选择开户省、市');
			return false;
		}else if(!/^[1]\d{10}$/.test(cardphone)){
			$('#error_info').show();
			$('#error_span').text('请输入正确的手机号！');
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
						$('#error_info').show();
						$('#error_span').text('银行卡绑定失败，请重试或联系客服！');
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
		/* var dealpwd=$('#webwithdraw_dealpwd').val(); */ 
		var out_orderid=$('#without_orderid').val();
		var userid=$('#withuserid').val();
		var type_kind=$('#type_kind').val();
		var account=$('#withdraw_account').html();
		var login_pass=$('#login_pass').val();
		var amount=$.trim($('#webwithdraw_payamount').val());
		if(changeMoney(amount)){
			$('#loading_img').show();
			showOverlay();
			$.ajax({
				type:'POST',
				url:conUrl+'/webWithdraw_pay',
				data:{"out_orderid":out_orderid,"body":userid,"amount":amount,"account":account,"type_kind":type_kind},
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
	})
	$("#webwithdraw_payamount").keydown(function(e){
		if(e.keyCode==13){
			$('#webwithdraw_btn').click();
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
	
})