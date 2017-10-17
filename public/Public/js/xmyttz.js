$(function(){
	$('.picture_box').click(function(){
		var src=$(this).attr('data');
		var name=$(this).attr('name');
		$('#show_picture .img_box img').attr('src',src);
		$('#show_picture .img_box p').text(name);
		$('.picture_change').attr('data',$(this).index());
		$('#show_picture').show();
		showOverlay();
	})
	$('#picture_prev').click(function(){
		var max=$('.picture_box').size()-1;
		var num=parseInt($(this).attr('data'));
		var data= num-1 < 0 ? max : num-1;
		picture_change(data);
	})
	$('#picture_next').click(function(){
		var max=$('.picture_box').size()-1;
		var num=parseInt($(this).attr('data'));
		var data= num+1 > max ? 0 : num+1;
		picture_change(data);
	})
	
	function picture_change(data){
		var src=$('.picture_box').eq(data).attr('data');
		var name=$('.picture_box').eq(data).attr('name');
		$('#show_picture .img_box img').attr('src',src);
		$('#show_picture .img_box p').text(name);
		$('.picture_change').attr('data',data);
	}
	
	$('#show_picture_close').click(function(){
		$('#show_picture').hide();
		hideOverlay();
	})
	
	$('.download_top li').click(function(){
		$('.download_top li').removeClass('active');
		$(this).addClass('active');
		$('.download_box .download_content').hide();
		$('.'+$(this).attr('data')).show();
	})
	
	/* 帮助中心 */
	var help_c_id=$('#help_c_id').val();
	var help_par_id=$('#help_par_id').val();
	
	$('#help_par'+help_par_id).parent().find('ul').show();
	$('.help_div').removeClass('help_active');
	$('#help_par'+help_par_id).addClass('help_active');
	$('#help_c'+help_c_id).addClass('active');
})