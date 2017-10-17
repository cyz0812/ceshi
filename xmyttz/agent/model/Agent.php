<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/16 0016
 * Time: 上午 10:12
 */

namespace app\agent\model;
use think\Model;

class Agent extends Model{
    public static function agent($map){
        return Db('invitelist')->where($map)->find();
    }
    public static function userlists($agent){
        return Db('user')->where("invite",$agent['invite_code'])->select();
    }
    public static function userinfo($agent){
        return Db('user')->where("invite",$agent['invite_code'])->find(input('id'));
    }
    public static function update_user($agent){
        return Db('user')->where("invite",$agent['invite_code'])->find(input('update'));
    }
    public static function row($data){
        return Db('user')->where('id',input('update'))->update($data);
    }
    public static function load($map,$agent,$data){
        $res=Db('file')->where($map)->where($agent['id'])->update($data);
        return $res;
    }
    public static function right($agent){
    	$map['yt_user.invite']=array('like',$agent['invite_code'].'%');
    	return db('user')->field('yt_user.*,yt_invitelist.invite_name')->where($map)->join('yt_invitelist','yt_user.invite = yt_invitelist.invite_code','left')->select();
    }
}