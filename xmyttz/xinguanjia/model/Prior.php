<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/15 0015
 * Time: 上午 9:36
 */

namespace app\xinguanjia\model;

use think\Model;

class Prior extends Model{
    public static function deposit_x(){
        return Db('capital')->where("capital_type=1 AND state=0 AND (method='prior') ")->order('sendtime desc')->select();
    }
    public static function deposit_w(){
        return Db('capital')->where("capital_type!=1 AND state=0 AND (method='prior') ")->order('sendtime desc')->select();
    }
    public static function deposit(){
        return Db('capital')->where('id',input('id'))->find();
    }
    public static function user($deposit){
        return Db('user')->where('id',$deposit['userid'])->find();
    }
    public static function xgjuser($deposit){
    	return Db('xinguanjia')->where('id',$deposit['userid'])->find();
    }
    public static function agent($account_user){
        return Db('invitelist')->where("invite_code",$account_user['invite'])->find();
    }
    public static function record(){
        return Db('capital')->paginate(10);
    }
    public static function row($data){
        return Db('capital')->where('id',input('success'))->update($data);
    }
    public static function error($data){
       return Db('capital')->where('id',input('error'))->update($data);
    }
    public static function aa($map){
        return Db('capital')->where($map)->order('replytime desc')->paginate(30,false,['query' => input('param.')]);
    }
}