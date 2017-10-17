<?php
/*
 * 主页模块
 * 登录后显示,分为上、左右、右三部分
 * add by liang 2017-08-10
 */
namespace app\base\controller;
use app\base\controller\Base;
use app\base\model\Admin as adminModel;
use think\Session;
class Admin extends Base {
    public function admin() {
    	echo $this->fetch();
    }
    /*
	 * 主页头部
	 * 判断是否显示提示
	 * prompt = 0 不提示，prompt = 1提示
	 */
    public function head() {
    	if($this->admin['prompt'] == 1){
    		$head = adminModel::head();
    		$this->assign('head',$head);

    	}
    	$this->assign('admin',$this->admin);
    	    	echo $this->fetch();
    } 
    /*
     * 主页左部
     * 根据权限显示左边列表
     */
    public function left() {
    	$left = adminModel::left($this->admin);
    	//var_dump($left['title']);
    	$this->assign('title',$left['title']);
    	$this->assign('list',$left['list']);
    	echo $this->fetch();
    }
    public function right() {
     	echo $this->fetch();
    }
    //刷新头部提示
    public function refresh() {
    	$arr = adminModel::refresh($this->admin);
    	return json($arr);
    }
    
}