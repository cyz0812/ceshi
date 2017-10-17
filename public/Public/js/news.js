$(function(){
	$('.title_p a').hover(function(){
		$(this).css('color','#0379b5');
		$(this).parent().parent().find('i').css('background','#0379b5');
	},function(){
		$(this).css('color','#333');
		$(this).parent().parent().find('i').css('background','#bbb');
	})
})