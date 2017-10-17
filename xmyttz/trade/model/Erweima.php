<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/15 0015
 * Time: 下午 1:10
 */

namespace app\trade\model;

use think\Model;

class Erweima extends Model{
    public static function img(){
       return  Db('erweima')->where('id',input('delete'))->value('img');
    }
    public static function row(){
        return Db('erweima')->where('id',input('delete'))->setField('del',1);
    }
    public static function zfb(){
        return Db('erweima')->where('del',0)->where('type','zhifubao')->select();
    }
    public static function wx(){
        return Db('erweima')->where('del',0)->where('type','weixin')->select();
    }
    public static function info(){
       return  Db('erweima')->find(input('id'));
    }
    public static function files(){
        return Db('erweima')->where('id',input('update'))->value('img');
    }
    public static function load($data){
        return Db('erweima')->where('id',input('update'))->update($data);
    }
    public static function state($data_default){
       return Db('erweima')->where("type",input('type'))->update($data_default);
    }
    public static function state_w($data){
      return Db('erweima')->where('id',input('id'))->update($data);
    }
    public static function add($data){
        return Db('erweima')->insert($data);
    }
    
    //获取字段
    public static function getfield($map=array(), $field=''){
    	return Db('erweima')->where('del',0)->where($map)->value($field);
    }
}