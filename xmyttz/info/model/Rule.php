<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/13 0013
 * Time: 下午 8:41
 */

namespace app\info\model;
use think\Model;


class Rule extends Model{
    public static function path(){
        return Db('rule')->where('id',input('delete'))->value('path');
    }
    public static function del(){
        return Db('rule')->where('id',input('delete'))->setField('del',1);
    }
    public static function rules(){
        return Db('rule')->where('del',0)->select();
    }
    public static function info(){
        return Db('rule')->find(input('id'));
    }
    public static function paths(){
        return Db('rule')->where('id',input('update'))->value('path');
    }
    public static function load($data){
        return  Db('rule')->where('id',input('update'))->strict(false)->update($data);
    }
    
    //获取规则里某个字段
    public static function getfield($map = array(), $field = ''){
    	return  Db('rule')->where('del',0)->where($map)->value($field);
    }
}