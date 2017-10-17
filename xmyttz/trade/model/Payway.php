<?php
namespace app\trade\model;

use think\Model;

class Payway extends Model{
	public static function getselect($map = array()){
		return  Db('Payway')->where('del',0)->where($map)->order('order_num')->select();
	}
	
	public static function getsave($map = array(),$data = array()){
		return  Db('Payway')->where($map)->update($data);
	}
	
	public static function getfind($map = array()){
		return  Db('Payway')->where('del',0)->where($map)->find();
	}
}