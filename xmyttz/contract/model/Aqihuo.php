<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 1:03
 */
namespace  app\contract\model;
use think\Model;
class Aqihuo extends Model{
    public static function deletes(){
        return Db('aqihuo')->where('id',input('delete'))->setField('del',1);
    }
    public static function lists()
    {
        return Db('aqihuo')->where('del', 0)->select();
    }
    public static function finds(){
        return Db('aqihuo')->find(input('id'));
    }
    public static function saves($data){
        return Db('aqihuo')->where('id',input('update'))->strict(false)->update($data);
    }
    public static function add($data){
        return Db('aqihuo')->insert($data);
    }
    public static function row($data){
        return Db('aqihuo')->where('id',input('id'))->update($data);
    }
}