$(function(){
	//用户名检测
	$('.setname_sub').click(function(){
		var name=$('#setname .name_input').val();
		if(length(name)<2||length(name)>16){
			alert('中文需要在1-8位之间,英文在2-16位之间！')
			return false;
		}else{
			if(!/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(name)){
				alert('用户名存在非法字符！');
				return false;
			}
		}
	})
	
	length = function(str)   {  
		return str.replace(/[^\x00-\xff]/g,"aa").length;  
	};
	//头像设置
	$('#setface .file_input').change(function(){
		var file=this.files[0];
		var reader=new FileReader();
		reader.onload=function(){
			// 通过 reader.result 来访问生成的 DataURL
			var url=reader.result;
			$('#mt_face_img').attr('src',url);
		};
		reader.readAsDataURL(file);
	});
	if(!!document.getElementById('myCan')){
		var canvas=document.getElementById('myCan');
		var ctx=canvas.getContext('2d');
	}
	$('.face_cut').click(function () {
		ctx.clearRect(0,0,80,80);
		var postUrl=appUrl+"/Index/Index/saveface"; 
		var img=document.getElementById('mt_face_img');
		var nW=img.naturalWidth/$('.face_box').width();
		var nH=img.naturalHeight/$('.face_box').height();
		var newX=$('#chooseBox').position().left*nW;
		var newY=$('#chooseBox').position().top*nH;
		var newW=$('#chooseBox').width()*nW;
		var newH=$('#chooseBox').height()*nH;
		ctx.drawImage(img,newX,newY,newW,newH,0,0,80,80);
		var image=new Image();
		image.src = canvas.toDataURL("image/png");
		$('#img_input').val(image.src);
	});
	
	
	
	//头像裁切显示
	$('.face_cut').click(function(){
		showOverlay();
		$('.cut_box').show();
	})
	$('.cut_close').click(function(){
		hideOverlay();
		$('.cut_box').hide();
	})
	$('.cut_sub').click(function(){
		hideOverlay();
		$('.cut_box').hide();
		var postUrl=appUrl+"/Index/Index/saveface"; 
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
		/* var httprequest=new XMLHttpRequest();
		httprequest.open('POST',postUrl,true);
		httprequest.send(fd);
		httprequest.onreadystatechange= function () {
			if(httprequest.status==200 && httprequest.readyState==4){
				
				
			 }
		};*/
		$.ajax({
			url:postUrl,
			type:"POST",
			data:fd,
			processData: false,
			contentType: false,
			dataType:'json',
			success:function(){}
		});
		/* $.ajax({
			type:'POST',
			url:postUrl,
			data:fd,
			processData: false,
			contentType: false,
			dataType:'json',
			success:function(data){
				if(data.flag==1){
					flag=1
					alert(1)
				}else if(data.flag==0){
					alert('该序号与其他序号重复，请修改（可返回列表查看已有序号）');
				}
			}
		}); */
		
		/* var data=canvas.toDataURL();
		// dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
		data=data.split(',')[1];
		data=window.atob(data);
		var ia = new Uint8Array(data.length);
		for (var i = 0; i < data.length; i++) {
			ia[i] = data.charCodeAt(i);
		};
		// canvas.toDataURL 返回的默认格式就是 image/png
		var blob=new Blob([ia], {type:"image/png"});
		var fd=new FormData();
		fd.append('file',1);
		var postUrl=appUrl+"/Index/Index/saveface"; 
		$.ajax({
			type:'POST',
			url:postUrl,
			data:{'file':blob},
			success:function(data){
				if(data.flag==1){
					flag=1
				}else if(data.flag==0){
					alert('该序号与其他序号重复，请修改（可返回列表查看已有序号）');
				}
			}
		});
		var xmlHttp = new XMLHttpRequest();  
		xmlHttp.open("POST", postUrl);  
		xmlHttp.send(fd);  
		//ajax回调  
		xmlHttp.onreadystatechange = state_Change;
		function state_Change(){
			if (xmlHttp.readyState==4){
				alert("loaded")
				if (xmlHttp.status==200){
				  // 200 = OK
					// ...our code here...
					alert('OK')
				}else{
					alert("Problem retrieving XML data");
				}
			}
		} */
	})
	if(!!$('#chooseBox').css('left')){
		var f=$('.face_box');
		var fW=f.width();
		var fH=f.height();
		var c=$('#chooseBox');
		var cW=c.width();
		var cH=c.height();
		var cX=c.position().left;
		var cY=c.position().top;
		var pxy=$('.point-xy');
		var pW=$('.point-xy').width();
		var pH=$('.point-xy').height();
		pxy.css('left',cW-pW/2);
		pxy.css('top',cH-pH/2);
		var dragging = false;
		var iX, iY;
		var drag_flag=false;
		var jX, jY;
		$("#chooseBox").mousedown(function(e) {
			drag_flag = true;
			jX = e.clientX - this.offsetLeft;
			jY = e.clientY - this.offsetTop;
		});
		$(document).mousemove(function(e) {
			if (drag_flag) {
				var e = e || window.event;
				cX = e.clientX - jX;
				cY = e.clientY - jY;
				cW=c.width();
				cH=c.height();
				cX = cX > 0 ? cX : 0;
				cY = cY > 0 ? cY : 0;
				cX = cX < fW-cW ? cX : fW-cW;
				cY = cY < fH-cH ? cY : fH-cH;
				$("#chooseBox").css({"left":cX + "px", "top":cY + "px"});
			}
		})
		
		$(".point-xy").mousedown(function(e) {
			dragging = true;
			p=this;
			pW = $(this).width();
			pH = $(this).height();
			iX = e.clientX - this.offsetLeft;
			iY = e.clientY - this.offsetTop;
			
		});
		$(document).mousemove(function(e){
			if (dragging) {	
			drag_flag = false;
			var e = e || window.event;
			var oX = e.clientX - iX;
			var oY = e.clientY - iY;
			
			oX = oX > -pW/2 ? oX : -pW/2;
			oY = oY > -pH/2 ? oY : -pH/2;
			
			oX = oX < fW-cX-pW/2 ? oX : fW-cX-pW/2;
			oY = oY < fH-cY-pH/2 ? oY : fH-cY-pH/2;
			cW = oX + pW/2;
			cH = oY + pH/2;
			$('.point-xy').css({"left":oX + "px", "top":oY + "px"});
			c.width(cW);
			c.height(cH);
			
			}
		});
		$(document).mouseup(function(e) {
			dragging = false;
			drag_flag = false;
		})
		
		$("#chooseBox").dblclick(function() {
			$("#chooseBox").css({"left":0 + "px", "top":0 + "px"});
			$("#chooseBox").width(fW);
			$("#chooseBox").height(fH);
			$('.point-xy').css({"left":(fW-pW/2) + "px", "top":(fH-pH/2) + "px"});
		});
		
	}
	
	/* 显示遮罩层 */
	function showOverlay() {
		$("#overlay").height(pageHeight());
		$("#overlay").width(pageWidth());

		// fadeTo第一个参数为速度，第二个为透明度
		// 多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
		$("#overlay").fadeTo(200, 0.5);
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
})