<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 11:00
 */

namespace app\info\model;
use think\Model;

class About extends Model{
    public static function row(){
       return  Db('about')->where('id',input('delete'))->setField('del',1);
    }
    public static function lists(){
        return Db('about')->where('del',0)->order('serial asc')->select();
    }
    public static function info(){
        return Db('about')->find(input('id'));
    }
    public static function preserve($data){
        return Db('about')->strict(false)->where('id',input('update'))->update($data);
    }
    public static function serial(){
        return Db('about')->order('serial desc')->limit('1')->value('serial');
    }
    public static function add($data){
        return Db('about')->insert($data);
    }
    public static function updateData($map,$data){
   		$where	= " del = 0 ";
		foreach($map as $key => $val) {
			$where	.= " AND `".$key."` = '".$val."'";
		}
		
		$set	= '';
		foreach($data as $key => $val) {
			$set	.= empty($set) ? "" : " , ";
			$set	.= "`$key` = '$val'";
		}
		
		$sql	= "UPDATE `yt_about` SET $set WHERE $where";
		$ret	= \think\Db::execute($sql);
		if(!$ret) {
			return false;
		}
		return true;
    }
}