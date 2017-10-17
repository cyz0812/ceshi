$(function(){
	/* if(withdrawal){
		$('#peizi_success_box').show();
		showOverlay();
	}
	$('#peizi_success_close').click(function(){
		$('#peizi_success_box').hide();
		hideOverlay();
	}) */
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