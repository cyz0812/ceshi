$(function(){
	var help_c_id=$('#help_c_id').val();
	var help_par_id=$('#help_par_id').val();
	
	$('#help_par'+help_par_id).parent().find('ul').show();
	$('.help_div').removeClass('help_active');
	$('#help_par'+help_par_id).addClass('help_active');
	$('#help_c'+help_c_id).addClass('active');
})