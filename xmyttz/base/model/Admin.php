<?php
namespace app\base\model;
use think\Model;
use think\Session;
class Admin extends Model{
	public static function is_admin($data){
		if(!is_array($data) || empty($data)) {
			return false;
		}
		$map['user']     = $data['user'];
		$map['password'] = $data['password'];
		$admin = db('adminuser')->where($map)->find();
		if(!!$admin){
			return $admin;
		}else{
			return false;
		}
	}
	public static function head(){
		$capital = Db('capital');
		$head = array();
		$head['deposit']    = $capital->where("state=0 AND (method='deposit' OR method=1) ")->count();
		$head['withdraw']   = $capital->where("state=0 AND (method='withdraw' OR method=2) ")->count();
		$head['prior']      = $capital->where("state=0 AND method='prior'")->count();
		$head['open'] 	    = $capital->where("state=0 AND method='open'")->count();
		$head['submission'] = Db('submission')->where("state=0")->count();
		return $head;
	}
	public static function left($data) {
		$left = array();
		$adminlist = Db('adminlist');
    	$adminuser = Db('adminuser');
    	$title_num = explode(',',$data['path']);
    	$list_num  = explode(',',$data['list']);
    	foreach($title_num as $key => $v){
	    	$title_name = $adminlist->where('url',$v)->where('del',0)->order('order_num')->value('name');
	    	$left['title'][$key] = $title_name;
    		if($list_num[0]!='all'){
    			foreach($list_num as $list_key => $list_v){
    				$map_list['id']   = $list_v;
    				$map_list['path'] = $v;
    				$list_row = $adminlist->where($map_list)->where('del',0)->order('order_num')->find();
    				if(!!$list_row){
    					$left['list'][$key][$list_key] = $list_row;
    				}
    			}
	    	}else{
	    		$left['list'][$key] = $adminlist->where('path',$v)->where('del',0)->order('order_num')->select();
    		}
    	}
    	return $left;
	}
	public static function refresh(){
		$capital = Db('capital');
		$deposit=$capital->where("state=0 AND (method='deposit' OR method=1) ")->count();
		$withdraw=$capital->where("state=0 AND (method='withdraw' OR method=2) ")->count();
		$prior=$capital->where("state=0 AND method='prior'")->count();
		$open=$capital->where("state=0 AND method='open'")->count();
		$submission=Db('submission')->where("state=0")->count();
		$arr = [
				'deposit'    => $deposit,
				'withdraw'   => $withdraw,
				'prior'      => $prior,
				'open'       => $open,
				'submission' => $submission,
		];
		return $arr;
	}
}