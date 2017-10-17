<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/11 0011
 * Time: 上午 9:14
 */

namespace app\website\model;
use think\Model;

class Open extends Model{
    public static function aqihuo(){
        return Db('capital')->where("state=0 AND method='open' AND type_kind='aqihuo'")->order('sendtime desc')->select();
    }
    public static function dqihuo(){
       return Db('capital')->where("state=0 AND method='open' AND type_kind='dqihuo'")->order('sendtime desc')->select();
    }
    public static function shares (){
        return Db('capital')->where("state=0 AND method='open' AND type_kind='shares'")->order('sendtime desc')->select();
    }
    public static function deposit(){
        return Db('capital')->where('id',input('id'))->find();
    }
    public static function account_user($deposit){
         return Db('user')->where('id',$deposit['userid'])->find();
    }
    public static function invite($account_user){
        return Db('invitelist')->where("invite_code",$account_user['invite'])->value('invite_name');
    }
    public static function counts(){
        return Db('record')->paginate(10);
    }
    public static function named($account_user){
        return Db('invitelist')->where("invite_code",array($account_user['inviter']))->value('invite_name');
    }
    public static function row($data){
       return Db('capital')->where('id',input('success'))->update($data);
    }
    public static function orderid(){
        return Db('capital')->where("id",input('error'))->value('out_orderid');
    }
    public static function record($out_orderid,$record_data){
       return  Db('record')->where("out_orderid",$out_orderid)->update($record_data);
    }
    public static function saves($data){
        return Db('capital')->where('id',input('error'))->update($data);
    }
    public static function user($data){
        return Db('user')->where('id',input('userid'))->update($data);
    }
    public static function rows($data){
        return Db('capital')->where('id',input('capital_id'))->update($data);
    }
    
    
    public static function addXgj($userid,$account){
    	$user_row = Db('user')->where('del',0)->where('id',$userid)->find();
    	$xgj_row  = Db('xinguanjia')->where('del',0)->where('account',$account)->find();
    	if(empty($xgj_row)){
    		$data_xgj['account'] 		= $account;
    		$data_xgj['name']    		= $user_row['name'];
    		$data_xgj['phone']   		= $user_row['phone'];
    		$data_xgj['bankname']		= $user_row['bankname'];
    		$data_xgj['card']    		= $user_row['card'];
    		$data_xgj['deposit_card']	= $user_row['card'];
    		$data_xgj['invite']			= $_POST['invite_code'];
    		$data_xgj['regtime']  		= date('Y-m-d H:i:s',$user_row['reg_time']);
    		Db('xinguanjia')->insert($data_xgj);
    	}
    	
    }
    
    
    
}