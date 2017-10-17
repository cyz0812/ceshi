<?php
/*
 * 前台判断登录
 */
namespace app\login\controller;
use think\Controller;
use app\website\model\User as UserModel;
use think\Session;
class Base extends controller {

	public static function loginUser($url='') {
		if(empty(session('phone')) && empty(session('uniqid'))) {
			if(!empty($url)) getAlert(null,$url);
			return false;
		}
		$map['phone']  = session('phone');
		$map['uniqid'] = session('uniqid');
		
		$user = UserModel::getfind($map);
		if(empty($user)) {
			if(!empty($url)) getAlert(null,$url);
			return false;
		}
		
		return $user;
	}
	

}