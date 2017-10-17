<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 6:16
 */

namespace app\contract\model;
use think\Model;

class Shares extends Model{
    public static function row(){
        return Db('shares')->where('id',input('delete'))->setField('del',1);
    }
    public static function goods(){
        return Db('shares')->where('del',0)->select();
    }
    public static function state($data){
        return Db('shares')->strict(false)->where('id',input('id'))->update($data);
    }
    public static function add($data){
        return Db('shares')->insert($data);
    }
    public static function info(){
        return Db('shares')->find(input('id'));
    }
    public static function  up(){
        return Db('shares')->strict(false)->where('id',input('update'))->update(input());
    }
    public static function num(){
        return Db('banner')->field('num')->select();
    }
}