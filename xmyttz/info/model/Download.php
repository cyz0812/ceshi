<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/14 0014
 * Time: 上午 10:17
 */

namespace app\info\model;
use think\Model;

class Download extends Model{
    public static function path(){
        return Db('download')->where('id',input('delete'))->value('path');
    }
    public static function row(){
        return Db('download')->where('id',input('delete'))->setField('del',1);
    }
    public static function pc(){
        return Db('download')->where('del',0)->select();
    }
    public static function mt(){
        return Db('download')->where("area='erweima'")->select();
    }
    public static function info(){
        return Db('download')->find(input('id'));
    }
    public static function file(){
        return Db('download')->where('id',input('update'))->value('path');
    }
    public static function load($data){
        return Db('download')->strict(false)->where('id',input('update'))->update($data);
    }
    public static function img(){
        return Db('download')->where('id',input('update'))->value('erweima');
    }
    public static function add($data){
        return Db('download')->insert($data);
    }
}