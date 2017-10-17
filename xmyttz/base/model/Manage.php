<?php
namespace app\base\model;
use think\Model;
class Manage extends Model{
	public static function adminlist() {
    	$f_list = Db('adminlist')->where('path',0)->select();
    	$s_list = Db('adminlist')->where('del',0)->where('path!=0')->order('path,order_num')->select();
    	$list = [
    		'f_list' => $f_list,
    		's_list' => $s_list,
    	];
    	return $list;
	}
	public static function findlist($id){
		return Db('adminlist')->find($id);	
	}
	public static function addlist($data){
		return Db('adminlist')->insert($data);
	}
	public static function savelist($id,$data){
		return Db('adminlist')->where('id',$id)->update($data);
	}
	public static function dellist($id){
		return Db('adminlist')->where('id',$id)->setField('del',1);
	}
}