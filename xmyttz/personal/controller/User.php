<?php
/*
 * 个人中心主页
 */
namespace app\personal\controller;
use app\login\controller\Base;
use app\info\model\Rule;
use app\info\model\Record;
use think\Session;
use think\Rsa;
use think\Request;
class User extends Base {
	//个人中心主页
	public function user() {
		$user = parent::loginUser('/Login/Login/login');
		$this->assign('user',$user);
		
		$a_rule     = Rule::getfield(array('type' => 'a_rule'),'path');
		$a_tutorial = Rule::getfield(array('type' => 'a_tutorial'),'path');
		$d_rule     = Rule::getfield(array('type' => 'd_rule'),'path');
		$d_tutorial = Rule::getfield(array('type' => 'd_tutorial'),'path');
		$this->assign('a_rule',$a_rule);
		$this->assign('a_tutorial',$a_tutorial);
		$this->assign('d_rule',$d_rule);
		$this->assign('d_tutorial',$d_tutorial);
		
		$map_record['body'] = $user['id'];
		$record = Record::getselect($map_record,8,'trans_time desc');
		$this->assign('user_record',$record);

        echo $this->fetch();
	}


}
