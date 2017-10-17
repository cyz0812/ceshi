<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/11 0011
 * Time: 下午 12:08
 */

namespace app\website\model;
use think\Model;

class Record extends Model{
    public static function counts(){
        return Db('capital')->paginate(10);
    }
    public static function deposit(){
         $a= Db('capital')->where('id',input('id'))->find();
         return $a;
    }
    public static function account($deposit){
         return Db('user')->where('id',$deposit['userid'])->find();
    }
    public static function invite($account_user){
        return Db('invitelist')->where("invite_code",$account_user['invite'])->value('invite_name');
    }
    public static function record(){
       return  Db('record')->paginate(10);
    }
    public static function search($start_date,$end_date,$map){
        return Db('record')->where('trans_time',['<=',$start_date])->select();
    }

}