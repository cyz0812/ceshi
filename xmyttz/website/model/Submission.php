<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/8/16 0016
 * Time: 下午 4:14
 */

namespace app\website\model;
use think\Model;

class Submission extends Model{
    public static function getselect($map){
       return Db('submission')->where($map)->order('senttime desc')->select();
    }
    public static function getfind($map){
        return Db('submission')->where($map)->find();
    }
    public static function getsave($map,$data){
    	return Db('submission')->where($map)->update($data);
    }
}