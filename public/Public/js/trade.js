$(function(){
	var row=$('.goods .updown span').length;
	for(var i=0;i<row;i++){
		var updown=$('.goods .updown span').eq(i).html().charAt(0);
		if(updown=='-'){
			$('.goods .money').eq(i).css('color','#00c56b');
			$('.goods .updown span').eq(i).css('background','#00c56b');
		}else{
			$('.goods .money').eq(i).css('color','#ee3800');
			$('.goods .updown span').eq(i).css('background','#ee3800');
		}
	}
})