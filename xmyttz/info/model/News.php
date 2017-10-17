<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 9:42
 */

namespace app\info\model;
use think\Model;

class News extends Model{
    public static function row(){
        return Db('news')->where('id',input('delete'))->setField('del',1);
    }
    public static function article(){
        return Db('news')->where('del',0)->order('date desc')->select();
    }
    public static function info(){
        return Db('news')->find(input('id'));
    }
    public static function rows($data){
        return Db('news')->strict(false)->where('id',input('update'))->update($data);
    }
    public static function add($data){
        return Db('news')->insert($data);
    }
    //首页获取新闻
    public static function indexNews($limit){
    	return Db('news')->where('del',0)->order('date desc')->limit($limit)->select();
    }
}