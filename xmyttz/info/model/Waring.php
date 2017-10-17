<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/9/9
 * Time: 14:18
 */

namespace app\info\model;
use think\Model;

class Waring extends Model{
    public static function row(){
        return  Db('')->where('id',input('delete'))->setField('del',1);
    }
    public static function lists(){
        return Db('waring')->where('del',0)->order('serial asc')->select();
    }
    public static function info(){
        return Db('waring')->find(input('id'));
    }
    public static function preserve($data){
        return Db('waring')->strict(false)->where('id',input('update'))->update($data);
    }
    public static function serial(){
        return Db('waring')->order('serial desc')->limit('1')->value('serial');
    }
    public static function add($data){
        return Db('waring')->insert($data);
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

        $sql	= "UPDATE `yt_waring` SET $set WHERE $where";
        $ret	= \think\Db::execute($sql);
        if(!$ret) {
            return false;
        }
        return true;
    }
}