<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 10:18
 */

namespace app\info\model;
use think\Model;

class Picture extends Model{
    public static function img(){
        return Db('picture')->where('id',input('delete'))->value('path');
    }
    public static function row(){
        return Db('picture')->where('id',input('delete'))->setField('del',1);
    }
    public static function pictures(){
        return Db('picture')->where('del',0)->order('serial')->select();
    }
    public static function info(){
      return   Db('picture')->find(input('id'));
    }
    public static function load($data){
        return  Db('picture')->where('id',input('update'))->strict(false)->update($data);
    }
    public static function serial(){
        return Db('picture')->order('serial desc')->limit('1')->value('serial');
    }
    public static function loads($data){
        return  Db('picture')->insert($data);
    }
    //获取首页显示图片
    public static function indexPicture($limit){
    	return Db('picture')->where('del',0)->where('index_show=1')->order('serial')->limit($limit)->select();
    }
}