$(function(){
	
	/* 配资向导 */
	$('#start_capital').click(function(){
		var card=$('#usercard').val();
		showOverlay();
		if(card.length<16){
			$('#addcard_system').show();
		}else{
			$('#type_select').show();
		}
	})
	$('.big_tunchu_close').click(function(){
		$('.big_tunchu').hide();
		hideOverlay();
	})
	
	/* 银行卡绑定 */
	$('#addcard_bankcode').change(function(){
		var bankname=$("#addcard_bankcode option:selected").text();
		$('#bankname').val(bankname);
	})
	$('#quick_addcard_btn').click(function(){
		var bankname=$.trim($('#bankname').val());
		var bankcode=$("#addcard_bankcode option:selected").val();
		var card=$.trim($('#card').val());
		var name=$.trim($('#idname').val());
		var idcard=$.trim($('#idcard').val());
		var cardprovince=$('#province').val();
		var cardcity=$.trim($('#city').val());
		var bankbranchname=$.trim($('#bankbranchname').val());
		var cardphone=$.trim($('#cardphone').val());
		$('#addcardform p input').css('border','1px solid #a9a9a9');
		if(bankname.length==0||card.length==0||name.length==0||idcard.length==0||cardphone.length==0){
			error_info('带 ＊ 号内容不得为空！');
			return false;
		}else if(!luhmCheck(card)){
			error_info('卡号格式错误！');
			$('#card').css('border','1px solid #f55');
			return false;
		}else if(!IdentityCodeValid(idcard)){
			error_info('身份证格式错误！');
			$('#idcard').css('border','1px solid #f55');
			return false;
		}else if(cardprovince == '请选择'){
			error_info('请选择开户省、市');
			return false;
		}else if(!/^[1]\d{10}$/.test(cardphone)){
			error_info('请输入正确的手机号！');
			$('#cardphone').css('border','1px solid #f55');
			return false;
		}else{
			$('#loading_img').show();
			showOverlay();alert(1);
			/* $.ajax({
				type:'post',
				url:conUrl+'/addcard_success',
				data:{'bankname':bankname,'bankcode':bankcode,'card':card,'name':name,'idcard':idcard,'cardprovince':cardprovince,'cardcity':cardcity,'bankbranchname':bankbranchname,'cardphone':cardphone},
				success:function(arr){
					$('#addcard_system').hide();
					if(arr.flag==1){
						$('#usercard').val(card);
						setTimeout(function(){
							$('#loading_img').hide();
							$('#type_select').show();
						},1000);
					}else{
						$('#loading_img').hide();
						hideOverlay();
						error_info('银行卡绑定失败，请重试或联系客服！');
					}
				}
			}) */
		}
	})
	$('#cardphone').keydown(function(e){
		if(e.keyCode==13){
			$('#addcard_btn').click();
		}
	})
	/* 品种选择 */
	var each_rujin=null;
	var each_peizi=null;
	var num=1;
	var first=true;
	$('.qihuo_method .aqihuo_type a').click(function(){
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
				$('.qihuo_type .qihuo_method .aqihuo_type a').css('border','1px solid #fff').css('background','#fff').css('color','#0379b5');
				$('#aqi_'+aqi_id).css('border','1px solid #0379b5').css('background','#0379b5').css('color','#fff');
				$('.type_name').val(good.type_name);
				$('.type_name').html(good.type_name);
				each_rujin=good.each_rujin;
				each_peizi=good.each_peizi;
				$('#rujin').html(good.each_rujin);
				qihuo_fn('#peizi');
				$('#peizi_danwei').html('美元');
				$('#aqihuo_select').show();
				if(first){
					first=false;
					var countdown=30;
					var countdown_span=$('#countdown');
					var hander = setInterval(function () {
					if (countdown > 0) {
						countdown--;
						$('#countdown').html(countdown);
					}
					else {
						clearInterval(hander);
						$('#gopay').css('cursor','pointer');
						$('#gopay').css('color','#fff');
						$('#gopay').css('background','#148ac6')
						$('#gopay').html("马上申请");
						$('#gopay').removeAttr("disabled");
					}
				}, 1000);
				}
			}
		})
	})
	$('#aqihuo_select .qihuo_type .qihuo_method li a').hover(function(){
		$(this).css('border','1px solid #0379b5');
	},function(){
		var aqi_id=$('#aqi_type_id').val();
		if($(this).attr('id')!='aqi_'+aqi_id){
			$(this).css('border','1px solid #fff');
		}
	});
	/* 品种更换 */
	$('.qihuo_type .qihuo_method').hover(function(){
		var num=$('.qihuo_method li').size();
		var height=num*32;
		$('.qihuo_method .li_type img').attr('src',rootUrl+'/Public/img/drop_down.png');
		$('.qihuo_method').stop().animate({height:height});
	},function(){
		$('.qihuo_method').stop().animate({height:30},function(){
			$('.qihuo_method .li_type img').attr('src',rootUrl+'/Public/img/drop_up.png');
		});
	})
	/* 国际配资 */
	//手数点击
	$('.qihuo_num ul li:not(.other_num)').click(function(){
		if($(this).attr('name')!='0'){
			$('.qihuo_num ul li').attr('name','1');
			$(this).attr('name','0');
			$('.qihuo_num_active').removeClass('qihuo_num_active');
			$(this).addClass('qihuo_num_active');
			num=parseInt($(this).find('strong').html());
		}
		qihuo_fn('#peizi');
	})
	//其他手数
	$('#other_num').click(function(){
		upOverlay();
		showOverlay();
		$('#input_num').show();
		$('#lots_num').select();
	})
	$('#input_num .input_num_close').click(function(){
		$(input_num).hide();
		downOverlay();
	})
	
	$('#input_num_btn').click(function(){
		var other_num=parseInt($(lots_num).val());
		if(other_num>0 &&other_num<=100 ){
			num=other_num
			downOverlay();
			$(input_num).hide();
			$('.qihuo_num ul li').attr('name','1');
			$('.other_num').attr('name','0');
			$('.qihuo_num_active').removeClass('qihuo_num_active');
			$('.other_num').addClass('qihuo_num_active');
			qihuo_fn('#peizi');
		}else{
			$('#error_system').show();
			if($('#capitalType').val()=='shares'){
				$('#error_system_text').text('股数须在100-10000之间');
			}else{
				$('#error_system_text').text('手数须在1-100之间');
			}
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
		}
	})
	$('#lots_num').keydown(function(e){
		if(e.keyCode==13){
			$('#input_num_btn').click();
		}
	})
	//期货函数
	function qihuo_fn(show_id){
		var rujin=num*each_rujin;
		var peizi=num*each_peizi;
		var peizi_num = peizi.toString();
		var timer = setInterval(function(){move_num(show_id,peizi_num,timer)},10);
		$('#rujin').html(rujin);
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
	//马上申请
	
	$('#gopay').click(function(){
		stopTime();
		if($("#jbp_contract_cbx").is(':checked')){
			showOverlay();
			var usercard=$('#usercard').val();
			if(usercard.length<16){
				$('#addcard_system').show();
				return false;
			}
			$('#error_system').hide();
			$('#aqihuo_select').hide();
			var confirm_money=parseInt(each_rujin*num);
			var confirm_peizi=parseInt(each_peizi*num);
			var balance=parseFloat($('#user_balance').val());
			var d_val=(balance-confirm_money).toFixed(2);
			var account=$('#account').val();
			if(account.length==6){
				$('.notempty_account').show();
				$('.empty_account').hide();
			}else{
				$('.notempty_account').hide();
				$('.empty_account').show();
			}
			$('#confirm_money').html(confirm_money);
			$('.confirm_money').html(confirm_money);
			$('.confirm_peizi').html(confirm_peizi);
			$('.user_balance').html(balance);
			$('#goodPrice').val(-d_val);
			$('#confirm_hands').html(num);
			$('#dealconfirm').show();
			if(d_val>=0){
				$('.d_html').html('本次支付后,剩余<span class="red">'+toDecimal(d_val)+'</span>元');
				$('#select_bank_p').hide();
				$('#balance_enough_p').show();
				$('#confirm_btn').show();
				$('.confirm_recharge').hide();
			}else{
				$('.d_html').html('本次支付还差<span class="red">'+toDecimal(-d_val)+'</span>元');
				$('#select_bank_p').show();
				$('#balance_enough_p').hide();
				$('#confirm_btn').hide();
				$('.confirm_recharge').show();
			}
			
		}else{
			$('#error_system').show();
			if($('#capitalType').val()=='dqihuo'){
				$('#error_system_text').text('请先阅读并同意《国内期货合同》');
			}else if($('#capitalType').val()=='aqihuo'){
				$('#error_system_text').text('请先阅读并同意《国际期货合同》');
			}else if($('#capitalType').val()=='shares'){
				$('#error_system_text').text('请先阅读并同意《合作投资协议书》');
			}
			setTime=setTimeout(function(){$('#error_system').hide()},keepTime);
		}
	})
	//点击协议
	$('#showDomesticContract').click(function(){
		windowOpen(conUrl+'/DomesticContract','国内期货合同',900,700);
	});
	$('#showInternationalContract').click(function(){
		windowOpen(conUrl+'/InternationalContract','国际期货合同',900,700);
	});
	$('#showSharesContract').click(function(){
		windowOpen(conUrl+'/SharesContract','股票配资合同',900,700);
	});
	$('#bind_account').click(function(){
		upOverlay();
		$('#add_account').show();
	});
	$('#a_account_btn').click(function(){
		var account=$.trim($('#a_account').val());
		var account_password=$.trim($('#a_account_password').val());
		if(account.length==6 && account_password.length!=0){
			upOverlay(10003);
			$('#loading_img').show();
			$.ajax({
				type:'post',
				url:conUrl+'/a_account',
				data:{'a_account':account,'a_account_password':account_password},
				success:function(arr){
					$('#loading_img').hide();
					downOverlay();
					if(arr.flag==1){
						$('#account').val(account);
						$('.account').html(account);
						$('#add_account').hide();
						$('#dealconfirm').hide();
						$('#gopay').click();
					}else if(arr.flag==0){
						$('#add_account').hide();
						error_info('账户绑定失败，请重试或联系客服！');
					}
				}
			})
		}else{
			error_info('账号或密码格式不正确');
		}
		
	});
	
	enter_fn('#a_account_password','#a_account_btn');
	
	$('#a_account_close').click(function(){
		downOverlay();
		$('#add_account').hide();
	})
	
	$('#confirm_recharge').click(function(){
		if($('#select_bank').val()==0){
			error_info('请选择充值银行');
			return false;
		}else{
			upOverlay();
			$('#recharge_yn').show();
			$('#recharge_form').submit();
		}
	})
	
	$('#recharge_success').click(function(){
		$('#recharge_yn').hide();
		var out_orderid=$('#out_orderid').val();
		var userid=$('#userid').val();
		$('#loading_img').show();
		$.ajax({
			type:'POST',
			url:conUrl+'/had_record',
			data:{'out_orderid':out_orderid,'userid':userid},
			success:function(arr){
				$('#loading_img').hide();
				$('.out_orderid').val(arr.out_orderid);
				$('#user_balance').val(arr.balance);
				if(arr.flag==1){
					downOverlay();
					$('#dealconfirm').hide();
					$('#dealconfirm').hide();
					$('#gopay').click();
				}else{
					$('#recharge_error').show();
				}
			}
		});
	})
	
	$('#rechange_bank').click(function(){
		$('#recharge_yn').hide();
		var out_orderid=$('#out_orderid').val();
		var userid=$('#userid').val();
		$('#loading_img').show();
		$.ajax({
			type:'POST',
			url:conUrl+'/had_record',
			data:{'out_orderid':out_orderid,'userid':userid},
			success:function(arr){
				$('#loading_img').hide();
				$('.out_orderid').val(arr.out_orderid);
				$('#user_balance').val(arr.balance);
				$('.user_balance').html(arr.balance);
				downOverlay();
				$('#dealconfirm').hide();
				$('#gopay').click();
			}
		});
	})
	$('.recharge_yn_close').click(function(){
		downOverlay();
		$('.recharge_yn').hide();
		$('#dealconfirm').hide();
		$('#gopay').click();
	})
	$('#dealconfirm_back').click(function(){
		$('#dealconfirm').hide();
		$('#aqihuo_select').show();
	});
	
	$('#confirm_btn').click(function(){
		var method='capital';
		var type_kind=$('#capitalType').val();
		var userid=$('#userid').val();
		var name=$('#name').val();
		var account=$('#account').val();
		var account_pwd=$('#account_pwd').val();
		var typename=$('#type_name').val();
		var amount=parseInt($('#confirm_money').html());
		var hands=parseInt($('#confirm_hands').html());
		var allocation=parseInt($('#confirm_peizi').html());
		var out_orderid=$('#out_orderid').val();
		var flag=false;
		$('#loading_img').show();
		upOverlay();
		$.ajax({
			url:conUrl+"/capital_pay",
			type:'POST',
			data:{
				"capital_type":0,
				"type_kind":type_kind,
				"method":method,
				"userid":userid,
				"name":name,
				"out_orderid":out_orderid,
				"amount":amount,
				"hands":hands,
				"allocation":allocation,
				"account":account,
				"account_password":account_pwd,
				"type":typename
				},
			success:function(data){
				if(data.flag==1){
					setTimeout(function(){location.href=conUrl+'/dealRecord';},1000);
				}else{
					$('#loading_img').hide();
					downOverlay();
					hideOverlay();
					$('#dealconfirm').hide();
					alert('支付错误有误，请联系客服！');
				}
			}
		});
		
	})
	

	$('#province').change(function(){
		selectprovince(this);
	})
	
	var list1 = new Array;
    var list2 = new Array;
    list1[list1.length] = "请选择";
    list1[list1.length] = "北京市";
    list1[list1.length] = "天津市";
    list1[list1.length] = "河北省";
    list1[list1.length] = "山西省";
    list1[list1.length] = "内蒙古";
    list1[list1.length] = "辽宁省";
    list1[list1.length] = "吉林省";
    list1[list1.length] = "黑龙江省";
    list1[list1.length] = "上海市";
    list1[list1.length] = "江苏省";
    list1[list1.length] = "浙江省";
    list1[list1.length] = "安徽省";
    list1[list1.length] = "福建省";
    list1[list1.length] = "江西省";
    list1[list1.length] = "山东省";
    list1[list1.length] = "河南省";
    list1[list1.length] = "湖北省";
    list1[list1.length] = "湖南省";
    list1[list1.length] = "广东省";
    list1[list1.length] = "广西自治区";
    list1[list1.length] = "海南省";
    list1[list1.length] = "重庆市";
    list1[list1.length] = "四川省";
    list1[list1.length] = "贵州省";
    list1[list1.length] = "云南省";
    list1[list1.length] = "西藏自治区";
    list1[list1.length] = "陕西省";
    list1[list1.length] = "甘肃省";
    list1[list1.length] = "青海省";
    list1[list1.length] = "宁夏回族自治区";
    list1[list1.length] = "新疆维吾尔自治区";
    list1[list1.length] = "香港特别行政区";
    list1[list1.length] = "澳门特别行政区";
    list1[list1.length] = "台湾省";
    list1[list1.length] = "其它";
	
	list2[list2.length] = new Array("请选择");
    list2[list2.length] = new Array("北京", "东城区", "西城区", "崇文区", "宣武区", "朝阳区", "丰台区", "石景山区", " 海淀区（中关村）", "门头沟区", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云县", "延庆县", " 其他");
    list2[list2.length] = new Array("和平区", "河东区", "河西区", "南开区", "红桥区", "塘沽区", "汉沽区", "大港区",
                "西青区", "津南区", "武清区", "蓟县", "宁河县", "静海县", "其他");
    list2[list2.length] = new Array("石家庄市", "张家口市", "承德市", "秦皇岛市", "唐山市", "廊坊市", "衡水市",
                "沧州市", "邢台市", "邯郸市", "保定市", "其他");
    list2[list2.length] = new Array("太原市", "朔州市", "大同市", "长治市", "晋城市", "忻州市", "晋中市", "临汾市",
                "吕梁市", "运城市", "其他");
    list2[list2.length] = new Array("呼和浩特市", "包头市", "赤峰市", "呼伦贝尔市", "鄂尔多斯市", "乌兰察布市",
                "巴彦淖尔市", "兴安盟", "阿拉善盟", "锡林郭勒盟", "其他");
    list2[list2.length] = new Array("沈阳市", "朝阳市", "阜新市", "铁岭市", "抚顺市", "丹东市", "本溪市", "辽阳市",
                "鞍山市", "大连市", "营口市", "盘锦市", "锦州市", "葫芦岛市", "其他");
    list2[list2.length] = new Array("长春市", "白城市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "延边朝鲜族自治州", "其他");
    list2[list2.length] = new Array("哈尔滨市", "七台河市", "黑河市", "大庆市", "齐齐哈尔市", "伊春市", "佳木斯市",
                "双鸭山市", "鸡西市", "大兴安岭地区(加格达奇)", "牡丹江", "鹤岗市", "绥化市　", "其他");
    list2[list2.length] = new Array("黄浦区", "卢湾区", "徐汇区", "长宁区", "静安区", "普陀区", "闸北区", "虹口区",
                "杨浦区", "闵行区", "宝山区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "南汇区", "奉贤区", "崇明县", "其他");
    list2[list2.length] = new Array("南京市", "徐州市", "连云港市", "宿迁市", "淮安市", "盐城市", "扬州市", "泰州市",
                "南通市", "镇江市", "常州市", "无锡市", "苏州市", "其他");
    list2[list2.length] = new Array("杭州市", "湖州市", "嘉兴市", "舟山市", "宁波市", "绍兴市", "衢州市", "金华市",
                "台州市", "温州市", "丽水市", "其他");
    list2[list2.length] = new Array("合肥市", "宿州市", "淮北市", "亳州市", "阜阳市", "蚌埠市", "淮南市", "滁州市",
                "马鞍山市", "芜湖市", "铜陵市", "安庆市", "黄山市", "六安市", "巢湖市", "池州市", "宣城市", "其他");
    list2[list2.length] = new Array("福州市", "南平市", "莆田市", "三明市", "泉州市", "厦门市", "漳州市", "龙岩市", "宁德市", "其他");
    list2[list2.length] = new Array("南昌市", "九江市", "景德镇市", "鹰潭市", "新余市", "萍乡市", "赣州市", "上饶市",
                "抚州市", "宜春市", "吉安市", "其他");
    list2[list2.length] = new Array("济南市", "聊城市", "德州市", "东营市", "淄博市", "潍坊市", "烟台市", "威海市",
                "青岛市", "日照市", "临沂市", "枣庄市", "济宁市", "泰安市", "莱芜市", "滨州市", "菏泽市", "其他");
    list2[list2.length] = new Array("郑州市", "三门峡市", "洛阳市", "焦作市", "新乡市", "鹤壁市", "安阳市", "濮阳市",
                "开封市", "商丘市", "许昌市", "漯河市", "平顶山市", "南阳市", "信阳市", "周口市", "驻马店市", "其他");
    list2[list2.length] = new Array("武汉市", "十堰市", "襄樊市", "荆门市", "孝感市", "黄冈市", "鄂州市", "黄石市",
                "咸宁市", "荆州市", "宜昌市", "随州市", "恩施土家族苗族自治州", "仙桃市", "天门市", "潜江市", "神农架林区", "其他");
    list2[list2.length] = new Array("长沙市", "张家界市", "常德市", "益阳市", "岳阳市", "株洲市", "湘潭市", "衡阳市",
                "郴州市", "永州市", "邵阳市", "怀化市", "娄底市", "湘西土家族苗族自治州", "其他");
    list2[list2.length] = new Array("广州市", "清远市市", "韶关市", "河源市", "梅州市", "潮州市", "汕头市", "揭阳市",
                "汕尾市", " 惠州市", "东莞市", "深圳市", "珠海市", "中山市", "江门市", "佛山市", "肇庆市", "云浮市",
                "阳江市", "茂名市", "湛江市", " 其他");
    list2[list2.length] = new Array("南宁市", "桂林市", "柳州市", "梧州市", "贵港市", "玉林市", "钦州市", "北海市",
                "防城港市", "崇左市", "百色市", "河池市", "来宾市", "贺州市", "其他");
    list2[list2.length] = new Array("海口市", "三亚市", "其他");
    list2[list2.length] = new Array("渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区",
                "万盛区", "双桥区", "渝北区", "巴南区", "万州区", "涪陵区", "黔江区", "长寿区", "合川市", "永川市",
                "江津市", "南川市", "綦江县", "潼南县", "铜梁县", "大足县", "璧山县", "垫江县", "武隆县", "丰都县",
                "城口县", "开县", "巫溪县", "巫山县", "奉节县", "云阳县", "忠县", "石柱土家族自治县", "彭水苗族土家族自治县",
                "酉阳土家族苗族自治县", "秀山土家族苗族自治县", "其他");
    list2[list2.length] = new Array("成都市", "广元市", "绵阳市", "德阳市", "南充市", "广安市", "遂宁市",
                "内江市", "乐山市", "自贡市", "泸州市", "宜宾市", "攀枝花市", "巴中市", "资阳市", "眉山市", "雅安",
                "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州县", "其他");
    list2[list2.length] = new Array("贵阳市", "六盘水市", "遵义市", "安顺市", "毕节地区", "铜仁地区",
                "黔东南苗族侗族自治州", "黔南布依族苗族自治州", "黔西南布依族苗族自治州", "其他");
    list2[list2.length] = new Array("昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市",
                "临沧市", "宁德市", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "楚雄彝族自治州", "红河哈尼族彝族自治州",
                "文山壮族苗族自治州", "大理白族自治州", "迪庆藏族自治州", "西双版纳傣族自治州", "其他");
    list2[list2.length] = new Array("拉萨市", "那曲地区", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "阿里地区", "其他");
    list2[list2.length] = new Array("西安市", "延安市", "铜川市", "渭南市", "咸阳市", "宝鸡市", "汉中市", "安康市", "商洛市", "其他");
    list2[list2.length] = new Array("兰州市 ", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "酒泉市",
                "张掖市", "庆阳市", "平凉市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州", "其他");
    list2[list2.length] = new Array("西宁市", "海东地区", "海北藏族自治州", "黄南藏族自治州", "玉树藏族自治州",
                "海南藏族自治州", "果洛藏族自治州", "海西蒙古族藏族自治州", "其他");
    list2[list2.length] = new Array("银川市", "石嘴山市", "吴忠市", "固原市", "中卫市", "其他");
    list2[list2.length] = new Array("乌鲁木齐市", "克拉玛依市", "喀什地区", "阿克苏地区", "和田地区", "吐鲁番地区",
                "哈密地区", "塔城地区", "阿勒泰地区", "克孜勒苏柯尔克孜自治州", "博尔塔拉蒙古自治州",
                "昌吉回族自治州伊犁哈萨克自治州", "巴音郭楞蒙古自治州", "河子市", "阿拉尔市", "五家渠市", "图木舒克市", "其他");
    list2[list2.length] = new Array("香港", "其他");
    list2[list2.length] = new Array("澳门", "其他");
    list2[list2.length] = new Array("台湾", "其他");

    var ddlProvince = document.getElementById("province");
    var ddlCity = document.getElementById("city");
    for(var i =0;i<list1.length; i++)
    {
        var option = document.createElement("option");
        option.appendChild(document.createTextNode(list1[i]));
        option.value = list1[i];
        ddlProvince.appendChild(option);
        //city initialize
        var firstprovince = list2[0];
        for (var j = 0; j < firstprovince.length; j++) {
            var optioncity = document.createElement("option");
            optioncity.appendChild(document.createTextNode(firstprovince[j]));
            optioncity.value = firstprovince[j];
            ddlCity.appendChild(optioncity);
        }
    }
    function indexof(obj,value)
    {
        var k=0;
        for(;k<obj.length;k++)
        {
            if(obj[k] == value)
            return k;
        }
        return k;
    }
    function selectprovince(obj) {
        ddlCity.options.length = 0;//clear
        var index = indexof(list1,obj.value);
        var list2element = list2[index];
        for(var i =0;i<list2element.length; i++)
        {
            var option = document.createElement("option");
            option.appendChild(document.createTextNode(list2element[i]));
            option.value = list2element[i];
            ddlCity.appendChild(option);
        }
    }
	selectprovince(ddlProvince);
})