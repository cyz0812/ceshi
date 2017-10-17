<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 1:52
 */

namespace app\contract\model;
use think\Model;

class Dqihuo extends Model{
    public static function img(){
        return Db('dqihuo')->where('id',input('delete'))->value('img');
    }
    public static function row(){
        return Db('dqihuo')->where('id',input('delete'))->setField('del',1);
    }
    public static function goods(){
        return Db('dqihuo')->where('del',0)->select();
    }
    public static function info(){
       return Db('dqihuo')->find(input('id'));
    }
    public static function load($data){
        return  Db('dqihuo')->where('id',input('update'))->strict(false)->update($data);
    }
    public static function add($data){
       return Db('dqihuo')->strict(false)->insert($data);
    }
    public static function num(){
        return Db('banner')->field('num')->select();
    }
}