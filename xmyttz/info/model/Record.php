<?php
/*
 * 用户充值记录
 */
namespace app\info\model;
use think\Model;

class Record extends Model{
	//获取记录数据
	public static function getselect($map = array(), $limit = '', $order = '') {
		return Db('record')
				->where('del',0)
				->where($map)
				->limit($limit)
				->order($order)
				->select();
	}
	//添加记录
	public static function getadd($data) {
		if(!is_array($data))return false;
		return Db('record')->insert($data);
	}
	//修改
	public static function getsave($map = array(), $data = array()) {
		return Db('record')->where('del',0)->where($map)->update($data);
	}
}