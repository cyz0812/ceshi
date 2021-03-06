<?php
/*
 * 首页模块
 */
namespace app\index\controller;
use think\Controller;
use think\Request;
class Error extends Controller {
	
	public function index(Request $request){
        //根据当前控制器名来判断要执行那个城市的操作
        $actionName = $request->controller();
        return $this->location($actionName);
    }
    
    public function regInvite(Request $request){
    	$inviteCode = $request->param('inviteCode');
    	getAlert(null,'/login/Register/register?inviteCode='.$inviteCode);
    }
    
	protected function location($inviteCode) {
		getAlert(null,'/login/Register/register?inviteCode='.$inviteCode);
	}
}
