<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/24 0024
 * Time: 上午 9:42
 *
 * 去logo会员注册
 */


namespace app\Agent\controller;
use think\Controller;
use app\website\model\User as UserModel;
use think\Session;
use think\Rsa;

class Register extends Controller {
	public function register(){
		if(!empty($_POST['phone']) && !empty($_POST['password']) && !empty($_POST['code'])){
			session_start();
			$arr = array();
			
			$privDecrypt['phone']    = Rsa::privDecrypt($_POST['phone']);
			$privDecrypt['password'] = Rsa::privDecrypt($_POST['password']);

			$_POST['phone']    = $privDecrypt['phone'];
			$_POST['password'] = $privDecrypt['password'];
			
			$map['phone'] = $_POST['phone'];
			$phone = UserModel::getfind($map);
			if(!empty($phone)){
				$arr['ret'] = 'repeat';
			}elseif($_POST['code']==$_SESSION['code'] && $_POST['phone']==$_SESSION['code_phone']){
				$_SESSION = array();
				session(null);
				$data['belong']   = 'xmyttz';
				$data['uniqid']   = sha1(uniqid());
				$data['username'] = $_POST['phone'];
				$data['phone']    = $_POST['phone'];
				$data['invite']   = $_POST['invite'];
				$data['password'] = sha1($_POST['password']);
				$data['reg_time'] = time();
				$row = Db('user')->insert($data);
				if($row){
					session('username', $data['username']);
					session('face'    , null);
					session('uniqid'  , $data['uniqid']);
					session('phone'   , $data['phone']);
					
					$arr['ret'] = 'success';
				}
			}else{
				$arr['ret'] = 'error';
			}

			return json($arr);
		}else{
			echo $this->fetch();
		}
	}

	//注册协议
	public function reg_xieyi(){
		echo $this->fetch();
	}
	
	//验证是否已注册
	public function has_phone(){
		$arr['flag'] =1;
		
		$map['phone'] = input('phone');
		
		$phone = UserModel::getfind($map);
		
		if(!empty($phone)){
			$arr['flag']=0;
		}
		return json($arr);
	}

	//验证邀请码是否存在
	public function is_invite_code(){
		$invitelist = Db('invitelist');
		
		$arr['flag']        = 0;
		$map['invite_code'] = input('invite_code');
		
		$invite = $invitelist->where($map)->count();
		if($invite!=0){
			$arr['flag'] = 1;
		}
		return json($arr);
	}

}