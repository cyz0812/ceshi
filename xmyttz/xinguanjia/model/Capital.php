<?php
namespace app\xinguanjia\model;
use think\Model;
class Capital extends Model{
	
	public static function capital_a($method){
		$map['type_kind'] = 'aqihuo';
		$map['state']        = 0;
		$map['method']       = $method;
		$res = Db('capital')
                ->where($map)
				->order('sendtime desc')
				->select();
		return $res;
	}
	public static function capital_d($method){
		$map['type_kind'] = 'dqihuo';
		$map['state']        = 0;
		$map['method']       = $method;
		$res = Db('capital')
                ->where($map)
				->order('sendtime desc')
				->select();
		return $res;
	}
    public static function capital_s($method){
        $map['type_kind'] = 'shares';
        $map['state']        = 0;
        $map['method']       = $method;
        $res = Db('capital')
            ->where($map)
            ->order('sendtime desc')
            ->select();
        return $res;
    }
	
	//支付数据增加
	public static function getadd($data){
		if(!is_array($data))return false;
		return Db('capital')->strict(false)->insert($data);
	}
	public static function getfind($map){
	    return Db('capital')->where($map)->find();
    }
}