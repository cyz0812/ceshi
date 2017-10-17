<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/14 0014
 * Time: 上午 8:46
 */

namespace app\info\model;
use think\Model;

class Help extends Model{
    public static function row(){
        return Db('help')->where('id',input('delete'))->setField('del',1);
    }
    public static function help_1(){
        return Db('help')->where('par_num=1')->where('del',0)->order('serial asc')->select();
    }
    public static function help_2(){
        return Db('help')->where('par_num=2')->order('serial asc')->select();
    }
    public static function help_3(){
        return Db('help')->where('par_num=3')->order('serial asc')->select();
    }
    public static function info(){
        return Db('help')->find(input('id'));
    }
    public static function saves($data){
        return Db('help')->strict(false)->where('id',input('update'))->update($data);
    }
    public static function serial(){
        return Db('help')->where('par_num',input('par_num'))->order('serial desc')->select();
    }
    public static function add($data){
        return Db('help')->insert($data);
    }
}
