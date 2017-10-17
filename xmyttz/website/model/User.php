<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/10 0010
 * Time: 下午 7:03
 */

namespace app\website\model;
use think\Model;

class User extends Model{
    public static function user(){
        return Db('user')->where('id',input('delete'))->find();
    }
    public static function dele(){
        return Db('user')->where('id',input('delete'))->setField('del',1);
    }
    public static function alls($map){
        return Db('user')->where('del',0)->where($map)->order('reg_time desc')->paginate(30,false,['query' => input('param.')]);
    }
    public static function userinfo(){
        return Db('user')->find(input('id'));
    }
    public static function saves($id,$data){
        return Db('user')->strict(false)->where('id',$id)->update($data);
    }
    
    public static function getsave($map,$data){
    	return Db('user')->strict(false)->where('del',0)->where($map)->update($data);
    }
    public static function getfind($map){
    	return Db('user')->where('del',0)->where($map)->find();
    }
    
    
    public static function saveXgj($userid,$data){
    	$user_row = Db('user')->where('del',0)->where('id',$userid)->find();
    	$xgj_row  = Db('xinguanjia')->where('del',0)->where('account',$data['a_account'])->find();
    	if(empty($xgj_row)){
    		$data_xgj['account'] 		= $data['a_account'];
    		$data_xgj['name']    		= $user_row['name'];
    		$data_xgj['phone']   		= $user_row['phone'];
    		$data_xgj['bankname']		= $user_row['bankname'];
    		$data_xgj['card']    		= $user_row['card'];
    		$data_xgj['deposit_card']	= $user_row['deposit_card'];
    		$data_xgj['invite']			= $user_row['invite'];
    		$data_xgj['regtime']  		= date('Y-m-d H:i:s',$user_row['reg_time']);
    		Db('xinguanjia')->insert($data_xgj);
    	}else{
    		if(empty($xgj_row['name'])){
    			$data_save['name']  		= $user_row['name'];
    		}
    		if(empty($xgj_row['phone'])){
    			$data_save['phone']			= $user_row['phone'];
    		};
    		if(empty($xgj_row['bankname'])){
    			$data_save['bankname']		= $user_row['bankname'];
    		}
    		if(empty($xgj_row['card'])){
    			$data_save['card']          = $user_row['card'];
    			$data_save['deposit_card']  = $user_row['card'];
    		}
    		$data_save['invite']			= $user_row['invite'];
    		Db('xinguanjia')->where('del',0)->where('account',$data['a_account'])->update($data_save);
    	}
    }
    
}