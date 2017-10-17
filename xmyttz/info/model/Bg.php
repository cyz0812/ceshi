<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 9:13
 */

namespace app\info\model;
use think\Model;

class Bg extends Model{
    public static function img(){
        return Db('banner')->where('id',input('delete'))->value('img');
    }
    public static function row(){
        return Db('banner')->where('id',input('delete'))->setField('del',1);
    }
    public static function bg(){
        return Db('banner')->where('del',0)->order('num')->select();
    }
    public static function info(){
        return Db('banner')->find(input('id'));
    }
    public static function file(){
       return  Db('banner')->where('id'.input('update'))->value('img');
    }
    public static function load($data){
        return  Db('banner')->where('id',input('update'))->strict(false)->update($data);
    }
    public static function num(){
        return Db('banner')->order('num desc')->limit('1')->value('num');
    }
    public static function add($data){
        return Db('banner')->strict(false)->insert($data);
    }
    public static function number(){
        return Db('banner')->field('num')->select();
    }
    
    //获取轮播图数量
    public static function getcount(){
    	return Db('banner')->where('del',0)->count();
    }
}