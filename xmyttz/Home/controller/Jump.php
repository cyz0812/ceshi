<?php
namespace app\Home\controller;
use think\Controller;
use think\Request;
class Jump extends Controller {
	public function _empty(Request $request) {
		$action = $request->action();
		$account = $request->param('account');
		getAlert(null,'/jump/Jump/'.$action.'?account='.$account);
	}
}